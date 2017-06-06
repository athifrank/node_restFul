var bookController=function(){
    
    var post=function(req,res){
             var book=new Book(req.body);
            book.save();
            res.status(201).send(book);
     }
    
    var get=function(req,res){
    var query={};
    if(req.query.author){
        query.author=req.query.author;
    }
      Book.find(query,function(err,books){
          if(err){
              console.log(err);
          }else{
              res.json(books);
          }
      })

}
    
    return{
        post:post,
        get:get
    }
}

module.exports=bookController;