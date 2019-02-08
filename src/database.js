const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log("MongoDB Conectado !"))
    .catch(err => console.err("Error al conectar la bd: ", err));