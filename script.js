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
    const savelastExpression = localStorage.getItem('lastExpression');
    const saveLastResult = localStorage.getItem('lastResult');

    if (savelastExpression && saveLastResult) {
        lastResultDisplay.textContent = '${saveLastExpression} = ${saveLastResult}';
    }//will show the last expression entered by user.
    
    function updateDisplay(value) {
        display.textContent = value;
    }//shows users input into 'display' area at top of calculator 

    function handleNumClick(event) {
        if (isEvaluated) return;
        const value = event.target.textContent;//will look for users clicks on numbers 

        const lastIsOperator = /[+\-*/]/.test(currentExpression.slice(-1));
        const currentOperatorIsEmpty = lastIsOperator || currentExpression === '';//registers numbers clicks

        if (currentOperatorIsEmpty && value === '0'){
            if (!currentExpression.endswith('0') || lastIsOperator) {
                currentExpression += value;//check whether last entry was number or operator 
            }
            else {
                currentExpression += value;
            }
            updateDisplay(currentExpression);//should prevent user from using number like '01'
        }
    }
});
    