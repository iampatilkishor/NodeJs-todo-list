var express = require('express');
var cors = require('cors')

var todoController = require('./controller/todoController');
var app = express();
app.use(express.static(path.join(__dirname, 'public')))
todoController(app);
app.get('/', function(req, res){
    res.sendFile('public/index.html') 
});
app.listen(8080);
console.log('You are listening to port 3000');