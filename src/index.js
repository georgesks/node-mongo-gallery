
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}

const app = require("./app");

app.listen(app.get("port"), () => {

    console.log("Servidor iniciado en puerto:", app.get("port"));
    console.log("Environment: " , process.env.NODE_ENV);

});