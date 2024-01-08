/*
BASIC OPERATORS
*/
let add = function (a, b) {
    return a + b
}

let subtract = function (a, b) {
    return a - b
}

let multiply = function (a, b) {
    return a * b
}

let divide = function (a, b) {
    return a / b
}

let operate = function (a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b).toFixed(4);
    }
}
/* 
#########################################
*/

/*
INIT UI
*/
let createDisplay = function (displayContainer) {
    for (let i = 0; i < 5; i++) {
        switch (i) {
            case 0:
                const firstNumberLabel = document.createElement('label');
                firstNumberLabel.setAttribute('id', 'firstNumber');
                firstNumberLabel.setAttribute('class', 'displayLabel');
                displayContainer.appendChild(firstNumberLabel);
                break;
            case 1:
                const operatorLabel = document.createElement('label');
                operatorLabel.setAttribute('id', 'operatorLabel');
                operatorLabel.setAttribute('class', 'displayLabel');
                displayContainer.appendChild(operatorLabel);
                break;
            case 2:
                const secondNumberLabel = document.createElement('label');
                secondNumberLabel.setAttribute('id', 'secondNumber');
                secondNumberLabel.setAttribute('class', 'displayLabel');
                displayContainer.appendChild(secondNumberLabel);
                break;
            case 3:
                const equalsLabel = document.createElement('label');
                equalsLabel.setAttribute('class', 'displayLabel');
                displayContainer.appendChild(equalsLabel);
                break;
            case 4:
                const resultLabel = document.createElement('label');
                resultLabel.setAttribute('id', 'resultLabel');
                resultLabel.setAttribute('class', 'displayLabel');
                displayContainer.appendChild(resultLabel);
                break;
        }
    }
}
let createButtons = function (buttonsContainer) {
    for (let i = 0; i < 18; i++) {
        if (i < 10) {
            let button = document.createElement('button');
            button.setAttribute('class', 'userInputButton')
            button.textContent = i;
            buttonsContainer.appendChild(button);
        }
        else {
            switch (i) {
                case 10:
                    const plusOperatorBtn = document.createElement('button');
                    plusOperatorBtn.setAttribute('class', 'operatorBtn');
                    plusOperatorBtn.setAttribute('id', 'plusOperatorBtn');
                    plusOperatorBtn.textContent = '+';
                    buttonsContainer.appendChild(plusOperatorBtn);
                    break;
                case 11:
                    const minusOperatorBtn = document.createElement('button');
                    minusOperatorBtn.setAttribute('class', 'operatorBtn');
                    minusOperatorBtn.setAttribute('id', 'minusOperatorBtn');
                    minusOperatorBtn.textContent = '-';
                    buttonsContainer.appendChild(minusOperatorBtn);
                    break;
                case 12:
                    const multiplyOperatorBtn = document.createElement('button');
                    multiplyOperatorBtn.setAttribute('class', 'operatorBtn');
                    multiplyOperatorBtn.setAttribute('id', 'multiplyOperatorBtn');
                    multiplyOperatorBtn.textContent = '*';
                    buttonsContainer.appendChild(multiplyOperatorBtn);
                    break;
                case 13:
                    const divideOperatorBtn = document.createElement('button');
                    divideOperatorBtn.setAttribute('class', 'operatorBtn');
                    divideOperatorBtn.setAttribute('id', 'divideOperatorBtn');
                    divideOperatorBtn.textContent = '/';
                    buttonsContainer.appendChild(divideOperatorBtn);
                    break;
                case 14:
                    const resultBtn = document.createElement('button');
                    resultBtn.setAttribute('class', 'actionButton');
                    resultBtn.setAttribute('id', 'resultBtn');
                    resultBtn.textContent = '=';
                    buttonsContainer.appendChild(resultBtn);
                    break;
                case 15:
                    const dotBtn = document.createElement('button');
                    dotBtn.setAttribute('class', 'actionButton');
                    dotBtn.setAttribute('id', 'dotBtn');
                    dotBtn.textContent = '.';
                    buttonsContainer.appendChild(dotBtn);
                    break;
                case 16:
                    const backBtn = document.createElement('button');
                    backBtn.setAttribute('class', 'actionButton');
                    backBtn.setAttribute('id', 'backBtn');
                    backBtn.textContent = '←';
                    buttonsContainer.appendChild(backBtn);
                    break;
                case 17:
                    const clearBtn = document.createElement('button');
                    clearBtn.setAttribute('class', 'actionButton');
                    clearBtn.setAttribute('id', 'clearBtn');
                    clearBtn.textContent = 'CLR';
                    buttonsContainer.appendChild(clearBtn);
                    break;
            }
        }
    }
}

