// database.js
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'
import fs from 'fs'

class PresenceDatabase {
  constructor() {
    this.db = null
    this.dbPath = './databases/presence.db'
  }

  async init() {
    try {
      // Créer le dossier databases s'il n'existe pas
      const dbDir = path.dirname(this.dbPath)
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true })
        console.log(`📁 Dossier ${dbDir} créé`)
      }

      // Ouvrir/créer la base de données
      this.db = await open({
        filename: this.dbPath,
        driver: sqlite3.Database
      })

      // Créer les tables
      await this.createTables()
      console.log('✅ Base de données initialisée')
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation de la DB:', error)
      throw error
    }
  }

  async createTables() {
    // Table pour les connexions/déconnexions
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS connection_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        username TEXT NOT NULL,
        event_type TEXT NOT NULL, -- 'connection' ou 'disconnection'
        from_status TEXT,
        to_status TEXT NOT NULL,
        timestamp DATETIME NOT NULL,
        guild_id TEXT,
        session_duration INTEGER, -- en secondes (pour les déconnexions)
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Table pour les sessions actives
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS active_sessions (
        user_id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        status TEXT NOT NULL,
        connected_at DATETIME NOT NULL,
        last_activity DATETIME NOT NULL,
        total_connections INTEGER DEFAULT 1
      )
    `)

    // Table pour les statistiques journalières
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS daily_stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        username TEXT NOT NULL,
        date TEXT NOT NULL, -- YYYY-MM-DD
        total_connections INTEGER DEFAULT 0,
        total_time_online INTEGER DEFAULT 0, -- en secondes
        first_connection DATETIME,
        last_disconnection DATETIME,
        UNIQUE(user_id, date)
      )
    `)

    // Index pour améliorer les performances
    await this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_connection_user_id ON connection_logs(user_id);
      CREATE INDEX IF NOT EXISTS idx_connection_timestamp ON connection_logs(timestamp);
      CREATE INDEX IF NOT EXISTS idx_connection_event ON connection_logs(event_type);
      CREATE INDEX IF NOT EXISTS idx_daily_stats_date ON daily_stats(date);
    `)
  }

  async savePresenceChange(userData, oldPresence = null) {
    try {
      const oldStatus = oldPresence?.status || 'offline'
      const newStatus = userData.status
      const timestamp = userData.timestamp
      const today = timestamp.toISOString().split('T')[0] // YYYY-MM-DD

      // Vérification des données obligatoires
      if (!userData.userId || !userData.username) {
        console.log(`⚠️ Données manquantes pour l'utilisateur: userId=${userData.userId}, username=${userData.username}`)
        return false
      }

      // Déterminer le type d'événement
      let eventType = null
      let sessionDuration = null

      if (this.isConnection(oldStatus, newStatus)) {
        eventType = 'connection'
        
        // Créer/mettre à jour la session active
        await this.db.run(`
          INSERT OR REPLACE INTO active_sessions (user_id, username, status, connected_at, last_activity, total_connections)
          VALUES (?, ?, ?, ?, ?, COALESCE((SELECT total_connections FROM active_sessions WHERE user_id = ?) + 1, 1))
        `, [userData.userId, userData.username, newStatus, timestamp.toISOString(), timestamp.toISOString(), userData.userId])

        // Mettre à jour les stats journalières
        await this.updateDailyStats(userData.userId, userData.username, today, 'connection', timestamp)

      } else if (this.isDisconnection(oldStatus, newStatus)) {
        eventType = 'disconnection'
        
        // Calculer la durée de session
        const session = await this.db.get(`
          SELECT connected_at FROM active_sessions WHERE user_id = ?
        `, [userData.userId])

        if (session) {
          const connectedAt = new Date(session.connected_at)
          sessionDuration = Math.floor((timestamp - connectedAt) / 1000) // en secondes
        }

        // Supprimer la session active
        await this.db.run(`DELETE FROM active_sessions WHERE user_id = ?`, [userData.userId])

        // Mettre à jour les stats journalières
        await this.updateDailyStats(userData.userId, userData.username, today, 'disconnection', timestamp, sessionDuration)
      }

      // Enregistrer l'événement si c'est une connexion/déconnexion
      if (eventType) {
        await this.db.run(`
          INSERT INTO connection_logs (user_id, username, event_type, from_status, to_status, timestamp, guild_id, session_duration)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          userData.userId,
          userData.username,
          eventType,
          oldStatus,
          newStatus,
          timestamp.toISOString(),
          userData.guildId || null,
          sessionDuration
        ])

        console.log(`💾 ${eventType === 'connection' ? '🟢 Connexion' : '🔴 Déconnexion'} de ${userData.username}${sessionDuration ? ` (${this.formatDuration(sessionDuration)})` : ''}`)
      } else {
        // Si ce n'est ni une connexion ni une déconnexion, on met juste à jour la session active
        if (['online', 'idle', 'dnd'].includes(newStatus)) {
          await this.db.run(`
            UPDATE active_sessions 
            SET status = ?, last_activity = ? 
            WHERE user_id = ?
          `, [newStatus, timestamp.toISOString(), userData.userId])
          console.log(`🔄 Changement de statut pour ${userData.username}: ${oldStatus} → ${newStatus}`)
        }
      }

      return true

    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error)
      throw error
    }
  }

  // Détermine si c'est une connexion
  isConnection(oldStatus, newStatus) {
    return oldStatus === 'offline' && ['online', 'idle', 'dnd'].includes(newStatus)
  }

  // Détermine si c'est une déconnexion
  isDisconnection(oldStatus, newStatus) {
    return ['online', 'idle', 'dnd'].includes(oldStatus) && newStatus === 'offline'
  }

  // Met à jour les statistiques journalières
  async updateDailyStats(userId, username, date, eventType, timestamp, sessionDuration = 0) {
    if (eventType === 'connection') {
      await this.db.run(`
        INSERT OR REPLACE INTO daily_stats (user_id, username, date, total_connections, total_time_online, first_connection, last_disconnection)
        VALUES (?, ?, ?, 
          COALESCE((SELECT total_connections FROM daily_stats WHERE user_id = ? AND date = ?), 0) + 1,
          COALESCE((SELECT total_time_online FROM daily_stats WHERE user_id = ? AND date = ?), 0),
          COALESCE((SELECT first_connection FROM daily_stats WHERE user_id = ? AND date = ?), ?),
          (SELECT last_disconnection FROM daily_stats WHERE user_id = ? AND date = ?)
        )
      `, [userId, username, date, userId, date, userId, date, userId, date, timestamp.toISOString(), userId, date])
    } else if (eventType === 'disconnection' && sessionDuration) {
      await this.db.run(`
        INSERT OR REPLACE INTO daily_stats (user_id, username, date, total_connections, total_time_online, first_connection, last_disconnection)
        VALUES (?, ?, ?, 
          COALESCE((SELECT total_connections FROM daily_stats WHERE user_id = ? AND date = ?), 0),
          COALESCE((SELECT total_time_online FROM daily_stats WHERE user_id = ? AND date = ?), 0) + ?,
          (SELECT first_connection FROM daily_stats WHERE user_id = ? AND date = ?),
          ?
        )
      `, [userId, username, date, userId, date, userId, date, sessionDuration, userId, date, timestamp.toISOString()])
    }
  }

  // Formate une durée en secondes
  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }

  // Méthodes utiles pour récupérer des données de connexion
  async getUserConnectionStats(userId, days = 30) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    return await this.db.get(`
      SELECT 
        COUNT(CASE WHEN event_type = 'connection' THEN 1 END) as total_connections,
        COUNT(CASE WHEN event_type = 'disconnection' THEN 1 END) as total_disconnections,
        AVG(CASE WHEN event_type = 'disconnection' AND session_duration IS NOT NULL THEN session_duration END) as avg_session_duration,
        MAX(CASE WHEN event_type = 'disconnection' THEN session_duration END) as longest_session,
        MIN(timestamp) as first_seen,
        MAX(timestamp) as last_seen
      FROM connection_logs 
      WHERE user_id = ? AND timestamp >= ?
    `, [userId, startDate.toISOString()])
  }

  async getActiveUsers() {
    return await this.db.all(`
      SELECT user_id, username, status, connected_at, 
             (julianday('now') - julianday(connected_at)) * 24 * 60 * 60 as session_duration
      FROM active_sessions
      ORDER BY connected_at DESC
    `)
  }

  async getDailyStats(userId, days = 7) {
    return await this.db.all(`
      SELECT * FROM daily_stats 
      WHERE user_id = ? 
      ORDER BY date DESC 
      LIMIT ?
    `, [userId, days])
  }

  async getTopActiveUsers(days = 7) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    
    return await this.db.all(`
      SELECT 
        user_id,
        username,
        COUNT(CASE WHEN event_type = 'connection' THEN 1 END) as connections,
        SUM(CASE WHEN event_type = 'disconnection' AND session_duration IS NOT NULL THEN session_duration ELSE 0 END) as total_time_online,
        AVG(CASE WHEN event_type = 'disconnection' AND session_duration IS NOT NULL THEN session_duration END) as avg_session
      FROM connection_logs 
      WHERE timestamp >= ?
      GROUP BY user_id, username
      HAVING connections > 0
      ORDER BY total_time_online DESC
      LIMIT 10
    `, [startDate.toISOString()])
  }

  async getConnectionHistory(userId, limit = 20) {
    return await this.db.all(`
      SELECT * FROM connection_logs
      WHERE user_id = ?
      ORDER BY timestamp DESC
      LIMIT ?
    `, [userId, limit])
  }

  async getStatistics() {
    const stats = await this.db.get(`
      SELECT 
        COUNT(DISTINCT user_id) as total_users,
        COUNT(CASE WHEN event_type = 'connection' THEN 1 END) as total_connections,
        COUNT(CASE WHEN event_type = 'disconnection' THEN 1 END) as total_disconnections,
        AVG(CASE WHEN event_type = 'disconnection' AND session_duration IS NOT NULL THEN session_duration END) as avg_session_duration,
        SUM(CASE WHEN event_type = 'disconnection' AND session_duration IS NOT NULL THEN session_duration ELSE 0 END) as total_time_online
      FROM connection_logs
    `)
    
    const activeUsers = await this.db.get(`
      SELECT COUNT(*) as currently_online FROM active_sessions
    `)
    
    return {
      ...stats,
      currently_online: activeUsers.currently_online
    }
  }

  async close() {
    if (this.db) {
      await this.db.close()
      console.log('🔒 Base de données fermée')
    }
  }
}

export default PresenceDatabase