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

router.get("/", async (req, res) => {

    const photos = await Photo.find();    
    res.render("images", {
        photos
    });

});

router.get("/images/add", async (req, res) => {

    const photos = await Photo.find();
    res.render("image_form", {
        photos
    });

});

router.get("/images/delete/:id", async (req, res) => {

    const { id } = req.params;

    const photo = await Photo.findByIdAndDelete(id);
    const result = await cloudinary.v2.uploader.destroy(photo.public_id);

    console.log(result);

    res.redirect("/images/add");

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

    res.redirect("/");
    
});

module.exports = router;