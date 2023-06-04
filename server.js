const http = require('http');

const hostname = '192.168.1.205';
let port = 3000;
const altPort = 1500;
const cookieSession = require('cookie-session')
const express = require('express')
const app = express()
const fs = require('fs');

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/', express.static('.'))

app.get('/', (req, res) => {
  express.response.send(fs.readFileSync('index.html').toString());
});

app.listen(port, () => console.log(`Escritor de Documentos listening on port ${port}!`))