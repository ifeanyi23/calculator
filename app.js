class Calculator {
    constructor(previousTextField, currentTextField){
        this.previousTextField = previousTextField;
        this.currentTextField = currentTextField
        this.clear();
    }

    clear () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete () {
      this.currentOperand = this.currentOperand.toString().slice(0, -1); 
    }


    appendNumber (num) {
        if(num === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    /*formatNumber (num) {

        var numSplit, int, dec;
        num = num.toString();
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];

        return  int + '.' + dec;

    }*/


    updateField () {
        this.currentTextField.innerText = this.currentOperand;
        if(this.operation != null) {
            this.previousTextField.innerText = `${this.previousOperand} ${this.operation}`;
        }else{
            this.previousTextField.innerText = '';
        }
        
        
    }

    chooseOperation (operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    compute () {
        var computation;
        var prev = parseFloat(this.previousOperand);
        var curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return;
       
       
        switch(this.operation){
            case '+':
             computation = prev + curr;
            break;

            case '-':
            computation = prev - curr;
            break;

            case '*':
                computation = prev * curr;
            break;

            case '/':
                computation = prev / curr;
            break;

            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }



}



var numberButton = document.querySelectorAll('#number');
var deleteButton = document.querySelector('#del');
var equalButton = document.querySelector('#equal-to');
var allClearButton = document.querySelector('#all-clear');
var operatorButton = document.querySelectorAll('#operator');
var previousTextField = document.querySelector('#previous');
var currentTextField = document.querySelector('#current');

var calculator = new Calculator(previousTextField, currentTextField);


numberButton.forEach(button => {
    button.addEventListener('click', function() {
        calculator.appendNumber(button.innerText);
        calculator.updateField();
    })
});

operatorButton.forEach(button => {
    button.addEventListener('click', function() {
        calculator.chooseOperation(button.innerText);
        calculator.updateField();
    })
});

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateField();
});


allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateField();
});


deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateField();
});
