document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const lastResultDisplay = document.getElementById('last-result-display');
    const calculatorButtons = document.querySelectorAll('.calculator-button');
    const clearButton = document.getElementById('button-clear');
    const equalsButton = document.getElementById('button-equals');
    const numberButtons = document.querySelectorAll('[id^="button-"][id$="0"], [id^="button-"][id$="1"], [id^="button-"][id$="2"], [id^="button-"][id$="3"], [id^="button-"][id$="4"], [id^="button-"][id$="5"], [id^="button-"][id$="6"], [id^="button-"][id$="7"], [id^="button-"][id$="8"], [id^="button-"][id$="9"]');//this line will look for 'id' in html with the word button and the numbers next to them.
    const operatorButtons = document.querySelectorAll('#button-plus, #button-minus, #button-multiply, #button-divide');//will look for the the mathematical signs.

});
    