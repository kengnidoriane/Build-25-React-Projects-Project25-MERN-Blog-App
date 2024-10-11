// importation des modules
const express = require('express'); // utilise pour creer le serveur web
const cors = require('cors'); // gere les requettes provenant de different domaine
//importation des router contenu dans blogRouter
const blogRouter = require('./route/blog-route')

require('./db')
const app = express(); //creation application express
//application de cors a l'app
app.use(cors());
//utilite cree les requette HTTP au format JSON
app.use(express.json());
// definition d'une route
app.use('/api/blogs', blogRouter);

app.use('/api', (req,res) => {
  res.status(200).json({message: "Hello world"});
});
//  démarre le serveur et l'écoute sur le port 5000
app.listen(5000, ()=> console.log(`App is running at 5000...`)
);