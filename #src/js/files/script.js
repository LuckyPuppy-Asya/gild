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
		//========================================================================================================================================================


	}




}


