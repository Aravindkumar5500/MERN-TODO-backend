const express = require ('express');
const mongoose = require ('mongoose')
const cors = require ('cors')
const {todo} = require ('./model/backend');
const {user} = require ('./model/user')
const { connect } = require('http2');
const jwt = require  ("jsonwebtoken")

const app = express()

app.use(cors())
app.use(express.json())
const SECRET = "Secret456"

app.use(['/update/:id','/delete/:id'],auth)

async function connectDB(){
    try{
        const connection = await mongoose.connect('mongodb+srv://aravindad557574:wj0VJ4ull21l7ise@merntodolist.f2y94.mongodb.net/?retryWrites=true&w=majority&appName=MERNTODOlist',{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(connection.connection.host)

    } catch(error){
        console.log(error)
        //  next(error)

    }
}
connectDB()


app.post('/add',async(req,res,next)=>{
try {
    let note = new todo (req.body)
    let data = await note.save()

    res.send ({message:"add is done",status:200,data:data})
} catch (error) {
   console.log(error)
   next(error) 
}
})

app.get('/todo',async(_req,res,next)=>{
    try{
        let data = await todo.find()
        res.send({message:"list show",status:200,data:data})

    } catch(error){
      console.log(error)
      next(error)

    }
})

app.put("/update/:id",auth,async(req,res,next)=>{
    try {
        let data = await todo.findByIdAndUpdate(req.params.id,{task:req.body.task})
        res.send({message:"update",data:data,status:200})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

app.delete("/delete/:id",auth,async(req,res,next)=>{
    try {
        let data = await todo.findByIdAndDelete(req.params.id)
        res.send({message:"delete",data:data,status:200})
    } catch (error) {
        console.log(error)
        next(error)
    }
})
app.post('/register',async(req,res,next)=>{

    
    try {
        let {email} =req.body
         let data = await user.findOne({email:email})
        
       
        if(data){
            res.send({message:"Already Account exist for this email",status:201,data:data})
            return;
        }else{
           
            let regdata = new user (req.body)
            let savedData = await regdata.save()
            let token = jwt.sign({id:savedData._id},SECRET,{expiresIn:"5m"})

            res.send({message:"Registered Successfully",status:200,token:token,data:savedData})
        }
    } catch (error) {
         next(error)
    }
})

// app.post('/login',async(req,res,next)=>{
//     try{
//         let {email,password} = req.body
//         let data = await user.findOne(email,password) 
      
//         if(data){
//             if(data.email == email && data.password == password){
//                 let token = jwt.sign({id:data._id},SECRET,{expiresIn:"5m"})
//                 res.send({message:"Login Success",status:200,token:token})
//             }else{
//                 res.send({message:"Invalid Password",status:400})
//             }
//         }else{
//             res.send({message:"Account not found",status:404})
//         }
//     } catch (error) {
//         next(error)
//     }
//     }
// )
app.post('/login', async (req, res, next) => {
    try {
        let { email, password } = req.body;
        // Correct usage: pass an object as the query
        let data = await user.findOne({ email: email });

        if (data) {
            // If passwords are hashed, use bcrypt.compare here
            if (data.password === password) {
                let token = jwt.sign({ id: data._id }, SECRET, { expiresIn: "5m" });
                res.send({ message: "Login Success", status: 200, token: token });
            } else {
                res.send({ message: "Invalid Password", status: 400 });
            }
        } else {
            res.send({ message: "Account not found", status: 404 });
        }
    } catch (error) {
        next(error);
    }
});

function auth(req,res,next){
    try {
        let token = req.headers.token
        let result = jwt.verify(token,SECRET)
        if(result){
             next()
            return;
        }else{
            res.send({message:error.message,status:400})
            return
        }
    } catch (error) {
        res.send({message:error.message,status:401})
        next(error)
    }
}
app.get("/signup",async(_req,res,next)=>{
    try {
       
        res.send({message:"You Have Access",status:200})
    } catch (error) {
        next(error)
    }
}
)
app.use((error, _req, res, _next) => {
    res.status(500).send({
        status: 500,
        error: error?.message ?? "server error"
    });
});
app.listen(3001,()=>console.log("Server 3001 is running"))