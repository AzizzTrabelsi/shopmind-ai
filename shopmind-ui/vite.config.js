import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'

// Dev-only helper: accepts an image upload and serves it back, so n8n (same machine) can fetch it by URL.
function uploadPlugin() {
  const dir = path.join(os.tmpdir(), 'shopmind-uploads')
  fs.mkdirSync(dir, { recursive: true })
  return {
    name: 'shopmind-upload',
    configureServer(server) {
      server.middlewares.use('/upload', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; return res.end() }
        const ext = (req.headers['x-file-ext'] || 'png').toString().replace(/[^a-z0-9]/gi, '').slice(0, 5) || 'png'
        const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        const out = fs.createWriteStream(path.join(dir, name))
        req.pipe(out)
        out.on('finish', () => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ file: name }))
        })
        out.on('error', () => { res.statusCode = 500; res.end() })
      })
      server.middlewares.use('/uploads', (req, res) => {
        const file = path.join(dir, path.basename(req.url.split('?')[0]))
        if (!fs.existsSync(file)) { res.statusCode = 404; return res.end() }
        res.setHeader('Content-Type', 'image/' + (path.extname(file).slice(1).replace('jpg', 'jpeg') || 'png'))
        fs.createReadStream(file).pipe(res)
      })
    }
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.N8N_URL || 'http://localhost:5678'
  return {
    plugins: [react(), uploadPlugin()],
    server: {
      host: true,
      allowedHosts: true,
      proxy: {
        // Browser -> Vite -> n8n: no CORS configuration needed on n8n
        '/api/shopmind': {
          target,
          changeOrigin: true,
          timeout: 300000,
          proxyTimeout: 300000,
          rewrite: () => (env.N8N_WEBHOOK_PATH || '/webhook/shopmind')
        }
      }
    }
  }
})
