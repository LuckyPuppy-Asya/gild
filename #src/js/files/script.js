tippy('._tooltip', {
	content: "Дополнительная информация",

});
//========================================================================================================================================================

window.onload = function () {
	document.addEventListener("click", documentActions);

	// Actions (делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;
		console.log(targetElement, 111);

		//по клику на желтые пункты на фото срабатывают табы========================================================================================================================================================

		if (targetElement.classList.contains('details__dot') && targetElement.getAttribute('data-dot')) {
			let dataDot = targetElement.getAttribute('data-dot');
			let neededBtn = document.querySelector(`.tabs-block__item[data-btn="${dataDot}"]`);
			neededBtn.click();
		}

		//переход по ссылкам меню с goto========================================================================================================================================================
		if (targetElement.classList.contains('_simple-go') && targetElement.dataset.goto) {
			if (document.querySelector(targetElement.dataset.goto)) {
				const gotoBlock = document.querySelector(targetElement.dataset.goto);
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
				e.preventDefault();
				window.scrollTo({
					top: gotoBlockValue,
					behavior: "smooth"
				});
			}
		}
		//работа фильтров "Сортировать" в блоке catalog========================================================================================================================================================
		if (targetElement.classList.contains('custom-select__top')) {
			targetElement.closest('.custom-select').classList.toggle('custom-select--open');
		}
		if (targetElement.classList.contains('custom-select__item')) {

			let text = targetElement.textContent;
			let topBlock = targetElement.closest('.custom-select').querySelector('.custom-select__top');
			let topText = topBlock.textContent;

			topBlock.textContent = text;
			targetElement.textContent = topText;
			targetElement.closest('.custom-select').classList.toggle('custom-select--open');
		}

		//работа кнопок "Вид" в блоке catalog========================================================================================================================================================
		if (targetElement.classList.contains('custom-select__btn') && targetElement.closest('.custom-select__top')) {
			targetElement.closest('.custom-select').classList.toggle('custom-select--open');
		}
		if (targetElement.classList.contains('custom-select__btn') && !targetElement.closest('.custom-select__top')) {

			let blockTop = targetElement.closest('.custom-select').querySelector('.custom-select__top');
			let blockItem = targetElement.closest('.custom-select__item');
			let blockTopOld = blockTop.querySelector('.custom-select__btn');
			let columns = targetElement.dataset.columns;
			let exhibitionRow = document.querySelector('.exhibition__row');

			blockTopOld.classList.remove('_current');
			blockTop.innerHTML = '';
			blockTop.appendChild(targetElement);
			targetElement.classList.add('_current');
			blockItem.appendChild(blockTopOld);
			targetElement.closest('.custom-select').classList.toggle('custom-select--open');
			exhibitionRow.dataset.gridColumns = columns;
		}
		//на экранах ниже md2 открытие Сортировка и Фильтры========================================================================================================================================================

		if (targetElement.classList.contains('joint__top')) {
			document.querySelector('.sieve__dropdown').classList.remove('_active');
			document.querySelector('.joint__dropdown').classList.toggle('_active');
		}
		if (targetElement.classList.contains('sieve__top')) {
			document.querySelector('.joint__dropdown').classList.remove('_active');
			document.querySelector('.sieve__dropdown').classList.toggle('_active');
		}
		//закрытие фильтров по крестику на экранах ниже md2========================================================================================================================================================

		if (targetElement.classList.contains('filters-catalog__btn')) {
			document.querySelector('.sieve__dropdown').classList.remove('_active');
		}
		//========================================================================================================================================================
		if (targetElement.classList.contains('kitchen')) {
			targetElement.querySelector('.cover').classList.add('_active');
		}
		if (targetElement.classList.contains('cover')) {
			targetElement.classList.remove('_active');
		}
	}


	if (window.innerWidth < 768) {
		let x = document.querySelector('.custom-select__btn._current');

		x.setAttribute('data-columns', '5');
		console.log(x.dataset);
	}


}


