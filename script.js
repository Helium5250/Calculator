const equationDisplay = document.querySelector('#equation');
const currentNumDisplay = document.querySelector('#currentNum');
const keys = document.querySelector('#keys');

function isNumeric(num) {
    return !isNaN(num - parseFloat(num));
}

const getFactorial = (num) =>
    (num === 0)
        ? 1
        : num * getFactorial(num - 1);

function compute(firstNum, operation, secondNum) {
    switch (operation) {
        case '÷':
            return firstNum / secondNum;
        case '×':
            return firstNum * secondNum;
        case '-':
            return firstNum - secondNum;
        case '+':
            return firstNum + secondNum;
    }
}

let numInput = [];
let currentNum = '';
let currentOperation = '';

function getKeypress(element) {

    // numbers
    if (element.className == 'number' && currentNum.length < 10) {
        currentNum += element.textContent;

        // operations like /*-+
    } else if (element.className == 'operation') {
        if (numInput.length === 0) {
            numInput.push(currentNum, element.textContent);

        } else if (currentOperation != '') {
            
            numInput[numInput.length - 1] = element.textContent;

        } else {
            console.log(element.textContent);
            numInput.push(currentNum, '=', compute(parseFloat(numInput[numInput.length - 2]), numInput[numInput.length - 1], parseFloat(currentNum)));
            if (element.textContent != '=') numInput.push(element.textContent);
        }

        equationDisplay.textContent = numInput.join(' ');
        currentNum = '';

        // functions that require calculation like =^! or AC/C
    } else {
        switch (element.id) {
            case 'AC':
                currentNum = '';
                numInput = [];
                equationDisplay.innerHTML = '&nbsp;';
                break;

            case 'CE':
                currentNum = currentNum.slice(0, -1);
                break;

            case 'fact':
                currentNum = getFactorial(parseInt(currentNum));
                break;

            case 'negate':
                currentNum = parseInt(currentNum) * -1;
                break;
        }
    };

    currentNum = currentNum.toString();
    currentNumDisplay.textContent = currentNum == ''
        ? '0'
        : currentNum;

    console.log(numInput);
}

for (let btn of keys.children) {
    btn.onclick = () => getKeypress(btn);
}