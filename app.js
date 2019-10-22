// require dependencies
const config = require('config')     // for config variables
const express = require('express')   // Express web framework
const helmet = require('helmet')     // HTTP security

// create an Express app
const app = express()

// use Helmet middleware to automatically set secure HTTP headers
app.use(helmet())

// Use hosting values if available, otherwise default 
const environment = process.env.NODE_ENV || 'development'
const hostname = process.env.HOSTNAME || config.get("hostname")
const port = process.env.PORT || config.get("port");

// Use Express app.get() methods to configure endpoints

// declare your callback function the old way
app.get('/', function (req, res) {
  res.send('<h3>Welcome to the default page!  <br> <br>' +
    'Try going to different URIs by adding these at the end: <br> <br>' +
    '/hi <br>' +
    '/big <br>' +
    '/json <br>' +
    '/greeting/Ali <br>' +
    '/hello/Ali <br>' +
    '/fortune <br>' +
    '/fancy/?first=Ali&last=AlAli <br>' +
    '<br> <br> </h3>' 
  )
})

// or use the new arrow function syntax
// respond with text
app.get('/hi', (req, res) => {
  res.send('Welcome to Express framwork!')
})

// or respond with html
app.get('/big', (req, res) => {
  res.send('<h1><strong>Hello There!</strong></h1>')
})

// or respond with JSON
app.get('/json', (req, res) => {
  res.send('{<br>name : "Ali", <br>class: "Web Apps"<br>}')
})

// :name indicates a parameter at this location in the URI
app.get('/greeting/:id', (req, res) => {
  res.send(`Hello! The id provided was ${req.params.id}.`)
})

// combine your skills and get creative
app.get('/hello/:buddy', (req, res) => {
  res.send(`<h1>Welcome, ${req.params.buddy}!</h1>`)
})

// provide multiple query parameters (named first and last) with ? and &
app.get('/fancy', (req, res) => {
  const first = req.query.first
  const last = req.query.last
  res.send(`Hello ${first} ${last}!`)
})

let fortunes = ['It is certain.', 'It is decidedly so.', 'Without a doubt.', 'Yes - definitely.',
'You may rely on it', 'As I see it, yes.', 'Most likely', 'Yes.', 'Signs point to yes.',
'Reply hazy, try again.', 'Ask again later.', 'Better not tell you now.', 'Cannot predict now.', 
'Concentrate and ask again.', 'My sources say yes.', 'Very doubtful.']

// Implements a Magic 8 Ball service
app.get('/fortune', (req,res) => {
  if(isEmpty(req.query)){
    res.send('<h2>You wish to know the future?</h2>' +
             '<p>Ask a question in the query string, e.g., http://localhost:3002/fortune? Will I get an A in this class? <br/>' +
             '<p>The Magic 8 Ball will answer!</p>')
  } else {
    res.send(`<h2>The answer is ... wait for it ...</h2><br>...<br>...<h3>${fortunes[randomInt(0, fortunes.length)]}</h3>`)
  }
})

// Use middleware to handle all non-managed routes (e.g. /xyz)
// https://expressjs.com/en/api.html#req.originalUrl
app.use((req, res, next) => {
  res.status(404).send(`Error 404 - page (${req.originalUrl})  was not found`);
})

// start listening and inform developers
app.listen(port, hostname, () => {
  console.log(`\n App listening at http://${hostname}:${port}/`)
  console.log(`\n Try going to different URIs:\n`)
  console.log(`   Try /hi`)
  console.log(`   Try /big`)
  console.log(`   Try /json`)
  console.log(`   Try /fortune`)
  console.log(`   Try /greeting/yourname`)
  console.log(`   Try /hello/Ali`)
  console.log(`   Try /fancy/?first=Ali&last=AlAli`)
  console.log('\n Hit CTRL-C CTRL-C to stop\n')
})

// Utility to see if an object is empty or not

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

// generates a random value in [low,high) 
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}