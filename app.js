const express=require("express");
const app=express();
const path=require('path');
const ejs=require("ejs");
const userSchema=require('./models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookies=require('cookie-parser')
require ('dotenv').config();

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(cookies())


app.get('/',(req,res)=>{
    res.render('index.html', { title: 'Home' });
});
app.post('/create',async(req,res)=>{
            try{
            let {username,email,password}=req.body;
            let ispresent=await userSchema.findOne({email})
            if(ispresent){
                return res.status(409).json({message:"email already exist"})
            }
            const hashedPassword= await bcrypt.hash(password,10);
            let createdUser=await userSchema.create({
                username,
                email,
                password:hashedPassword,
            });
            let token=jwt.sign({email:email,userid:createdUser._id,username:createdUser.username},'suyash')
            res.cookie("token",token);
            console.log("created user",createdUser);
            return res.status(200).json({message:"user created successfully"})
    }
    catch(err){
        console.log("some error occur at create",err);
            return res.status(500).json({message:"something went wrong"})
        
    }

});
app.get('/login',async(req,res)=>{
    res.render("login");
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Please sign in first." });
        }
        const isPassCorrect = await bcrypt.compare(password, user.password);
        if (!isPassCorrect) {
            return res.status(401).json({ message: "Incorrect password." });
        }
        let token=jwt.sign({email:email,userid:user._id,username:user.username},(process.env.SSH))
        res.cookie("token",token);
        console.log("User login successful");
        return res.status(200).json({ message: "User login successful" });
    } 
    catch (err) {
        console.log("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
app.get('/logout',(req,res)=>{
    try{
    res.clearCookie("token");
    res.status(200).send({message:"logout successfully"})
    }catch(err){
        res.status(500).send({message:"something went wrong"})
    }
})

app.get('/dashboard',isLogin,(req,res)=>{
    console.log(req.user);
    res.render('dashboard',{ username: req.user.username});    
})
function isLogin(req,res,next){
    const {token}=req.cookies
    if(!token)return res.json({message:"you must be login"})
    try{
        let data=jwt.verify(token,(process.env.SSH));
        req.user=data; 
        next();  
    }catch(err){
        return res.status(403).json({message:"invalid token"})
    }
};

app.listen(parseInt(process.env.PORT),function(){
    console.log("working");  
});