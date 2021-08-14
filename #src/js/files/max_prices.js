// Цена с пробелом 7500
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

// цена без пробелов 7500
const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};
// добавление цены
const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};
// вычитание цены
const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};
// вывод цены на страницу
const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} $`;
};