const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const { calculator, hours, companies }  = require('./helpers');



const app = express();
const port = 3000

app.get('/', (req, res) => {
 res.send('Hello World!');  
});

app.use(bodyParser.urlencoded({extended:true}));


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

app.use(hours);


// 4. /login route((POST) that checks if the given username and password is 
// correct or not and will respond with appropriate status code.
// The correct credentials; username: admin, password:password.


app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})


app.post('/login',(req,res)=>{

    var username = req.body.user;
    
    var password = req.body.pass;

    if(username=='admin' && password=='password'){
    res.send('Welcome '+username+' '+password)
    }else{
        res.status(400).json({msg: 'please include a user name and password'})
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

app.get('/report',(req,res)=>{
    res.send(companies)
   
})

app.post('/report', (req, res) => {

    res.json(companies.map(n => n.customer));
    fs.writeFileSync('customer.json', JSON.stringify(companies.map(n => n.customer)));

})



app.listen(port, () => console.log(`Example app listening on port ${port}!`));