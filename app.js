var express = require('express');
var cors = require('cors')

var todoController = require('./controller/todoController');

// initialize express app
var app = express();
app.use(cors())

// set up template engine 
// app.set('view engine','ejs');

// static files
app.use(express.static('./public'));

todoController(app);

app.get('*', function(req, res){
    // get data from database and sent ti view

    res.sendfile('./public'); 
        // res.status(200).sendFile(path.join(__dirname + '/public/todo/index.html')); 
});


//  listen to port
app.listen(8080);
console.log('You are listening to port 3000');