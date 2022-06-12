const express= require("express");

const User = require("../user/user");

const Admin = require("../admin/admin");

const router = express.Router();

const mongoose = require("mongoose");
 
const jwt = require("jsonwebtoken");

const db = "mongodb://localhost:27017/Auth";

/*mongodb://localhost:27017/backend*/


mongoose.connect(db, err =>{
    if(err){
        consolle.log("Error" + err)
    }else{
        console.log("connected to the database")
    }
})

router.get("/", (req, res)=>{
    res.send("getting data from here...")
})

router.post("/register-user", (req, res) => {
    let userData = req.body;

    User.findOne({email : userData.email, username : userData.username}, (err, email, username)=>{
        if(err){
            console.log("Fatal errorr" + err)
        }
        if(!(email || username)){
            user = new User(userData)
            user.save((error, registeredUser) => {
            if(error){
                console.log("Error with posting" + error);
            }else {
                let payload = {subject : registeredUser._id}
                let token = jwt.sign(payload, "secreteKey");
                res.status(200).send({token})
                }
            }) 
        }else{
            res.status(404).send("User Taken")
        }
        
    })
})
router.post("/login-user", (req,res) =>{
    let userData =  req.body;

    User.findOne({email: userData.email}, (error, user) =>{
        if(error){
            console.log(error);
        }
        if(!user){
            res.status(401).send("invalid email")
            console.log("invalid email")
        }else if(user.password !== userData.password){
            res.status(401).send("invalid password")
            console.log("invalid password")
        }else if(!user && user.password !== userData.password){
            res.status(401).send("Please provide valid data")
        }else{
            let payload = {subject : user._id}
            let token = jwt.sign(payload, "secreteKey")
            res.status(200).send({token})
            console.log("User logeed in")
        }
        
                
    })
})



router.post("/register-admin", (req,res) =>{
    let data = req.body;
    let admin = new Admin(data);
    admin.save((err, registeredAdmin) =>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(registeredAdmin)
        }
    })
})


router.post("/login-admin", (req, res) =>{
    let data = req.body;

    Admin.findOne({email : data.email}, (error, dmin) =>{
        if(error){
            console.log(error)
        }
        if(!admin){
            res.status(401).send("Incorrect Email")
            console.log("email wasnt found")
        }
        if(admin.password !== data.password){
            res.status(401).send("wrong password")
            console.log("wrong password")
        }
        res.status(200).send(admin)
    })
})

router.get("/courses", verifyToken, async (req, res) => {
    try {
        const courses = await Todo.find();
        res.json(courses);
        }
        catch(err){
        console.log('Error', err);
        }
    }); 

function verifyToken(req, res,  next){
    if(!req.headers.Authorzation){
        return res.status(401).send("Unthorized request")
    }
    let token = req.header.Authorization.split(' ')[1];
    if(token ==='null'){
        return res.status(401).send("Unauthorized request")
    }
    let payload = jwt.verify(token, 'secretkey')
    if(!payload){
        return res.status(401).send("unauthorized request")
    }
    req.userId = payload.subject
    next();
}
 
module.exports = router;