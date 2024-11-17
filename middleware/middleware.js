const multer = require('multer')
const fs = require('fs');
const path = require("path")

const uploadPath = path.join(__dirname, '../assets');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
    console.log("Folder assets berhasil dibuat!");
} else {
    console.log("Folder assets sudah ada.");
}

function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
  }
  
  /* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
    /* eslint-enable no-unused-vars */
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../assets');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })
  
  module.exports = {
    notFound,
    errorHandler,
    upload
  };