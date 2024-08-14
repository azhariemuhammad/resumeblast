import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


app.use(cors());

const storage = multer.diskStorage({
  destination: function (req,res, cb) {
    cb(null, path.join(__dirname, 'screenshots'))
  },
  filename: function (req, res, cb) {
    cb(null, 'resume_' + Date.now() + '.png')
  }
});

const upload = multer({ storage: storage });

app.post('/upload-resume-image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }
  
  try {
    res.json({ 
      success: true, 
      message: 'Resume image uploaded successfully',
      filename: req.file.filename,
      src: 'http://localhost:3000/resume-image/' + req.file.filename
    });
  } catch (error) {
    console.error('Error uploading resume image:', error);
    res.status(500).json({ success: false, message: 'Error uploading resume image' });
  }
});

app.get('/resume-image/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filepath = path.join(__dirname, 'screenshots', filename);
  
    await fsPromises.access(filepath);
    res.setHeader('Content-Type', 'image/png');
    
    const fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving resume image:', error);
    res.status(404).json({ success: false, message: 'Image not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});