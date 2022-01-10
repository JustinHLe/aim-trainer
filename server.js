var express = require('express')
const dbOperation = require('./dbFiles/projectSQL/dbOperation')
var mysql = require('mysql')
const Employee = require('./dbFiles/sqlDemo/employee')
var app = express()
const cors = require("cors")

// var connection = mysql.createConnection({
//     host: '',
//     user: '',
//     database: ''
// })

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.post("/create", async (req,res) => {
    console.log(req.body)
    const result = await dbOperation.createUser(req.body)
    console.log(result)
    res.send(result)
})

app.get("/getTopUsers", async (req,res) => {
    const result = await dbOperation.getTop5Users()
    console.log(result)
    res.send(result)
    return result
})

app.get("/", function(req,res){
    res.send("You've reached the home page")
})


// app.get("/joke", function(req,res){
//     var joke = "my life"
//     res.send(joke)
// })

// app.get("/random_num", function(req,res){
//     var rNum = Math.floor(Math.random() * 10) + 1;
//     res.send("your number is " + rNum)
// })

// dbOperation.getEmployees().then(res => {
//     console.log(res.recordset)
// })

// let Vader = new Employee(1002, 'Darth', 'Vader', 26, 'male')
// dbOperation.createEmployee(Vader)

app.listen(8081, ()=>{
    console.log("server started on 8081")
})