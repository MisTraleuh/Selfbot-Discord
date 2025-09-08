import fetch from 'node-fetch'

class ImageUploader {
  constructor() {
    // Client ID public d'Imgur (pas besoin de compte)
    this.imgurClientId = '546c25a59c58ad7'
    this.imgurApiUrl = 'https://api.imgur.com/3/image'
  }

  async uploadToImgur(buffer) {
    try {
      const base64Image = buffer.toString('base64')
      
      const response = await fetch(this.imgurApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Client-ID ${this.imgurClientId}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: base64Image,
          type: 'base64'
        })
      })

      const data = await response.json()
      
      if (data.success) {
        return {
          url: data.data.link,
          deleteHash: data.data.deletehash
        }
      } else {
        throw new Error(`Imgur upload failed: ${data.data.error}`)
      }
    } catch (error) {
      console.error('❌ Erreur upload Imgur:', error)
      throw error
    }
  }

  // Alternative avec imgbb.com (autre service gratuit)
  async uploadToImgBB(buffer) {
    try {
      const apiKey = 'votre_api_key_imgbb' // Gratuit sur imgbb.com
      const base64Image = buffer.toString('base64')
      
      const formData = new FormData()
      formData.append('key', apiKey)
      formData.append('image', base64Image)
      
      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        return {
          url: data.data.url,
          deleteUrl: data.data.delete_url
        }
      } else {
        throw new Error(`ImgBB upload failed: ${data.error.message}`)
      }
    } catch (error) {
      console.error('❌ Erreur upload ImgBB:', error)
      throw error
    }
  }

  // Service temporaire gratuit (24h)
  async uploadToTmpFiles(buffer) {
    try {
      const formData = new FormData()
      const blob = new Blob([buffer], { type: 'image/png' })
      formData.append('file', blob, 'chart.png')
      
      const response = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.status === 'success') {
        // Convertir l'URL pour affichage direct
        const directUrl = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/')
        return {
          url: directUrl,
          expires: '24 hours'
        }
      } else {
        throw new Error(`TmpFiles upload failed: ${data.message}`)
      }
    } catch (error) {
      console.error('❌ Erreur upload TmpFiles:', error)
      throw error
    }
  }

  // Service principal avec fallback
  async uploadImage(buffer) {
    try {
      // Essayer Imgur en premier
      console.log('📤 Upload vers Imgur...')
      return await this.uploadToImgur(buffer)
    } catch (error) {
      console.log('❌ Imgur échoué, essai TmpFiles...')
      try {
        // Fallback vers TmpFiles
        return await this.uploadToTmpFiles(buffer)
      } catch (fallbackError) {
        console.error('❌ Tous les services d\'upload ont échoué')
        throw new Error('Impossible d\'uploader l\'image')
      }
    }
  }
}

export default ImageUploader