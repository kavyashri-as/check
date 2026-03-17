let displayElement = document.getElementById('result');
let currentOperand = '';
let pendingOperator = '';
let previousOperand = '';
let pendingDisplayReset = false;
let memoryValue = 0;

function handleInput(value) {
    if (pendingDisplayReset) {
        currentOperand = '';
        pendingDisplayReset = false;
    }
    
    // Handle operators
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentOperand === '' && previousOperand === '') {
            return; // Don't allow operator as first input
        }
        
        if (previousOperand !== '' && currentOperand !== '' && pendingOperator !== '') {
            performCalculation();
        }
        
        pendingOperator = value;
        previousOperand = currentOperand || previousOperand;
        currentOperand = '';
        updateDisplay();
        return;
    }
    
    // Handle decimal point
    if (value === '.') {
        if (currentOperand.includes('.')) {
            return; // Don't allow multiple decimal points
        }
        if (currentOperand === '') {
            currentOperand = '0.';
        } else {
            currentOperand += value;
        }
    } else {
        currentOperand += value;
    }
    
    updateDisplay();
}

function updateDisplay() {
    if (pendingOperator && previousOperand && !currentOperand) {
        displayElement.value = previousOperand + ' ' + pendingOperator;
    } else if (pendingOperator && previousOperand && currentOperand) {
        displayElement.value = previousOperand + ' ' + pendingOperator + ' ' + currentOperand;
    } else {
        displayElement.value = currentOperand || '0';
    }
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    pendingOperator = '';
    displayElement.value = '0';
}

function deleteLastCharacter() {
    if (currentOperand) {
        currentOperand = currentOperand.slice(0, -1);
        updateDisplay();
    }
}

function performCalculation() {
    if (previousOperand === '' || currentOperand === '' || pendingOperator === '') {
        return;
    }
    
    let calculationResult;
    const leftOperand = parseFloat(previousOperand);
    const rightOperand = parseFloat(currentOperand);
    
    if (isNaN(leftOperand) || isNaN(rightOperand)) {
        return;
    }
    
    switch (pendingOperator) {
        case '+':
            calculationResult = leftOperand + rightOperand;
            break;
        case '-':
            calculationResult = leftOperand - rightOperand;
            break;
        case '*':
            calculationResult = leftOperand * rightOperand;
            break;
        case '/':
            if (rightOperand === 0) {
                alert('Error: Division by zero!');
                clearDisplay();
                return;
            }
            calculationResult = leftOperand / rightOperand;
            break;
        default:
            return;
    }
    
    // Handle floating point precision
    calculationResult = Math.round((calculationResult + Number.EPSILON) * 100000000) / 100000000;
    
    currentOperand = calculationResult.toString();
    pendingOperator = '';
    previousOperand = '';
    pendingDisplayReset = true;
    displayElement.value = currentOperand;
}

// Memory functions
function clearMemory() {
    memoryValue = 0;
}

function recallMemory() {
    currentOperand = memoryValue.toString();
    updateDisplay();
}

function addToMemory() {
    if (currentOperand !== '') {
        memoryValue += parseFloat(currentOperand) || 0;
    }
}

function subtractFromMemory() {
    if (currentOperand !== '') {
        memoryValue -= parseFloat(currentOperand) || 0;
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const pressedKey = event.key;
    
    if ('0123456789'.includes(pressedKey)) {
        handleInput(pressedKey);
    } else if ('+-*/'.includes(pressedKey)) {
        handleInput(pressedKey);
    } else if (pressedKey === '.') {
        handleInput('.');
    } else if (pressedKey === 'Enter' || pressedKey === '=') {
        event.preventDefault();
        performCalculation();
    } else if (pressedKey === 'Escape' || pressedKey === 'c' || pressedKey === 'C') {
        clearDisplay();
    } else if (pressedKey === 'Backspace') {
        event.preventDefault();
        deleteLastCharacter();
    }
});

// Initialize display
clearDisplay();