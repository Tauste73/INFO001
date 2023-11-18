var tls = require("tls");
var fs = require("fs");
const PORT = 3000;
const HOST = "127.0.0.1";
//Option qui récupère les certificats
var options = {
  key: fs.readFileSync("../certificats/serveur_http.pem"),
  cert: fs.readFileSync("../certificats/serveur_http.cert.pem"),
  ca: fs.readFileSync("../certificats/ca.cert.pem"),
  rejectUnauthorized: false,
};
//On se connect au serveur
var client = tls.connect(PORT, HOST, options, function () {
  //On vérifie si la connexion est authorisé
  if (client.authorized) {
    console.log("Connexion authorisée par le serveur.");
  } else {
    console.log("Connexion pas autorisé " + client.authorizationError);
  }
  //On envoie un message
  client.write("Test client");
});

//Quand on reçoit un message on le print
client.on("data", function (data) {
  console.log("Recu: ", data.toString().replace(/(\n)/gm, ""));

  client.end();
});
