const express = require('express')

const PORT = 3005 || process.env.PORT

const app = express()

const routes = require

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})