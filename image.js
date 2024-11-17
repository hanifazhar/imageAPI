const db = require("./database/db.js");
const path = require("path")

module.exports = {
    getImages: async (req, res) => {
        try{
            // console.log(path.join(__dirname))
            const request = await db.promise()
            const query = 'select * from imagestable'    
            let data = await request.query(query)
            res.status(200).json({
                status: 200,
                data: data[0]
            })
        } catch (err) {
            console.log(err)
        }
    },
    postImage: async (req, res) => {
        try {
            const request = await db.promise()
            let pathImg = path.join(__dirname, './assets', req.file.filename);
            console.log('File uploaded to:', pathImg);
            const query = `insert into imagestable (id, url) values (uuid(), "${pathImg}")`   
            let data = await request.query(query)
            res.status(201).json({
                status: 201,
                data: data[0]
            })
        } catch (error) {
            console.log(error)            
        }
    },
    getFile: async (req, res) => {
        try {
            const { nama } = req.query;
            let pathImg = `D:/Kuliah/SMT 5/Bangkit/ngoding/imageAPI/assets/${nama}`
            res.sendFile(pathImg)
        } catch (error) {
            console.log(error)
        }
    }
}