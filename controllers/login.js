const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const {User} = require("../models/users");
const jwt = require('jsonwebtoken');
const secretKey = require("../utils/config").SECRET_KEY

// Login
loginRouter.post('/', async (request, response,next) => {
    const {username, password} = request.body;
    console.log({username,password})
    try{
        const userLoggin = await User.findOne({ username: username });

        const passwordHashed  = bcrypt.compare(password, userLoggin.password);
        
        if(userLoggin === null) return response.status(400).json({ message:'user not found' });
        if(!passwordHashed) return response.status(500).json({ error: 'error to hash password' })

        const payload = { username: userLoggin.username, id: userLoggin._id.toString() }
        console.log(payload)
        const token = jwt.sign(payload, secretKey, { 'expiresIn':'1d' });

        return response.json({
            token,
            message:'user connected sucessfull',
            username
        })
    }catch(exception){
        response.status(500).json(exception.message)
    }
});


module.exports = { loginRouter }