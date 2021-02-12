import path from "path";
const __dirname = path.resolve()

const imgUploadProduct = (req, res) => {
    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;
    let extName = path.extname(file.name);
    let getRealNameUploaded = Date.now()+extName
    let imgList = ['.png','.jpg','.jpeg','.gif'];
    if (imgList.includes(extName)){
        file.mv(`${__dirname}/frontend/public/images/${getRealNameUploaded}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.json({fileName: getRealNameUploaded, filePath: `/images/${file.name}`});
        });
    }else {
        res.status(422)
        throw new Error('just image')
    }

}
export  {imgUploadProduct}