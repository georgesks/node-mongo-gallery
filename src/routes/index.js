const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {

    res.render("images");

});

router.get("/images/add", (req, res) => {

    res.render("image_form");

});

router.post("/images/add", (req, res) => {

    console.log(req.body);
    //console.log(req.file);

    res.send("Recibido");
    
});

module.exports = router;