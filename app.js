var express=require('express');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var app=express();

var port=process.env.PORT || 3000;
var db=mongoose.connect('mongodb://localhost:27017/library');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var Book=require('./models/bookMOdel');
var bookRouter=require('./Routes/bookRoutes')(Book);

app.use('/api/Books',bookRouter);
//app.use('/api/Author',authRouter);

app.get('/',function(req,res){
res.send("Hello world -Athi");    
})

app.listen(port,function(){
    console.log('Server running on: '+port);
})