const router = require('express').Router()
const {Contact} = require('../../../Models')

// router.get('/', async (req, res) => {
//     try {
//         console.log('hello')
//         res.status(200)
//     }
//     catch(err){
//         console.error("Error recieving message: ", err)
//         res.status(400).json({ error: 'Failed to receive message'})
//     }
// })
router.post('/', async (req, res) => {
    try{
        const newContact = await Contact.create({
            client_name: req.body.client_name,
            client_email: req.body.client_email,
            project_type: req.body.project_type,
            client_budget: req.body.client_budget
        })
        console.log(newContact.dataValues)
        res.status(200)
    }
    catch(err){
        console.error("Error recieving message: ", err)
        res.status(400).json({ error: 'Failed to receive message'})
    }
})

module.exports = router