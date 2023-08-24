const User = require('../models/userModel')

async function show(req, res) {
    console.log('GET /users')
    try {
        const foundUser = await User.findById(req.id)
        
        res.json({ 
            username: foundUser.username, 
            email: foundUser.email 
        })

    } catch (error) {
        res.json({ error: error.message })
    }
}

async function index(req, res) {
    console.log('GET /users/list')
    try {
        const foundUsers = await User.find()
        
        console.log("found users", foundUsers)
        res.json(foundUsers)

    } catch (error) {
        res.json({ error: error.message })
    }
}

async function update(req, res) {
    console.log('PUT /users')
    try {
        const foundUser = await User.findById(req.id)
        foundUser.online = !foundUser.online
        await foundUser.save()
        
        res.json({message: `user is ${foundUser.online}`, user: foundUser})

    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    show,
    index,
    update
}