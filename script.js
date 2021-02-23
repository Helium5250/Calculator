const equationDisplay = document.querySelector('#equation');
const currentNumDisplay = document.querySelector('#currentNum');
const keys = document.querySelector('#keys');

for (let btn of keys.children) {
    btn.onclick = (element) => getKeypress(element.target);
}

let numInput = [];
let currentNum = '';

function getKeypress(element) {


    // numbers
    if (element.className == 'number' && currentNum.length < 10) {
        currentNum += element.innerHTML;

        // operations like /*-+
    } else if (element.className == 'operation') {
        numInput.push(currentNum, element.innerHTML);
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
    }
    currentNum = currentNum.toString();
    console.log(currentNum);

    currentNumDisplay.textContent = currentNum == ''
        ? '0'
        : currentNum;
}

const getFactorial = (num) =>
    (num === 0)
        ? 1
        : num * getFactorial(num - 1);