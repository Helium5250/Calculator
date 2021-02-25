const equationDisplay = document.querySelector('#equation');
const currentNumDisplay = document.querySelector('#currentNum');
const keys = document.querySelector('#keys');

document.body.onmousemove = (event) => {
    keys.style.setProperty('background-position', (event.clientX - 120) + 'px ' + (event.clientY - 120) + 'px');
};

function isNumeric(num) {
    return !isNaN(num - parseFloat(num));
}

const getFactorial = (num) =>
    (num === 0)
        ? 1
        : (num > 0)
            ? num * getFactorial(num - 1)
            : num * getFactorial(num + 1);

function compute(firstNum, operation, secondNum) {
    let answer = 0;
    switch (operation) {
        case '÷':
            answer = firstNum / secondNum;
            break;
        case '×':
            answer = firstNum * secondNum;
            break;
        case '-':
            answer = firstNum - secondNum;
            break;
        case '+':
            answer = firstNum + secondNum;
            break;
    }
    return Math.round(answer * Math.pow(10, 10)) / Math.pow(10, 10);
}

let equation = [];
let currentNum = '0';
let lastNum = '0';
let currentOperation = '';

function getKeypress(element) {

    // numbers
    if (element.className === 'number') {
        if (element.textContent === '.') {
            if (currentNum.indexOf('.') === -1)
                currentNum += element.textContent;

        } else if (currentNum.length < 10) {
            if (currentNum === '0') currentNum = element.textContent;
            else currentNum += element.textContent;
        }

        // functions that require calculation like ^! or AC/C
    } else if (element.className === 'function') {

        switch (element.id) {
            case 'AC':
                currentNum = '0';
                lastNum = '0';
                equation = [];
                equationDisplay.innerHTML = '&nbsp;';
                break;

            case 'CE':
                currentNum = currentNum.slice(0, -1);
                break;

            case 'fact':
                if (Math.abs(currentNum) < 170)
                    currentNum = getFactorial(parseInt(currentNum));
                else currentNum = Infinity;
                break;

            case 'negate':
                currentNum = parseInt(currentNum) * -1;
                break;
        }

        // operations like /*-+
    } else {
        if (lastNum !== '0' && currentNum !== '0') {
            equation.push(currentNum, '=');
            currentNum = compute(parseFloat(lastNum), currentOperation, parseFloat(currentNum)).toString();
            lastNum = '0';
        }

        if (lastNum === '0' && element.textContent !== '=') {
            currentOperation = element.textContent;
            equation = [];
            equation.push(currentNum, element.textContent);

            lastNum = currentNum;
            currentNum = '0';

        } else if (element.textContent !== '=') {
            equation[equation.length - 1] = element.textContent;
        }

        equationDisplay.textContent = equation.join(' ');
    };

    currentNum = currentNum.toString();
    currentNumDisplay.textContent = currentNum;
}

for (let btn of keys.children) {
    btn.onclick = () => {
        getKeypress(btn);
    };
}