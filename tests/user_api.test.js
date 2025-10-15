const bcrypt = require("bcrypt");
const {User} = require("../models/users");
const {test, describe, beforeEach} = require("node:test");
const supertest = require("supertest");
const app = require("../app");
const initUser = require("./test_hellpers")

const api = supertest(app);


describe('when there is initially one user in db',()=>{
    beforeEach(async ()=>{
        await User.deleteMany({});
        await User.insertMany(initUser.initialUsers);
    });

    test.only('login with username y password', async()=>{
        const user = {
            username: 'EnzoF96',
            passwordHashed: '1234'
        }

        await api.post('/api/login')
            .send(user)
            .expect(200)
            

    })
})
