// Анимация лого
const divLogo = document.querySelector('.logo__ofdr'),
	interval = 500;
let str = divLogo.textContent;
function repeat() {
	for (let i = 0; i < str.length; i++) {
		divLogo.innerHTML = str;
		setTimeout(function () {
			let letters = str.substring(0, i + 1);
			let temp = '<span class="logo__span">' + letters + '</span>' + str.substring(i + 1);
			divLogo.innerHTML = temp;
		}, i * interval);
	}
	setTimeout(repeat, str.length * interval);
}
repeat();
//========================================================================================================================================================
