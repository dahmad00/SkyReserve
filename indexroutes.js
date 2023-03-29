const { Router } = require('express')
const express = require('express');
const app = express.Router()
const cntrol=require('./controllers/customerController')
//const {getAllCustomer,getCustomerBookings}=require("./controllers/customerController");
//const { customer } = require('./models/customer');
/*
const {mygroup,creategroup}=require("./controllers/groupcontroller")
const {Home,Account,About,Friends}=require("./controllers/profilecontroller")

const {Posts,Threads}=require("./controllers/TimelineController")
const {Login,Registration}=require("./controllers/homecontroller")
*/
app.get('/getAllCustomer',cntrol.getAllCustomer);
app.post('/addCustomer',cntrol.addCustomer);
app.get('/delete',cntrol.delete);

//app.get('/getCustomerBookings',customer/getCustomerBookings);



/*
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
//
app.get('/Home',(req,res)=>{
    Home(req,res);
})
app.get('/Account',(req,res)=>{
    Account(req,res);
})
app.get('/About',(req,res)=>{
    About(req,res);
})
app.get('/Friends',(req,res)=>{
    Friends(req,res);
})
app.get('/Posts',(req,res)=>{
    Posts(req,res);
})
app.get('/Threads',(req,res)=>{
    Threads(req,res);
})


app.get('/Registration',(req,res)=>{
    Registration(req,res);
})

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/register.html');
});
app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/login.html');
});
app.get('/booking.form',(req,res)=>{
    res.sendFile(__dirname+'/booking.form.html');
});
*/
module.exports=app;