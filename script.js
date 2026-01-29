let calculatorDisplayElement = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;
let memory = 0;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Handle operators
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput === '' && previousInput === '') {
            return; // Don't allow operator as first input
        }
        
        if (previousInput !== '' && currentInput !== '' && operator !== '') {
            calculate();
        }
        
        operator = value;
        previousInput = currentInput || previousInput;
        currentInput = '';
        updateDisplay();
        return;
    }
    
    // Handle decimal point
    if (value === '.') {
        if (currentInput.includes('.')) {
            return; // Don't allow multiple decimal points
        }
        if (currentInput === '') {
            currentInput = '0.';
        } else {
            currentInput += value;
        }
    } else {
        currentInput += value;
    }
    
    updateDisplay();
}

function updateDisplay() {
    if (operator && previousInput && !currentInput) {
        calculatorDisplayElement.value = previousInput + ' ' + operator;
    } else if (operator && previousInput && currentInput) {
        calculatorDisplayElement.value = previousInput + ' ' + operator + ' ' + currentInput;
    } else {
        calculatorDisplayElement.value = currentInput || '0';
    }
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    calculatorDisplayElement.value = '0';
}

function deleteLast() {
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }
    
    let result;
    const previousValue = parseFloat(previousInput);
    const currentValue = parseFloat(currentInput);
    
    if (isNaN(previousValue) || isNaN(currentValue)) {
        return;
    }
    
    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            if (currentValue === 0) {
                alert('Error: Division by zero!');
                clearDisplay();
                return;
            }
            result = previousValue / currentValue;
            break;
        default:
            return;
    }
    
    // Handle floating point precision
    result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
    
    currentInput = result.toString();
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;
    calculatorDisplayElement.value = currentInput;
}

// Memory functions
function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    currentInput = memory.toString();
    updateDisplay();
}

function memoryAdd() {
    if (currentInput !== '') {
        memory += parseFloat(currentInput) || 0;
    }
}

function memorySubtract() {
    if (currentInput !== '') {
        memory -= parseFloat(currentInput) || 0;
    }
}

// Add keyboard support
document.addEventListener('keydown', function(keyboardEvent) {
    const pressedKey = keyboardEvent.key;
    
    if ('0123456789'.includes(pressedKey)) {
        appendToDisplay(pressedKey);
    } else if ('+-*/'.includes(pressedKey)) {
        appendToDisplay(pressedKey);
    } else if (pressedKey === '.') {
        appendToDisplay('.');
    } else if (pressedKey === 'Enter' || pressedKey === '=') {
        keyboardEvent.preventDefault();
        calculate();
    } else if (pressedKey === 'Escape' || pressedKey === 'c' || pressedKey === 'C') {
        clearDisplay();
    } else if (pressedKey === 'Backspace') {
        keyboardEvent.preventDefault();
        deleteLast();
    }
});

// Initialize display
clearDisplay();