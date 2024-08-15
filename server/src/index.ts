import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import { promises as fsPromises } from 'fs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const screenshotsDir = path.join(__dirname, '..', 'screenshots')

const app = express()
const port = 3005
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`

app.use(cors())

const storage = multer.diskStorage({
    destination: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void
    ) {
        cb(null, screenshotsDir)
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, 'resume_' + Date.now() + '.png')
    }
})

const upload = multer({ storage: storage })

app.post('/api/upload-resume-image', upload.single('image'), async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No image file uploaded' })
    }

    try {
        res.json({
            success: true,
            message: 'Resume image uploaded successfully',
            filename: req.file.filename,
            src: `${baseURL}/api/resume-image/${req.file.filename}`
        })
    } catch (error) {
        console.error('Error uploading resume image:', error)
        res.status(500).json({ success: false, message: 'Error uploading resume image' })
    }
})

app.get('/api/resume-image/:filename', async (req: Request, res: Response) => {
    try {
        const { filename } = req.params
        const filepath = path.join(screenshotsDir, filename)

        await fsPromises.access(filepath)
        res.setHeader('Content-Type', 'image/png')

        const fileStream = fs.createReadStream(filepath)
        fileStream.pipe(res)
    } catch (error) {
        console.error('Error retrieving resume image:', error)
        res.status(404).json({ success: false, message: 'Image not found' })
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`Screenshots directory: ${screenshotsDir}`)
})
