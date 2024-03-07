const router = require('express').Router()

router.post('/', async (req, res) => {
    try{
        const newContact = req.body
        console.log(newContact)
    }
    catch(err){
        console.error("Error recieving message: ", err)
        res.status(400).json({ error: 'Failed to receive message'})
    }
})