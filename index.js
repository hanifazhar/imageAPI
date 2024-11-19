const express = require('express');
const { upload } = require('./middleware/middleware.js');
const { postImage, getImages, getFile } = require("./image.js")
const cors = require("cors")

const router = express.Router();
const app = express();

app.use(cors())
app.use("/", router);

router.get("/", (req, res) => {
    res.json({
        message: "HALO DEK"
    })
})

router.get("/images", getImages)
router.get("/getfile", getFile)
router.post("/postimage", upload.single('image'), postImage);

app.listen(5000, () => {
    console.log('Server berjalan di http://localhost:5000');
});