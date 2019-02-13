const { Router } = require("express");
const Photo = require("../models/Photo");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = Router();

router.get("/", (req, res) => {

    res.render("images");

});

router.get("/images/add", (req, res) => {

    res.render("image_form");

});

router.post("/images/add", async (req, res) => {
    
    console.log(req.file);
    const { title, description } = req.body;
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(upload);

    const newPhoto = new Photo({
        title,
        description,
        imageURL: upload.url,
        public_id: upload.public_id
    });

    await newPhoto.save();
    await fs.unlink(req.file.path);

    res.send("Recibido");
    
});

module.exports = router;