var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');

// connect to database kptodo
mongoose.connect('mongodb://kishortest:testuser123@ds143511.mlab.com:43511/kptodo', { useNewUrlParser: true });

// create a schema
var todoSchema = new mongoose.Schema({
    title: String,
    status: Boolean,
    time: String
});

// todo model with schema
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({ item : 'Create App'}).save(function(err){
//     if(err) throw err;
//     console.log('Item saved');
// })

var urlencodeParser = bodyParser.urlencoded({extended: true});

module.exports = function(app) {
    app.use(bodyParser.json());

  
    app.get('/todo', function(req, res){
        // get data from database and sent ti view
        Todo.find({}, function(err, data){
            if(err)
                throw err;
               
            res.send(data);
        });
    });

    app.post('/todo', urlencodeParser , function(req, res){
        const newrecord = req.body;
       Todo(newrecord).save(function(err,data){
        if(err)
            throw err;
        res.send({ message: 'Product Created !', todo: data })
       });
    });

    app.delete('/todo', urlencodeParser, function(req, res){
        Todo.find(req.body).remove(function(err,data){
            if(err)
                throw err;
            let response = {
                status : 'true',
                message : 'Task removed Successfully'
            };
            if(data.n === 0){
                response.status = 'false';
                response.message = 'Task not found!'
            }
            res.json(response);
        })
    });
}