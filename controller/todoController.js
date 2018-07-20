var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to database kptodo
mongoose.connect('mongodb://kishortest:testuser123@ds143511.mlab.com:43511/kptodo', { useNewUrlParser: true });

// create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

// todo model with schema
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({ item : 'Create App'}).save(function(err){
//     if(err) throw err;
//     console.log('Item saved');
// })

var urlencodeParser = bodyParser.urlencoded({extended: true});

module.exports = function(app) {

    app.get('/todo', function(req, res){
        // get data from database and sent ti view
        Todo.find({}, function(err, data){
            if(err)
                throw err;
                res.render('todo', {
                    todos: data
                });
        });
    });

    app.post('/todo', urlencodeParser , function(req, res){
       var newTodo =  Todo(req.body).save(function(err,data){
        if(err)
            throw err;
        res.json(data);
       });
    });

    app.delete('/todo/:item', function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, "")}).remove(function(err,data){
            if(err)
                throw err;
            res.json(data);
        })
    });
}