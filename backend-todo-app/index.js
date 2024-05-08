const express = require('express')
const app = express();
const port = 3000;
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(cors())

const userSchema = new mongoose.Schema({
    username : String ,
    password : String ,
    todos : [{type : mongoose.Schema.Types.ObjectId , ref : 'Todos'}]
})

const todosSchema = new mongoose.Schema({
    title : String,
    description : String,
})

const Todos = mongoose.model('Todos' , todosSchema);
const User = mongoose.model('User' , userSchema);

const screteKey = "superS3cr3t"
 const generateToken=(user)=>{
    const payload = {username : user.username};
    return jwt.sign(payload , screteKey , {expiresIn : '1h'})
 }

const authenticateUser=(req,res,next)=>{
    const header1 = req.headers.authorization

    if(header1){
        const token = header1.split(' ')[1]
        jwt.verify(token , screteKey , (err,user)=>{
            if(err){
                // console.log(err)
                return res.sendStatus(403)
            }

            req.user = user;
            next()
        })
    }else{
        res.sendStatus(404)
    }
}

mongoose.connect('mongodb+srv://prathameshtheurkar037:Prathamesh%401@cluster0.s8asa1j.mongodb.net/' ,{dbName : "todos-app"} )

app.post('/todos/signup' ,async  (req,res)=>{
    const {username , password} = req.body;
    const user = await User.findOne({username , password})

    if(user){
        res.json({user: false ,message : "User is already signed up!!"})
    }else{
        const newUserObj = {
            username : username ,
            password : password ,
            todos : []
        }
        const newUser = new User(newUserObj)
        const dummyUser = await newUser.save();
        console.log(dummyUser)
        const token = generateToken(newUserObj)
        res.json({user: true , message : "Signed Up successfully!!" , token : token})
    }
})

app.post('/todos/signin' , async (req , res)=>{
    const {username , password} = req.body;

    const user = await User.findOne({username , password})
    if(user){
        const token = generateToken({username , password})
        res.json({user: true ,message : "User Login Successfully!!" , token : token})
    }else{
        res.json({user: false ,message : "User does not exits!!"})
    }
})

app.get('/todos/user' , authenticateUser , (req,res)=>{
    res.json({
        username : req.user.username
    })
})

app.get('/todos' , authenticateUser ,async (req,res)=>{
    // const todos = await Todos.find({})
    const user = await User.findOne({username : req.user.username}).populate('todos')
    res.json({todos : user.todos})
})

app.post('/todos' , authenticateUser, async (req,res)=>{
    const {title , description} = req.body;
    
    const newTodo = new Todos({title , description})
    await newTodo.save()
    const user = await User.findOne({username : req.user.username})
    user.todos.push(newTodo)
    await user.save()
    res.json({message : "Added todo"})
})

app.delete('/todos/:id' , authenticateUser , async (req,res)=>{
    const id = req.params.id;
    const todo = await Todos.findByIdAndDelete(id);
    console.log(todo)
    const user = await User.findOne({username : req.user.username})
    const refTodo = user.todos.indexOf(id)
    user.todos.splice(refTodo , 1)
    await user.save()
    // res.json({message : "Todo Deleted"})
    res.sendStatus(200)
})

app.listen(port , ()=>{
    console.log('Server is running on port : 3000')
})