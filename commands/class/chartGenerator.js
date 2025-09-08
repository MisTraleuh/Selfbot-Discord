import { createCanvas } from 'canvas'
import fs from 'fs'
import path from 'path'
import ImageUploader from './imageUploader.js'

class ChartGenerator {
  constructor() {
    this.chartDir = './charts'
    this.uploader = new ImageUploader()
    this.ensureChartDir()
  }

  ensureChartDir() {
    if (!fs.existsSync(this.chartDir)) {
      fs.mkdirSync(this.chartDir, { recursive: true })
    }
  }

  async generateUserStatsChart(username, userStats, connectionHistory) {
    const width = 800
    const height = 600
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Couleurs
    const bgColor = '#2C2F33'
    const cardColor = '#36393F'
    const textColor = '#FFFFFF'
    const accentColor = '#7289DA'
    const successColor = '#43B581'
    const dangerColor = '#F04747'
    const warningColor = '#FAA61A'

    // Background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Header
    ctx.fillStyle = cardColor
    ctx.fillRect(20, 20, width - 40, 80)
    
    ctx.fillStyle = textColor
    ctx.font = 'bold 28px Arial'
    ctx.fillText(`📊 Stats de connexion - ${username}`, 40, 60)
    
    ctx.font = '16px Arial'
    ctx.fillStyle = '#99AAB5'
    ctx.fillText('Statistiques des 30 derniers jours', 40, 85)

    // Stats cards
    const stats = [
      {
        label: '🔄 Connexions',
        value: userStats.total_connections || 0,
        color: successColor,
        x: 40,
        y: 120
      },
      {
        label: '🔴 Déconnexions', 
        value: userStats.total_disconnections || 0,
        color: dangerColor,
        x: 220,
        y: 120
      },
      {
        label: '⏱️ Session moyenne',
        value: userStats.avg_session_duration ? `${Math.floor(userStats.avg_session_duration / 60)}min` : 'N/A',
        color: accentColor,
        x: 400,
        y: 120
      },
      {
        label: '📈 Plus longue session',
        value: userStats.longest_session ? `${Math.floor(userStats.longest_session / 60)}min` : 'N/A',
        color: warningColor,
        x: 580,
        y: 120
      }
    ]

    // Draw stats cards
    stats.forEach(stat => {
      // Card background
      ctx.fillStyle = cardColor
      ctx.fillRect(stat.x, stat.y, 160, 100)
      
      // Colored top border
      ctx.fillStyle = stat.color
      ctx.fillRect(stat.x, stat.y, 160, 4)
      
      // Label
      ctx.fillStyle = '#99AAB5'
      ctx.font = '14px Arial'
      ctx.fillText(stat.label, stat.x + 10, stat.y + 25)
      
      // Value
      ctx.fillStyle = textColor
      ctx.font = 'bold 24px Arial'
      ctx.fillText(stat.value.toString(), stat.x + 10, stat.y + 55)
    })

    // Timeline section
    if (connectionHistory && connectionHistory.length > 0) {
      ctx.fillStyle = cardColor
      ctx.fillRect(40, 250, width - 80, 300)
      
      ctx.fillStyle = textColor
      ctx.font = 'bold 20px Arial'
      ctx.fillText('📜 Activité récente', 60, 280)

      // Draw timeline
      const timelineStart = 60
      const timelineWidth = width - 120
      const entryHeight = 40
      
      connectionHistory.slice(0, 6).forEach((entry, index) => {
        const y = 310 + (index * entryHeight)
        const date = new Date(entry.timestamp).toLocaleString()
        const duration = entry.session_duration ? ` (${Math.floor(entry.session_duration / 60)}min)` : ''
        const isConnection = entry.event_type === 'connection'
        
        // Timeline dot
        ctx.fillStyle = isConnection ? successColor : dangerColor
        ctx.beginPath()
        ctx.arc(timelineStart + 20, y, 8, 0, 2 * Math.PI)
        ctx.fill()
        
        // Timeline line (except for last item)
        if (index < connectionHistory.length - 1 && index < 5) {
          ctx.fillStyle = '#4F545C'
          ctx.fillRect(timelineStart + 18, y + 8, 4, entryHeight - 16)
        }
        
        // Event text
        ctx.fillStyle = textColor
        ctx.font = '16px Arial'
        const eventText = `${isConnection ? '🟢' : '🔴'} ${entry.event_type}`
        ctx.fillText(eventText, timelineStart + 40, y - 5)
        
        ctx.fillStyle = '#99AAB5'
        ctx.font = '14px Arial'
        ctx.fillText(`${date}${duration}`, timelineStart + 40, y + 15)
      })
    }

    // Info boxes (dates)
    const firstSeen = userStats.first_seen ? new Date(userStats.first_seen).toLocaleDateString() : 'N/A'
    const lastActivity = userStats.last_seen ? new Date(userStats.last_seen).toLocaleDateString() : 'N/A'
    
    // First seen box
    ctx.fillStyle = cardColor
    ctx.fillRect(40, height - 80, 300, 60)
    ctx.fillStyle = '#99AAB5'
    ctx.font = '14px Arial'
    ctx.fillText('👀 Première activité', 50, height - 60)
    ctx.fillStyle = textColor
    ctx.font = 'bold 16px Arial'
    ctx.fillText(firstSeen, 50, height - 40)
    
    // Last activity box
    ctx.fillStyle = cardColor
    ctx.fillRect(360, height - 80, 300, 60)
    ctx.fillStyle = '#99AAB5'
    ctx.font = '14px Arial'
    ctx.fillText('🕐 Dernière activité', 370, height - 60)
    ctx.fillStyle = textColor
    ctx.font = 'bold 16px Arial'
    ctx.fillText(lastActivity, 370, height - 40)

    // Get image buffer
    const buffer = canvas.toBuffer('image/png')
    
    // Upload to image hosting service
    try {
      console.log('📤 Upload du graphique...')
      const uploadResult = await this.uploader.uploadImage(buffer)
      console.log('✅ Graphique uploadé:', uploadResult.url)
      
      return {
        url: uploadResult.url,
        buffer: buffer,
        uploadResult: uploadResult
      }
    } catch (error) {
      console.error('❌ Erreur upload graphique:', error)
      // Fallback: sauvegarder localement
      const fileName = `user_stats_${username}_${Date.now()}.png`
      const filePath = path.join(this.chartDir, fileName)
      fs.writeFileSync(filePath, buffer)
      
      return {
        url: null,
        buffer: buffer,
        filePath: filePath,
        error: error.message
      }
    }
  }

