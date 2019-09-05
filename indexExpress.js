const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const fs = require('fs');

const { calculator }  = require('./helpers');

const app = express();
const port = 3000

 
//middleware

app.use(bodyParser.json());


//1. /calculator/num1/num2/operator route(GET) that works with these operators: +, -, *, /, %(percentage)
// Example: /calculator/20/10/% returns %10


app.get('/calculator/:a/:b/:operator', (req, res) => {
    let {a, b, operator} = req.params; 
    res.send({data:calculator(a, b, operator)}); 
});

// 2. /todo route that makes possible to add new todo with POST, get all todos with GET, 
//delete a todo with DELETE method.

var todoList = ["ga boodschappen", "koopt een brood", "koopt fraut"];

//get all todos with GET/

// app.get('/todo', (req, res) => {
//     res.send(todoList);
// })

app.get('/todo', (req, res) => {
    let todos = '';
    for(value of todoList){
        todos += `<p>${value}</p> <hr/>`;
    }
    res.send(`<h3> Boodschap List: </h3> ${todos}`);
});

//add new todo with POST

app.post('/todo', (req, res) => {
 
   todoList.push(req.body.todo);
   res.send(todoList);
});

//delete a todo with DELETE method

app.delete('/todo/:id', (req, res) => {
    todoList = todoList.filter(val => val !== req.params.id);
    res.send(todoList);
});

// 3. /future/hours route(GET) that adds given hours to the current datetime and returns result.
app.get('/future/:hours', (req, res) => {

    let futureDate = moment().add(req.params.hours, 'hours').format('LLL');

    res.send(futureDate);
})



// 4. /login route((POST) that checks if the given username and password is 
// correct or not and will respond with appropriate status code.
// The correct credentials; username: admin, password:password.

app.post('/login',(req,res)=>{

    var username = req.body.username;
    
    var password = req.body.password;

    if(username=='admin' && password=='password'){
    res.send('Welcome '+ username)
    }else{
        res.status(401).json({msg: 'please include a user name and password'})
    }
    
})


// 5. /report route(POST) that gets the example data below and creates a json file based on that report in the reports folder. 
// The json file will have the name of customer.
// Example data:
// {
//   "customer": "X Company",
//   "budget": "$200",
//   "submitDate: "22-10-2019"
// }
// Example file: X Company.json


app.post('/report', (req, res) => {

    let { customer } = req.body;

    let isDirExist = fs.existsSync('./report');

    if(!isDirExist) {
        fs.mkdirSync('./report');
    }

    fs.writeFileSync(`./report/${customer}.json`, JSON.stringify(req.body));

    res.send('saved');

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));