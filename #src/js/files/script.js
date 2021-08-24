tippy('._tooltip', {
	content: "Дополнительная информация",

});
//========================================================================================================================================================

window.onload = function () {
	document.addEventListener("click", documentActions);

	// Actions (делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;
		// console.log(targetElement, 111);

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
		//На карточке накидывание покрывала========================================================================================================================================================
		if (targetElement.classList.contains('kitchen')) {

			targetElement.querySelector('.cover').classList.add('_active');
		}
		if (targetElement.classList.contains('cover')) {
			targetElement.classList.remove('_active');
		}
		//При клике на крестике выбранного элемента в results-filters его удаление========================================================================================================================================================

		if (targetElement.classList.contains('results-filters__btn')) {
			let resultsFiltersColumn = targetElement.closest('.results-filters__column');
			let removeElem = targetElement.closest('.results-filters__column').dataset.choiceInput;

			let uncheckElems = document.querySelectorAll(`[name="${removeElem}"]`);
			uncheckElems.forEach(item => {
				item.checked = false;
			});
			resultsFiltersColumn.remove();
		}

		//Работа кнопки Сбросить фильтры========================================================================================================================================================
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
		//========================================================================================================================================================
		if (targetElement.classList.contains('pagging__item')) {
			if (targetElement.classList.contains('pagging__item_first', '_active')) {
				document.querySelector('.pagging__arrow_start').style.cssText = `
				opacity: 0;
				visibility: hidden;
				`;
				document.querySelector('.pagging__arrow_left').style.cssText = `
				opacity: 0;
				visibility: hidden;
				`;
				document.querySelector('.pagging__arrow_end').style.cssText = `
				opacity: 1;
				visibility: visible;
				`;
				document.querySelector('.pagging__arrow_right').style.cssText = `
				opacity: 1;
				visibility: visible;
				`;
			} else if (targetElement.classList.contains('pagging__item_last', '_active')) {
				document.querySelector('.pagging__arrow_end').style.cssText = `
				opacity: 0;
				visibility: hidden;
				`;
				document.querySelector('.pagging__arrow_right').style.cssText = `
				opacity: 0;
				visibility: hidden;
				`;
				document.querySelector('.pagging__arrow_start').style.cssText = `
				opacity: 1;
				visibility: visible;
				`;
				document.querySelector('.pagging__arrow_left').style.cssText = `
				opacity: 1;
				visibility: visible;
				`;
			} else {
				document.querySelectorAll('.pagging__arrow').forEach(item => {
					item.style.cssText = `
						opacity: 1;
						visibility: visible;
					`;
				});
			}


		}
	}






	//добавление в results-filters выбранной опции========================================================================================================================================================
	//из checkbox===================================
	let checkboxItems = document.querySelectorAll('.checkbox__label');
	let optionsItems = document.querySelectorAll('.options__item');
	let rangeItems = document.querySelectorAll('.square__label');
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

	let x = `
				<li class="exhibition__column">
					<article class="exhibition__kitchen kitchen _ibg">
						<div class="kitchen__image">
							<picture><source srcset="img/exhibition/01.webp" type="image/webp"><img src="img/exhibition/01.png" alt=""></picture>
						</div>
						<h4 class="kitchen__bottom">Кухня МДФ в&nbsp;ПВХ «Модель&nbsp;154»</h4>
						<div class="kitchen__cover cover">
							<h4 class="cover__name">Кухня МДФ в&nbsp;ПВХ «Модель&nbsp;154»</h4>
							<a href="#" class="cover__order">Заказать кухню</a>
							<a href="#" class="cover__btn">Расчет цены</a>
							<a href="#" class="cover__learn">
								<span>Узнать подробнее</span>
								<span class="cover__icon">
									<svg>
										<use xlink:href="sprite.svg#arrow-white"></use>
									</svg>
								</span>
							</a>
						</div>
						<button type="button" class="kitchen__favorate">
							<svg>
								<use xlink:href="sprite.svg#heart"></use>
							</svg>
						</button>
					</article>
				</li>
				`;
	//========================================================================================================================================================


}


