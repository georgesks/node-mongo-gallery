const app = require("./app");

app.listen(app.get("port"), () => {

    console.log("Servidor iniciado en puerto:", app.get("port"));

});