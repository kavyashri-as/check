// Calculator state variables
let display = document.getElementById('result'); // Reference to the display input element
let currentInput = ''; // Current number being entered
let operator = ''; // Current operation (+, -, *, /)
let previousInput = ''; // Previous number (left operand)
let shouldResetDisplay = false; // Flag to reset display after calculation
let memory = 0; // Memory storage for M+/M- functions

/**
 * Appends a value (number or operator) to the display
 * @param {string} value - The value to append (number, operator, or decimal point)
 */
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

/**
 * Updates the calculator display with current values
 * Shows the full expression when operator is present
 */
function updateDisplay() {
    if (operator && previousInput && !currentInput) {
        display.value = previousInput + ' ' + operator;
    } else if (operator && previousInput && currentInput) {
        display.value = previousInput + ' ' + operator + ' ' + currentInput;
    } else {
        display.value = currentInput || '0';
    }
}

/**
 * Clears the calculator display and resets all values
 */
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    display.value = '0';
}

/**
 * Deletes the last entered character from current input
 */
function deleteLast() {
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

/**
 * Performs the calculation based on the selected operator
 * Handles division by zero and floating point precision
 */
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
/**
 * Clears the calculator's memory
 */
function memoryClear() {
    memory = 0;
}

/**
 * Recalls the value stored in memory and displays it
 */
function memoryRecall() {
    currentInput = memory.toString();
    updateDisplay();
}

/**
 * Adds the current display value to memory
 */
function memoryAdd() {
    if (currentInput !== '') {
        memory += parseFloat(currentInput) || 0;
    }
}

/**
 * Subtracts the current display value from memory
 */
function memorySubtract() {
    if (currentInput !== '') {
        memory -= parseFloat(currentInput) || 0;
    }
}

// Add keyboard support for better accessibility
/**
 * Keyboard event listener for calculator operations
 * Supports numbers, operators, and control keys
 */
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