const API_KEY = 'http://api.nbp.pl/api/exchangerates/tables/A/';
const currencyBox = document.querySelector('.converter__box-choice-currency');
const dataCurrencyLeft = document.querySelector('.converter__box-data-choose-left');
const dataCurrencyRight = document.querySelector('.converter__box-data-choose-right');
const currencyInput = document.querySelector('.converter__box-currencyInput');
const currencyOutput = document.querySelector('.converter__box-currencyOutput');
const swapBtn = document.querySelector('.converter__box-data-swaper');
const btnValue = document.querySelector('.converter__box-input');
const convertBtn = document.querySelector('.converter__box-btn');
const valueCurrency = document.querySelector('.converter__box-value-input');
const outputValue = document.querySelector('.converter__box-value-output');
const searchBtn = document.querySelector('.converter__box-choice-search-btn');
let result;

fetch(API_KEY)
	.then(res => res.json())
	.then(data => data[0].rates)
	.then(dataRaw => {
		result = dataRaw.map(data => data);
		countriesList(result);
	});

const countriesList = countries => {
	currencyBox.textContent = '';
	countries.forEach(country => {
		const listElement = document.createElement('p');
		listElement.textContent = country.currency;
		currencyBox.appendChild(listElement);
	});
	changeCurrency();
};

const changeCurrency = () => {
	const p = currencyBox.querySelectorAll('p');
	p.forEach(oneChoice =>
		oneChoice.addEventListener('click', () => {
			searchBtn.value = '';
			countriesList(result);
			valueCurrency.textContent = 0 + ' ';
			outputValue.textContent = 0 + ' ';
			btnValue.value = '';
			result.forEach(country => {
				if (country.currency == oneChoice.textContent) {
					dataCurrencyLeft.textContent = oneChoice.textContent;
					currencyBox.parentNode.classList.remove('converter__box-choice-clicked');
					currencyInput.textContent = country.code;
				}
			});
		})
	);
};

convertBtn.addEventListener('click', () => {
	if (btnValue.value === '') {
		btnValue.style.border = '1px solid tomato';
	} else {
		calculate();
	}
	btnValue.value = '';
});

const calculate = () => {
	valueCurrency.textContent = btnValue.value + ' ';
	result.forEach(element => {
		if (element.currency === dataCurrencyLeft.textContent) {
			outputValue.textContent = (btnValue.value * element.mid).toFixed(2) + ' ';
		}
	});
};

searchBtn.addEventListener('keydown', e => {
	let resultSearch = result.filter(
		search =>
			search.currency.includes(searchBtn.value) || search.code.toLowerCase().includes(searchBtn.value.toLowerCase())
	);
	currencyBox.textContent = '';
	countriesList(resultSearch);
});
