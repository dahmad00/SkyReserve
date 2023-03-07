const { Router } = require('express')
const express = require('express')
const app = express.Router()

const {people,groups}=require("./controllers/Searchcontroller")
const {mygroup,creategroup}=require("./controllers/groupcontroller")
app.get('/people',(req,res)=>{
    people(req,res);
})
app.get('/groups',(req,res)=>{
    groups(req,res);
})
app.get('/mygroup',(req,res)=>{
    mygroup(req,res);
})
app.get('/creategroup',(req,res)=>{
    creategroup(req,res);
})

module.exports=app;