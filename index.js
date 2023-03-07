const express = require('express')
const app = express()

const router=require("./indexroutes")
app.use('/',router)

app.listen(3000)