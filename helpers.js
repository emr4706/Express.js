function calculator(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "-":
            
            return a - b;
        case "+":
            
            return a + b; 
        case "/":
            
            return a / b;
        case "*":
            
            return a * b;;
        case "%":
            
            return b / a;
                    
        default:
            return 'Invalid operator';
    }
};

const moment = require('moment');

var hours = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:
    ${moment().format()}`); 
    
    next();
 };

 const companies = [
{
    customer: "A Company",
    budget: "$200",
    submitDate: " 20-6-2013 "
},
{
customer: "B Company",
    budget: "$300",
    submitDate: " 22-9-2014 "
},
{
    customer: "C Company",
    budget: "$400",
    submitDate: " 2-11-2015 "
}
];

module.exports = {
    calculator, hours, companies 
};
