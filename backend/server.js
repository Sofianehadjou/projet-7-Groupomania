//import:
const express = require('express');  
const mysql = require('mysql'); 
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const apiRouter = require('./apiRouter').router;


var app = express();

// middleware pour eviter les ERRORS de CORS, les serveurs différents peuvent communiquer entre eux
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');   // permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();   // permet de transmettre le contrôle à la fonction middleware suivant.  
  });

//body parser configuration 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());  

app.use('/api/', apiRouter);



app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon server</h1>');
});

app.listen(3000, function() {
    console.log('Serveur en écoute :)');
});
  
    