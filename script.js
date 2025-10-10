let display = document.getElementById('result');
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
        display.value = previousInput + ' ' + operator;
    } else if (operator && previousInput && currentInput) {
        display.value = previousInput + ' ' + operator + ' ' + currentInput;
    } else {
        display.value = currentInput || '0';
    }
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '0';
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
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Error: Division by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
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
    display.value = currentInput;
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
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if ('0123456789'.includes(key)) {
        appendToDisplay(key);
    } else if ('+-*/'.includes(key)) {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Initialize display
clearDisplay();