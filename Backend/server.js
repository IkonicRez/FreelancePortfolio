const express = require('express')

const cors = require('cors')

const PORT = 3005 || process.env.PORT

const app = express()

const routes = require('./Controllers')

app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,POST', // Allow these HTTP methods
  optionsSuccessStatus: 200 // Respond with a 200 status for preflight requests
};

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})