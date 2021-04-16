const express = require('express')
 const app = express()
 
//  console.log(app)


//logger middleware

function logger(req , res , next) {
console.table({ method : req.method , path : req.url})
next() ; 
}

app.get("/" ,logger , (req, res)=>{
   
    res.sendFile(__dirname+"/public/index.html")
})

app.get("/services" ,logger ,(req , res)=>{
    
    res.sendFile(__dirname+"/public/services.html")
})

// serve the css 
app.get('/public/style.css' , logger , (req , res)=>{
    
    res.sendFile(__dirname+"/public/style.css")
})

// start the server 

const port = 5000 
app.listen(port , ()=>{
    console.log(`the server is running on port ${port}`)
})

//crud example

let users = [
    {
        name : "jhon doe" ,
        age : 27 ,
        id :0
    },
    {
        name : "jhane doe " ,
        age : 25,
        id:1
    }
]
//get users
app.get('/users' , (req , res)=>{
    res.send(users)
})

// add user
//after console req.body app.use(express.json())
app.use(express.json())
app.post('/add' , (req , res)=>{
    //const newuser = ?? 
    //newuser.id = Date.now()
    //users =[...users , newuser]
    //console.log(req.body)
    console.log(req.body)
    const newuser = req.body 
    newuser.id = Date.now()
    users =[...users , newuser]
   
    res.send({msg:"user added" ,users})
})


//update id
app.put('/update/:userid', (req,res)=>{
    const id = req.params.userid 
    const newuser=req.body
    users = users.map(user=>user.id == id  ? {...user,  ...newuser} : user)
  
    res.send({msg:"user updated" ,users})
})


//delete id

app.delete('/update/:userid', (req,res)=>{
    const id = req.params.userid 
    users = users.filter(user=>user.id != id )
  
    res.send({msg:"user deleted" ,users})
})

