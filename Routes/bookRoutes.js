var express=require('express');
var bookRouter=express.Router();

var routes=function(Book){
var bookController=require('../controller/bookController')(Book);
  bookRouter.route('/')
      .post(bookController.post)
      .get(bookController.get);

    //middleware-concept
    
    bookRouter.route('/:bookId',function(req,res,next){
      Book.findById(req.params.bookId,function(err,books){
          if(err){
              res.status(500).send(err);
          }else if(books){
              req.book=books;
              next();
          }else{
              res.status(404).send('No book was there');
          }
      });
    });
bookRouter.route('/:bookId')
      .get(function(req,res){
     Book.findById(req.params.bookId,function(err,books){
          if(err){
              res.status(500).send(err);
          }else{
             res.json(books);
          }
         });
             
       })
        .put(function(req,res){
        Book.findById(req.params.bookId,function(err,books){
          if(err){
              res.status(500).send(err);
          }else{
              books.title=req.body.title;
              books.author=req.body.author;
              books.read=req.body.read;
              books.save();               
              res.json(books);
          }
         
          })
})
    
    .delete(function(req,res){
         req.books.remove(function(err){
             if(err){
                res.status(500).send(err); 
                }else{
                res.status(204).send('Removed');
                 }
         })
     });
 return bookRouter; 
};

module.exports=routes;