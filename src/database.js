const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
})
    .then(db => console.log("MongoDB Conectado !"))
    .catch(err => console.log("Error al conectar la bd: ", err));