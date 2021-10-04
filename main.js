/* tip calculator logic */

// setting up the inputs and displayer

const bill = document.getElementById('bill');
const people = document.getElementById('people');
const customPercentage = document.getElementById('custom');
const percentageButtons = document.querySelectorAll('input[type="radio"]');
const inputError = document.getElementById('error');

const tipDisplayer = document.getElementById('display-tip');
const totalDisplayer = document.getElementById('display-total');

const form = document.querySelector('form');
form.onsubmit = (e) => {
    e.preventDefault(); // just in case, prevent the form of being submitted
}

var total = 0;
var tip = 0;
var yourBill = 0;
var peopleAmount = 0;
var tipPercentage = 0;

bill.addEventListener('input', () => {
    yourBill = parseFloat(bill.value);
    calculate();
});

percentageButtons.forEach(element => {
    element.addEventListener('input', () => {
        if (element.checked) {
            tipPercentage = parseFloat(element.value);
            calculate();
            customPercentage.value = '';
        }
    });
});

customPercentage.addEventListener('input', () => {
    percentageButtons.forEach(element => {
        element.checked = false;
    });

    tipPercentage = parseFloat(customPercentage.value);
    calculate();
});

people.addEventListener('input', () => {
    let number = parseFloat(people.value);
    if (number <= 0) {
        error.textContent = "Can't be zero";
        error.style.display = 'inline-block';
        peopleAmount = 0;
    } else if (isNaN(number)) {
        error.textContent = 'Enter a number';
        error.style.display = 'inline-block';
        peopleAmount = 0;
    } else {
        error.style.display = 'none';
        peopleAmount = number;
        calculate();
    }
});

function calculate() {
    tip = (yourBill * tipPercentage) / 100;
    total = yourBill + tip;

    if (peopleAmount !== 0) {
        tipDisplayer.textContent = `$${(tip / peopleAmount).toFixed(2)}`;
        totalDisplayer.textContent = `$${(total / peopleAmount).toFixed(2)}`;
        resetButton.disabled = false;
    } else {
        tipDisplayer.textContent = "$0.00";
        totalDisplayer.textContent= "$0.00";
    }
}

const resetButton = document.getElementById('reset');

resetButton.addEventListener('click', () => {
    total = 0;
    tip = 0;
    yourBill = 0;
    peopleAmount = 0;
    tipPercentage = 0;
    calculate();
    bill.value = '';
    people.value = '';
    customPercentage.value = '';
    percentageButtons.forEach(element => {
        element.checked = false;
    });
    resetButton.disabled = true;
});

calculate();



