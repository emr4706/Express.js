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
            
            return a*(b/100);
                    
        default:
            return 'Invalid operator';
    }
};



module.exports = {
    calculator
};
