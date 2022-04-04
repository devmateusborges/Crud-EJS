const express = require('express')
const server = express()
//importar as rotas
const routes = require('./routes')
const path = require('path')

//para usar ejs
server.set('view engine', 'ejs')

server.set('views', path.join(__dirname, 'views'))
//routes
server.use(express.static("public"))

server.use(routes)
// req;nory 
server.use(express.urlencoded({ extended:true}))  


server.listen(3000, () => console.log("server http://localhost:3000"))