let buttonsContainer = document.getElementById('buttonsContainer');
let displayContainer = document.getElementById('displayContainer');

createDisplay(displayContainer)
createButtons(buttonsContainer)
/* 
#########################################
*/

let operatorPressed = false;

let handleInputs = function (target) {
    const firstNumber = document.getElementById('firstNumber');
    const operand = document.getElementById('operatorLabel');
    const secondNumber = document.getElementById('secondNumber');
    const resultNumber = document.getElementById('resultLabel');

    // Check if an operator button is pressed
    if (target.className === 'operatorBtn') {
        if (firstNumber.textContent != '') {
            operatorPressed = true;
            if (secondNumber.textContent != '') {
                let result = operate(parseFloat(firstNumber.textContent), parseFloat(secondNumber.textContent), operand.textContent);
                firstNumber.textContent = `${result}`;
                secondNumber.textContent = '';
                resultNumber.textContent = '';
            }
            operand.textContent = target.textContent;
        }
    }

    // Check if an operator button was pressed in order to select the correct display item
    if (operatorPressed && target.className === 'userInputButton') {
        secondNumber.textContent += target.textContent;
    }
    else if (target.className === 'userInputButton') {
        firstNumber.textContent += target.textContent;
    }

    if (target.id === 'resultBtn') {
        if (firstNumber.textContent && (secondNumber.textContent != '' && secondNumber.textContent != '0')) {
            resultNumber.textContent = `= ${operate(parseFloat(firstNumber.textContent), parseFloat(secondNumber.textContent), operand.textContent)}`
        }

        if (firstNumber.textContent != '' && secondNumber.textContent == '0') {
            firstNumber.textContent = '';
            secondNumber.textContent = '';
            operand.textContent = '';
            resultNumber.textContent = 'Division by zero not allowed. Press CLR to restart.'
        }
    }

    if (target.id === 'clearBtn') {
        [firstNumber, operand, secondNumber, resultNumber].forEach(item => {
            item.textContent = '';
        })
        operatorPressed = false;
    }

    if (target.id === 'dotBtn') {
        if (firstNumber.textContent != '' && !(firstNumber.textContent.includes('.')) && secondNumber.textContent == '') {
            firstNumber.textContent += '.'
        }
        else if (secondNumber.textContent != '' && !(secondNumber.textContent.includes('.')) && resultNumber.textContent == '') {
            secondNumber.textContent += '.'
        }
    }

    if (target.id === 'backBtn') {
        if (firstNumber.textContent != '' && secondNumber.textContent == '' && operand.textContent == '') {
            firstNumber.textContent = firstNumber.textContent.slice(0, -1,);
        }
        else if (operand.textContent != '' && secondNumber.textContent == '') {
            operand.textContent = operand.textContent.slice(0, -1);
            operatorPressed = false;
        }
        else if (secondNumber.textContent != '') {
            secondNumber.textContent = secondNumber.textContent.slice(0, -1,);
        }
    }
}

buttonsContainer.addEventListener('click', (e) => {
    let target = e.target;
    handleInputs(target)

})

