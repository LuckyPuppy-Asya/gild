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

		//по клику переход по ссылкам меню с goto========================================================================================================================================================
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
		//по клику работа фильтров "Сортировать" в блоке catalog========================================================================================================================================================
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

		//по клику работа кнопок "Вид" в блоке catalog========================================================================================================================================================
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
		//по клику на экранах ниже md2 открытие Сортировка и Фильтры========================================================================================================================================================

		if (targetElement.classList.contains('joint__top')) {
			document.querySelector('.sieve__dropdown').classList.remove('_active');
			document.querySelector('.joint__dropdown').classList.toggle('_active');
		}
		if (targetElement.classList.contains('sieve__top')) {
			document.querySelector('.joint__dropdown').classList.remove('_active');
			document.querySelector('.sieve__dropdown').classList.toggle('_active');
		}
		//по клику закрытие фильтров по крестику на экранах ниже md2========================================================================================================================================================

		if (targetElement.classList.contains('filters-catalog__btn')) {
			document.querySelector('.sieve__dropdown').classList.remove('_active');
		}
		//по клику На карточке накидывание покрывала========================================================================================================================================================
		if (targetElement.classList.contains('kitchen')) {

			targetElement.querySelector('.cover').classList.add('_active');
		}
		if (targetElement.classList.contains('cover')) {
			targetElement.classList.remove('_active');
		}
		//по клику на крестике выбранного элемента в results-filters его удаление========================================================================================================================================================

		if (targetElement.classList.contains('results-filters__btn')) {
			let resultsFiltersColumn = targetElement.closest('.results-filters__column');
			let removeElem = targetElement.closest('.results-filters__column').dataset.choiceInput;

			let uncheckElems = document.querySelectorAll(`[name="${removeElem}"]`);
			uncheckElems.forEach(item => {
				item.checked = false;
			});
			resultsFiltersColumn.remove();
		}

		//по клику Работа кнопки Сбросить фильтры========================================================================================================================================================
		if (targetElement.classList.contains('streamer__filters-reset') || targetElement.classList.contains('filters-catalog__clean')) {

			squareSlider.noUiSlider.set([0, 30]);

			const squareStart = document.getElementById('square-start');
			const squareEnd = document.getElementById('square-end');
			const squareInputs = [squareStart, squareEnd];

			squareSlider.noUiSlider.on('update', function (values, handle) {
				squareInputs[handle].value = Math.round(values[handle]);
			});

			metersSlider.noUiSlider.set([0, 10]);
			const metersStart = document.getElementById('meters-start');
			const metersEnd = document.getElementById('meters-end');
			const metersInputs = [metersStart, metersEnd];
			metersSlider.noUiSlider.on('update', function (values, handle) {
				metersInputs[handle].value = Math.round(values[handle]);
			});

			document.querySelector('.filters-catalog__results').innerHTML = '';
		}
		//по клику изменения в отображении пагинации========================================================================================================================================================
		// if (targetElement.classList.contains('pagging__item')) {
		// 	if (targetElement.classList.contains('pagging__item_first', '_active')) {
		// 		document.querySelector('.pagging__arrow_start').style.cssText = `
		// 		opacity: 0;
		// 		visibility: hidden;
		// 		`;
		// 		document.querySelector('.pagging__arrow_left').style.cssText = `
		// 		opacity: 0;
		// 		visibility: hidden;
		// 		`;
		// 		document.querySelector('.pagging__arrow_end').style.cssText = `
		// 		opacity: 1;
		// 		visibility: visible;
		// 		`;
		// 		document.querySelector('.pagging__arrow_right').style.cssText = `
		// 		opacity: 1;
		// 		visibility: visible;
		// 		`;
		// 	} else if (targetElement.classList.contains('pagging__item_last', '_active')) {
		// 		document.querySelector('.pagging__arrow_end').style.cssText = `
		// 		opacity: 0;
		// 		visibility: hidden;
		// 		`;
		// 		document.querySelector('.pagging__arrow_right').style.cssText = `
		// 		opacity: 0;
		// 		visibility: hidden;
		// 		`;
		// 		document.querySelector('.pagging__arrow_start').style.cssText = `
		// 		opacity: 1;
		// 		visibility: visible;
		// 		`;
		// 		document.querySelector('.pagging__arrow_left').style.cssText = `
		// 		opacity: 1;
		// 		visibility: visible;
		// 		`;
		// 	} else {
		// 		document.querySelectorAll('.pagging__arrow').forEach(item => {
		// 			item.style.cssText = `
		// 				opacity: 1;
		// 				visibility: visible;
		// 			`;
		// 		});
		// 	}
		// }
		//по клику на Посмотреть появляется controls========================================================================================================================================================
		if (targetElement.classList.contains('demo__btn')) {
			let videos = document.querySelectorAll('#video-player');
			videos.forEach(video => {
				if (!video.paused) {
					video.removeAttribute('controls');
					video.load();
					video.closest('.demo__column').querySelector('.demo__btn').classList.remove('_hide');
				}

			});
			let video = targetElement.closest('.demo__column').querySelector('#video-player');
			video.setAttribute("controls", "true");
			video.play();
			targetElement.classList.add('_hide');
		}


	}


	//если видео закончилось, то возвращаем как было========================================================================================================================================================

	const videos = document.querySelectorAll('#video-player');
	videos.forEach(video => {
		video.addEventListener('timeupdate', function () {
			if (video.duration == video.currentTime) {
				video.removeAttribute('controls');
				video.load();
				video.closest('.demo__column').querySelector('.demo__btn').classList.remove('_hide');
			}
		});
	});




	//добавление в results-filters выбранной опции========================================================================================================================================================
	//из checkbox===================================
	let checkboxItems = document.querySelectorAll('.checkbox__label');
	let optionsItems = document.querySelectorAll('.options__item');
	// let rangeItems = document.querySelectorAll('.square__label');
	let resultsFilters = document.querySelector('.results-filters');


	if (document.querySelector('.catalog__body')) {

		const createChoiceItem = (text, nameInput) => {
			return (
				`
				<div class="results-filters__column" data-choice-input="${nameInput}" data-choice-text="${text}">
					<div class="results-filters__text">${text}</div>
					<button type="button" class="results-filters__btn">
						<svg>
							<use xlink:href="sprite.svg#close"></use>
						</svg>
					</button>
				</div>
				`
			);
		};

		checkboxItems.forEach(el => {
			el.querySelector('input').addEventListener('change', (e) => {
				let checked = el.querySelector('input').checked;
				let text = el.querySelector('.checkbox__text').textContent;
				if (checked) {
					let nameInput = e.target.getAttribute('name');
					resultsFilters.insertAdjacentHTML('beforeend', createChoiceItem(text, nameInput));

				} else {
					document.querySelector(`[data-choice-text="${text}"]`).remove();
				}
			});
		});
		//из radio=============================================
		optionsItems.forEach(el => {

			el.querySelector('input').addEventListener('click', (e) => {
				let parent = el.closest('.options');
				let optionsText = parent.querySelectorAll('.options__text');
				optionsText.forEach(item => {
					let text = item.textContent;
					if (document.querySelector(`[data-choice-text="${text}"]`)) {
						document.querySelector(`[data-choice-text="${text}"]`).remove();
					}

				});
				let text = el.querySelector('.options__text').textContent;
				let nameInput = e.target.getAttribute('name');
				resultsFilters.insertAdjacentHTML('beforeend', createChoiceItem(text, nameInput));
			});
		});



	}
	//========================================================================================================================================================

	//========================================================================================================================================================


}


