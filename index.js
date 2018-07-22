var express = require('express');
const PORT = process.env.PORT || 5000
const path = require('path');

// var todoController = require('./controller/todoController');



express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.sendFile('public/index.html'))
  .listen(PORT);




// var todoController = require('./controller/todoController');
// var app = express();
// app.use(express.static(path.join(__dirname, 'public')))
// todoController(app);
// app.get('/', function(req, res){
//     res.sendFile('public/index.html') 
// });
// app.listen(8080);
// console.log('You are listening to port 3000');