/**
 * Dependencies
 */
require('dotenv').config() //this is how we make use of our .env variables
require('./config/db')
const express = require ("express")
const morgan = require ("morgan") //logger

const app = express()
const { PORT = 3013 } = process.env;
// const port = process.env.PORT 

//Bring in our model
const Book = require('./models/Book')


/**
 * Middleware
 */
app.use(morgan('dev'))//bringing morgan in
app.use(express.urlencoded({extended: true})) //body parser this is how we get access to req.body


/**
 * Routes & Router
 */

//Index - GET render all of the books


//New - GET for the form to create a new book

//Create - POST
app.post('/books', async (req, res)=> {
    if (req.body.complete === "on"){
        //if checked
        req.body.completed = true
    }else{
        //if not checked
        req.body.completed = false
    }
    let newBook = await Book.create(req.body)
    res.send(newBook)
})

/**
 * Server listener
 */
app.listen(PORT, () => console.log(`listening to the sounds of ${PORT}`))