const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app =express()
app.use(express.json())
app.use(cors())
const userModel = require('./models/User')
const url = 'mongodb+srv://naveen:mangodb@cluster0.k0mwk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url)


app.get('/', async (req,res)=>{
    try{
        const result = await userModel.find({})
        res.send(result)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/adduser', async(req,res)=>{
      const newUser = new userModel(req.body)
      try{
            await newUser.save()
      }
      catch(err){
        console.log(err)
      }
})


app.listen(2005,()=>{
    console.log("server running at http://localhost:2005")
})