require('dotenv').config();

const express = require('express'),
      morgan = require('morgan'),
      mongoose = require('mongoose'),

      app = express(),

      dbURI = process.env.MONGO,

      PORT = process.env.PORT;

app.use(morgan('dev'));

app.use(express.json())

app.use(express.static(process.cwd()+'/public'));

const homeRouter = require('./routes/homeRouter')
app.use('/', homeRouter);

const userRouter = require('./routes/userRouter')
app.use('/user', userRouter);

const cryptoRouter = require('./routes/cryptoRouter')
app.use('/', cryptoRouter)


//Connecting to the Mongo Database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )

mongoose.connection.on( 'open', () => {
    
    console.log(`Database Connected at:\n${dbURI}\n\n`);
    
})

mongoose.connection.on( 'error', (err) => {
    
    console.log(`\nERROR: ${err}\n`);
    
})

mongoose.connection.on( 'connected', (err) => {
    
    console.log(`\nConnecting To Database\n`);
    
})

mongoose.connection.on( 'disconnected', (err) => {
    
    console.log(`\nThe Application has been disconnected from the database;\n`);
    
})

//specify port for server to listen on

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    
})
