const calculatorDisplay = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // Replace Display if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
    // If display is 0, replace, if not, add number
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, dont add decimal
  if (awaitingNextValue) return;
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calculate first and 2nd values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready next value, save operator
  awaitingNextValue = true;

  operatorValue = operator;
}

// Event listeners
inputBtn.forEach((inputButton) => {
  if (inputButton.classList.length === 0) {
    inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
  } else if (inputButton.classList.contains('operator')) {
    inputButton.addEventListener('click', () => useOperator(inputButton.value));
  } else if (inputButton.classList.contains('decimal')) {
    inputButton.addEventListener('click', () => addDecimal());
  }
});

// Reset display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

clearBtn.addEventListener('click', resetAll);