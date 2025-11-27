document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const lastResultDisplay = document.getElementById('last-result-display');
    const calculatorButtons = document.querySelectorAll('.calculator-button');
    const clearButton = document.getElementById('button-clear');
    const equalsButton = document.getElementById('button-equals');
    const numberButtons = document.querySelectorAll('[id^="button-"][id$="0"], [id^="button-"][id$="1"], [id^="button-"][id$="2"], [id^="button-"][id$="3"], [id^="button-"][id$="4"], [id^="button-"][id$="5"], [id^="button-"][id$="6"], [id^="button-"][id$="7"], [id^="button-"][id$="8"], [id^="button-"][id$="9"]');//this line will look for 'id' in html with the word button and the numbers next to them.
    const operatorButtons = document.querySelectorAll('#button-plus, #button-minus, #button-multiply, #button-divide');//will look for the the mathematical signs.

    let currentExpression = '';//will store math equation as selected by user. 
    let isEvaluated = false;//will check if whether '=' has been pressed.

    //local storage items
    const savedLastExpression = localStorage.getItem('lastExpression');
    const savedLastResult = localStorage.getItem('lastResult');

    if (savedLastExpression && savedLastResult) {
        lastResultDisplay.textContent = `${savedLastExpression} = ${savedLastResult}`;
    }//will show the last expression entered by user.
    
    function updateDisplay(value) {
        display.textContent = value;
    }//shows users input into 'display' area at top of calculator 

    function handleNumberClick(event) {
        if (isEvaluated) 
            return;
        
        const value = event.target.textContent;//will look for users clicks on numbers 
        const lastCharIsOperator = /[+\-*/]/.test(currentExpression.slice(-1));
        const currentOperatorIsEmpty = lastCharIsOperator || currentExpression === '';//registers numbers clicks

        if (currentOperatorIsEmpty && value === '0'){
            if (!currentExpression.endsWith('0') || lastCharIsOperator) {
                currentExpression += value;//check whether last entry was number or operator 
            }
        } else {
            currentExpression += value;
        }
            updateDisplay(currentExpression);//should prevent user from using number like '01'
    }

    function handleOperatorClick(event) {
        if (isEvaluated)
            return;
        if ( currentExpression === '')
            return;//will look for when user uses +, -, *, /.

        const operator = event.target.textContent;
        const lastChar = currentExpression.slice(-1);

        if (/[+\-*/]/.test(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + operator;
        }
        else{
            currentExpression += operator;
        }
        updateDisplay(currentExpression);
    }

    function handleEqualClick() {
        if (isEvaluated || currentExpression === '')
            return;//returns user's result

        try {//tries to solve 
            const result = new Function ('return ' + currentExpression)();//registers function that uses '+ _ * /'.
            const fullExpression = `${currentExpression} = ${result}`;

            updateDisplay(fullExpression);
            isEvaluated = true;//prevents user from clicking anywhere until clear is clicked

            calculatorButtons.forEach(button => {
                if (button.id !== 'button-clear') { 
                    button.disabled = true;
                }
            });

            localStorage.setItem('lastExpression', currentExpression);
            localStorage.setItem('lastResult', result);
            lastResultDisplay.textContent = fullExpression;

        }
        catch (error) {
            updateDisplay('Error')
        }
    }

    function handleClearClick() {
        currentExpression = '';
        isEvaluated = false;
        updateDisplay('');//resets calculator for next equation

        calculatorButtons.forEach(button => {
            button.disabled = false;
        });
    }
    numberButtons.forEach(button => {
        button.addEventListener('click', handleNumberClick);
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', handleOperatorClick)
    });

    equalsButton.addEventListener('click', handleEqualClick);

    clearButton.addEventListener('click', handleClearClick);
});
    