var tls = require("tls");
var fs = require("fs");
const PORT = 3000;
const HOST = "127.0.0.1";
//Option qui récupère les certificats
var options = {
  key: fs.readFileSync("../certificats/serveur_http.pem"),
  cert: fs.readFileSync("../certificats/serveur_http.cert.pem"),
  ca: fs.readFileSync("../certificats/ca.cert.pem"),
};
//On créer le serveur
var server = tls.createServer(options, function (socket) {
  //On envoie un message
  socket.write("Test server");

  //Quand on reçoit un message on le print
  socket.on("data", function (data) {
    console.log("Recu: ", data.toString().replace(/(\n)/gm, ""));
  });
});

//On écoute sur le port 3000
server.listen(PORT, HOST, function () {
  console.log("Server lancer sur port : " + PORT);
});
