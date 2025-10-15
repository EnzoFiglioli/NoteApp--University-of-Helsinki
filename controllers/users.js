const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const {User} = require("../models/users");
const jwt = require('jsonwebtoken');
const secretKey = require("../utils/config").SECRET_KEY

userRouter.post("/", async(request,response)=>{
    const {username, name, password} = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    const user = new User({
        username,
        name,
        password: passwordHash
    });

    const userSaved = await user.save();
    
    response.status(201).json(userSaved);
});

userRouter.get('/', async (request,response)=>{
    const users = await User.find({});

    if(!users) return response.status(404).json({message: 'Not users found'}) 
    
    return response.json(users);

})

module.exports = {userRouter}