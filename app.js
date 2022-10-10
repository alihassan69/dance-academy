const express = require("express")
const app = express()
const fs = require('fs')

// The body parser will allow us to pass the data for firstName and lastName in the body to the server. It can also convert that data into JSON format. thats whe using this middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// connecting mongoose with app.js file.  by default, runs on port 27017.
var mongoose = require("mongoose");

//documentation availabe on mongoose site
mongoose.Promise = global.Promise;
main().catch(err => console.log(err));

async function main() {
   await     mongoose.connect('mongodb://localhost:27017/contactDance');

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const path = require("path")
port = 8000;

//creating contact schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var contact = mongoose.model("contact", contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //for servimg static folder files
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

// ENDPOINT
app.get('/', (req, res) => {
    const tit = {}
    res.status(200).render('home.pug', tit)
})
app.get('/contact', (req, res) => {
    const tit = {}
    res.status(200).render('contact.pug', tit)
})

// getting post request
// app.post('/contact', (req, res) => {
//     var myData = new contact(req.body);
// })
//STARTING  THE SERVER
app.listen(port, () => {
    console.log(`application startred sucessfully at port ${port}`);
});   