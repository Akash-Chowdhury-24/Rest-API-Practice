const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const books=[{
  id:1,
  title:"The Lord of the Rings",
  author:"JRR Tolkien",
  genre:"Fantasy",
  year:1954
},{
  id:2,
  title:"The Shining",
  author:"Stephen King",
  genre:"Horror",
  year:1977
},{
  id:3,
  title:"The Hobbit",
  author:"JRR Tolkien",
  genre:"Fantasy",
  year:1937
},{
  id:4,
  title:"The Dark Tower",
  author:"Stephen King",
  genre:"Horror",
  year:1982
}];

app.get('/',(req,res) => {
  res.send('Hello, this is a Book Store REST API server with Express!');
});

app.get('/allBooks',(req,res) => {
  try {
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"});
  }
  
})

app.get('/book/:id',(req,res) => {
  const id=parseInt(req.params.id);
  try {
    const book = books.find(singleBook => singleBook.id === id );
    if(book){
      res.status(200).json(book);
    }else{
      res.status(404).json({message:`book not found with id: ${id}`});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"});
  }

})


app.post('/add',(req,res) => {
  const newBook = {
    id : books.length + 1,
    title : `Book ${books.length + 1}`,
    author : `Author ${books.length + 1}`,
    genre : `Genre ${books.length + 1}`,
    year : 2000
  }

  try {
    books.push(newBook);
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"});
  }
})

app.post('/addDynamically',(req,res) => {
  const {id,title,author,genre,year} = req.body;

  try {
    books.push({
      id:id,
      title:title,
      author:author,
      genre:genre,
      year:year
    });
  
    res.status(200).json({
      message:`book added successfully with id: ${id}`,
      bookadded : {
        id:id,
        title:title,
        author:author,
        genre:genre,
        year:year
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"});
  }
  
})

app.put('/update/:id',(req,res) => {
  const id = parseInt(req.params.id);

  try {
    const book = books.find(singleBook => singleBook.id === id );

  if(book){
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.year = req.body.year || book.year;
    res.status(200).json({
      message:`book updated successfully with id: ${id}`,
      book:book
    });
  }else{
    res.status(404).json({message:`book not found with id: ${id}`});
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"});
  }
  
});

app.delete('/delete/:id',(req,res) => {
  const id = parseInt(req.params.id);
  try {
    const indexOfBookToDelete =books.findIndex(singleBook => singleBook.id === id);

    if(indexOfBookToDelete !== -1){
      books.splice(indexOfBookToDelete,1);
      res.status(200).json({
        message:`book deleted successfully with id: ${id}`,
        data : books
      });
    }else{
      res.status(404).json({message:`book not found with id: ${id}`});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"something went wrong"});
  }
});


app.listen(port,() => {
  console.log(`server listening at http://localhost:${port}`)
});