  async generateGlobalStatsChart(stats) {
    const width = 600
    const height = 400
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#2C2F33'
    ctx.fillRect(0, 0, width, height)

    // Header
    ctx.fillStyle = '#36393F'
    ctx.fillRect(20, 20, width - 40, 60)
    
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 24px Arial'
    ctx.fillText('📊 Statistiques globales', 40, 55)

    // Create pie chart for connections vs disconnections
    const centerX = width / 2
    const centerY = height / 2 + 20
    const radius = 80

    const total = (stats.total_connections || 0) + (stats.total_disconnections || 0)
    
    if (total > 0) {
      const connectionAngle = (stats.total_connections / total) * 2 * Math.PI
      
      // Connections slice
      ctx.fillStyle = '#43B581'
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, 0, connectionAngle)
      ctx.closePath()
      ctx.fill()
      
      // Disconnections slice
      ctx.fillStyle = '#F04747'
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, connectionAngle, 2 * Math.PI)
      ctx.closePath()
      ctx.fill()
    }

    // Legend and stats
    const legendY = 120
    
    // Connections
    ctx.fillStyle = '#43B581'
    ctx.fillRect(40, legendY, 20, 20)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '16px Arial'
    ctx.fillText(`🔄 Connexions: ${stats.total_connections || 0}`, 70, legendY + 15)
    
    // Disconnections
    ctx.fillStyle = '#F04747'
    ctx.fillRect(40, legendY + 30, 20, 20)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText(`🔴 Déconnexions: ${stats.total_disconnections || 0}`, 70, legendY + 45)
    
    // Other stats
    ctx.fillStyle = '#99AAB5'
    ctx.font = '14px Arial'
    ctx.fillText(`👥 Utilisateurs trackés: ${stats.total_users || 0}`, 40, legendY + 80)
    ctx.fillText(`🟢 Actuellement en ligne: ${stats.currently_online || 0}`, 40, legendY + 100)
    
    if (stats.avg_session_duration) {
      ctx.fillText(`⏱️ Session moyenne: ${Math.floor(stats.avg_session_duration / 60)}min`, 40, legendY + 120)
    }

    // Save chart
    const fileName = `global_stats_${Date.now()}.png`
    const filePath = path.join(this.chartDir, fileName)
    
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync(filePath, buffer)
    
    return {
      filePath,
      fileName,
      buffer
    }
  }

  // Nettoie les anciens fichiers (garde seulement les 10 derniers)
  cleanupOldCharts() {
    try {
      const files = fs.readdirSync(this.chartDir)
        .map(file => ({
          name: file,
          path: path.join(this.chartDir, file),
          time: fs.statSync(path.join(this.chartDir, file)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time)

      // Supprimer les fichiers au-delà des 10 derniers
      files.slice(10).forEach(file => {
        fs.unlinkSync(file.path)
      })
    } catch (error) {
      console.error('Erreur lors du nettoyage des graphiques:', error)
    }
  }
}

export default ChartGenerator