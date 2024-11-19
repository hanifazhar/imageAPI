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
                "success": true,
                "message": "Sukses menampilkan seluruh gambar",
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
                "success": true,
                "message": "Sukses menambahkan gambar",
                data: data[0]
            })
        } catch (error) {
            console.log(error)            
        }
    },
    getFile: async (req, res) => {
        try {
            const { id } = req.query; // Ambil ID dari query
            const request = await db.promise();
            const query = `SELECT url FROM imagestable WHERE id = ?`;
            let [data] = await request.query(query, [id]);

            if (data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Gambar tidak ditemukan",
                });
            }

            const pathImg = data[0].url; // URL dari database
            res.sendFile(pathImg, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({
                        success: false,
                        message: "Gagal menampilkan gambar",
                    });
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Terjadi kesalahan",
            });
        }
    },
}