/** DOM Elements **/

let calcHistory = document.getElementById('calcHistory');
let calcDisplay = document.getElementById('calcDisplay');
let calcClear = document.getElementById('calcClear');
let calcBackspace = document.getElementById('calcBackspace');
let calcPlusMinus = document.getElementById('calcPlusMinus');
let calcEquals = document.getElementById('calcEquals');
let calcDecimal = document.getElementById('calcDecimal');
let calcNumbers = {
	0: document.getElementById('calcZero'),
	1: document.getElementById('calcNum1'),
	2: document.getElementById('calcNum2'),
	3: document.getElementById('calcNum3'),
	4: document.getElementById('calcNum4'),
	5: document.getElementById('calcNum5'),
	6: document.getElementById('calcNum6'),
	7: document.getElementById('calcNum7'),
	8: document.getElementById('calcNum8'),
	9: document.getElementById('calcNum9')
};
let calcOperators = {
	plus: document.getElementById('calcPlus'),
	minus: document.getElementById('calcMinus'),
	times: document.getElementById('calcTimes'),
	division: document.getElementById('calcDivision'),
	percent: document.getElementById('calcPercent'),
}
let historyState = true;
let displayState = true;


/** Memory Management Closure **/

const calcMemoryManager = () => {
	let memoryBank = [];
	state = true;

	return {
		add: (number1, number2, operator) => {
			memoryBank.push( [number1, number2, operator] );
		},
		clear: () => {
			memoryBank = [];
		},
		show: () => {
			return memoryBank;
		},
	}
}

const {
	add: addToMemoryManager,
	clear: clearMemoryManager,
	show: showMemoryManager,
} = calcMemoryManager();


/** Functions **/

const printHistory = (number, operator = '') => {
	return calcHistory.value = `${number} ${operator}`;
}

const printDisplay = (number) => {
	return calcDisplay.value = number;
}

const calculate = (number1, operator, number2) => {
	if (operator == '+') return number1 + number2;
	if (operator == '−') return number1 - number2;
	if (operator == '×') return number1 * number2;
	if (operator == '÷') return number1 / number2;
	if (operator == '%') return number1 % number2;
}

const verifyLength = (maxLenght = 12) => {
	let display = calcDisplay.value;
	let condition = display.length >= maxLenght;
	
	if (condition) alert(`No puedes ingresar más de ${maxLenght} dígitos`);

	return condition;
}

const addOperation = (operatorSymbol) => {
	let display = calcDisplay.value;
	let history = calcHistory.value.split(' ');
	let operator = operatorSymbol;

	if (history.length != 1) {
		let result = calculate(+history[0], history[1], +display);
		addToMemoryManager(+history[0], history[1], +display)
		printDisplay(result);
	}

	displayState = false;
	return printHistory(+calcDisplay.value, operator);
}

const addNumber = (numberSymbol) => {
	let number = numberSymbol;
	let display = calcDisplay.value;

	if (verifyLength()) return;

	if (!historyState) {
		historyState = true;
		calcHistory.value = '';
	}

	if (!displayState) {
		displayState = true;
		return printDisplay(number);
	}

	if (display != '0') { 
		return printDisplay(`${display}${number}`);
	}
		
	return printDisplay(number);
}

const addDecimals = () => {
	let display = calcDisplay.value;

	if (!display.includes('.')) display += '.';

	return printDisplay(display);
}

const plusMinus = () => {
	let display = calcDisplay.value;

	if (display == '0') return printDisplay(display);

	!display.includes('-')
		? display = `-${display}`
		: display = display.replace('-', '');

	return printDisplay(display);
}

const result = () => {
	let display = calcDisplay.value;
	let history = calcHistory.value.split(' ');

	let result = calculate(+history[0], history[1], +display);
	addToMemoryManager(+history[0], history[1], +display);

	printHistory(`${history[0]} ${history[1]} ${+display}`);
	printDisplay(result);

	historyState = false;
	displayState = false;
}

const backspaceNumber = () => {
	let display = calcDisplay.value;

	display.length > 1
		? display = display.slice(0, display.length - 1)
		: display = '0';
	
	return printDisplay(display);
}

const resetDisplays = () => { 
	calcDisplay.value = '0';
	calcHistory.value = '';
	historyState = true;
	displayState = true;
}

const buttonAnimation = (item) => {
	buttonBG = window
		.getComputedStyle(item, null)
		.getPropertyValue("background-color");

	item.animate(
		[
			{
				backgroundColor: buttonBG,
			},
			{
				backgroundColor: '#555',
			},
			{
				backgroundColor: buttonBG,
			}
		],
		{
			duration: 250,
			easing: "ease",
		}
	);
}


/** Buttons Event Listeners **/

for (number in calcNumbers) 
	calcNumbers[number].addEventListener('click', (event) => 
		addNumber(event.target.textContent));
for (operator in calcOperators)
	calcOperators[operator].addEventListener('click', (event) => 
		addOperation(event.target.dataset.symbol));
		
calcClear.addEventListener('click', resetDisplays);
calcBackspace.addEventListener('click', backspaceNumber);
calcPlusMinus.addEventListener('click', plusMinus);
calcEquals.addEventListener('click', result);
calcDecimal.addEventListener('click', addDecimals);


/** Keyboard Event Listeners **/

window.addEventListener("keydown", (event) => {
	pressedKey = event.key;
	// pressedCode = event.code;

	for (i = 0; i <= 9; i++) {
		if (pressedKey == `${i}`) {
			buttonAnimation(calcNumbers[i]);
			return addNumber(i);
		}
	}

	if (pressedKey == '+') {
		buttonAnimation(calcOperators.plus);
		return addOperation('+');
	}
	if (pressedKey == '-') {
		buttonAnimation(calcOperators.minus);
		return addOperation('−');
	}
	if (pressedKey == '*') {
		buttonAnimation(calcOperators.times);
		return addOperation('×');
	}
	if (pressedKey == '/') {
		event.preventDefault();
		buttonAnimation(calcOperators.division);
		return addOperation('÷');
	}
	if (pressedKey == '%') {
		buttonAnimation(calcOperators.percent);
		return addOperation('%');
	}
		
	if (pressedKey == 'Enter') {
		buttonAnimation(calcEquals);
		return result();
	};
	if (pressedKey == 'Escape') {
		buttonAnimation(calcClear);
		return resetDisplays();
	}
	if (pressedKey == 'Backspace') {
		buttonAnimation(calcBackspace);
		return backspaceNumber();
	};
	if (pressedKey == '_') {
		buttonAnimation(calcPlusMinus);
		return plusMinus();
	}
	if (pressedKey == '.') {
		buttonAnimation(calcDecimal);
		return addDecimals();
	};
}, true);



/** Initial Functions **/

(() => {
	clearMemoryManager();
	resetDisplays();
})();