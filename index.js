const express = require('express')
const app = express()
var mysql = require('mysql2/promise')


const router=require("./indexroutes")


const userModel = require('./models/user')


app.use('/',router)


userModel.createUser();

var con


// async function queryFunction() {
//     var connection = await mysql.createConnection({
//         host     : 'localhost',
//         user     : 'root',
//         password : '',
//         database : 'books'
//       });
//     [con] = await connection.execute(
//         'SELECT * FROM book'
//     );    

//     console.log(con)
// }

// queryFunction();





app.listen(3000)