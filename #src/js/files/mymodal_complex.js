// Не забудь подключить в app.js до подключения script.js
// в самом script.js
// лучше внутри  window.addEventListener('DOMContentLoaded', () => { });
// пропиши вызов вот так:

// window.addEventListener('DOMContentLoaded', () => {
// 	'use strict';
// 	modals();
// });

// если так нет возможности, то просто
// modals();

// Если стили модалок чужие и не привязаны к классу _active, то снять комментарии с display (использовать именно этот стиль - показать или убрать) и закоментировать строчки с присвоением или отнятием этого класса

// Всем модальным окнам дай атрибут data-modal, чтобы их собрать в переменную windowFrames
// Элементы на странице с position fixed не должны прыгать при модалках, добавить этим элементам класс noskip

// Сделано по Петриченко 2 курс 2 проект уроки 11 и 12!!!
//1 triggerSelector - селектор триггера (чаще кнопки) для открытия окна
//2 modalSelector - селектор окна
//3 closeSelector - селектор кнопки закрытия окна, смотри внизу сначала какое окно, потом класс крестика
//4 closeClickOverlay - true, если надо чтобы окно закрывалось при клике вне окна. Чаще так, но при каскадном открытии окон false, вдруг случайно щелкнет и придется все сначала
//5 destroy - false, а вот если нам надо, чтобы исчез триггер открытия окна после его открытия, то true
// например, иконка с подарком, один раз открыл, все, иконки больше не будет

//6 Если пользователь долистал страницу до конца, но НЕ нажал НИ одну кнопку - должно появляться модальное окно по такому-то триггеру. У нас это '.header__callback'
// Для этого переменная btnPressed



const modals = () => {
	// если нужен пунк 6, то нужна переменная, пусть btnPressed
	let btnPressed = false;

	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true, destroy = false) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			windowFrames = document.querySelectorAll('[data-modal]'),
			scrollWidth = calcScroll(),
			noskips = document.querySelectorAll('.noskip');
		// У меня в проекте modaltestthree класс noskip дан иконке-подарку, который fixed, а также фиксированному хедеру

		trigger.forEach(item => {
			item.addEventListener('click', (e) => {
				// если клик не на button, а на ссылку, то отменить переход по дефолту
				if (e.target) {
					e.preventDefault();
				}

				// Если хоть раз кликали, то для пункта 6 понадобится изменить на true
				btnPressed = true;

				// это для пункта 5, если destroy=true
				if (destroy) {
					item.remove();
				}

				windowFrames.forEach(item => {
					// item.style.display = 'none';
					item.classList.remove('_active');
				});

				// modal.style.display = 'block';
				modal.classList.add('_active');
				// чтобы за модальным не скролился сайт
				document.body.style.overflow = 'hidden';
				document.body.style.marginRight = `${scrollWidth}px`;

				noskips.forEach(noskip => {
					let temp = parseInt(getComputedStyle(noskip).paddingRight) + scrollWidth;
					noskip.style.paddingRight = `${temp}px`;
				});

			});
		});


		// закрытие по крестику
		close.addEventListener('click', () => {
			windowFrames.forEach(item => {
				// item.style.display = 'none';
				item.classList.remove('_active');
			});
			// modal.style.display = 'none';
			modal.classList.remove('_active');
			// чтобы сайт снова скролился
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;

			noskips.forEach(noskip => {
				let temp = parseInt(getComputedStyle(noskip).paddingRight) - scrollWidth;
				noskip.style.paddingRight = `${temp}px`;
			});
		});

		// закрытие по клику на подложку
		modal.addEventListener('click', (e) => {
			if (e.target === modal && closeClickOverlay) {
				windowFrames.forEach(item => {
					// item.style.display = 'none';
					item.classList.remove('_active');
				});
				// modal.style.display = 'none';
				modal.classList.remove('_active');
				document.body.style.overflow = '';
				document.body.style.marginRight = `0px`;

				noskips.forEach(noskip => {
					let temp = parseInt(getComputedStyle(noskip).paddingRight) - scrollWidth;
					noskip.style.paddingRight = `${temp}px`;
				});
			}
		});
	}
	//========================================================================================================================================================

	// Это функция вызова модалки через какое-то время после открытия сайта. Если ф-ция в проекте не нужна, можно удалить
	function showModalByTime(selector, time) {
		setTimeout(function () {
			let display;

			document.querySelectorAll('[data-modal]').forEach(item => {
				// if (getComputedStyle(item).display !== 'none') {
				// 	display = 'block';
				// }
				if (getComputedStyle(item).visibility !== 'hidden') {
					display = 'block';
				}
			});

			if (!display) {
				// document.querySelector(selector).style.display = 'block';
				document.querySelector(selector).classList.add('_active');
				document.body.style.overflow = 'hidden';
				const scrollWidth = calcScroll();
				document.body.style.marginRight = `${scrollWidth}px`;

				const noskips = document.querySelectorAll('.noskip');
				noskips.forEach(noskip => {
					let temp = parseInt(getComputedStyle(noskip).paddingRight) + scrollWidth;
					noskip.style.paddingRight = `${temp}px`;
				});
			}

		}, time);
	}

	function calcScroll() {
		let div = document.createElement('div');
		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();
		return scrollWidth;
	}

	//========================================================================================================================================================

	// Для пункта 6. Если ф-ция в проекте не нужна, можно удалить
	// Здесь в параметрах селектор триггера окна
	function openByScroll(selector) {
		window.addEventListener('scroll', () => {
			// window.pageYOffset - сколько уже пролистал, вверху за пределами экрана
			// document.documentElement.clientHeight - сколько видит перед глазами на экране
			// сравниваем с
			// высотой всей ленты страницы, которая в разных браузерах вычисляется по разному, берем максимум из двух величин
			let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

			if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
				// вручную вызываем окно, вешаем событие клика на окно
				document.querySelector(selector).click();
			}
		});
	}



	// Вызываем так: какая кнопка, какое модальное окно, какая кнопка закрытия в каком мод окне, и два параметра читай вверху
	// в проекте modaltestthree было так
	//========================================================================================================================================================
	// bindModal('.header__callback', '.modal_callback', '.modal_callback .modal__close', true, false);

	// Если открытие по времени, то какое мод окно и через сколько
	// showModalByTime('.modal_callback', 60000);

	// это пункт 6 (НИ одно окно НЕ окрывали, дошли до низа сайта, само сработало кликом на триггере '.header__callback')
	// openByScroll('.header__callback');
	//========================================================================================================================================================

	// Это вот примеры открытия разных окон с разными триггерами из Петриченко 2 курс 2 проект уроки 11 и 12!!!
	// bindModal('.button-design', '.popup-design', '.popup-design .popup-close', true, false);
	// bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close', true, false);
	// bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true, true);

	// openByScroll('.fixed-gift');

	// showModalByTime('.popup-consultation', 60000);
	//========================================================================================================================================================

};

// Чтобы вызвать всю вышенаписанную функцию модальных окон в script.js
// лучше внутри  window.addEventListener('DOMContentLoaded', () => { });
// пропиши вызов вот так:

// window.addEventListener('DOMContentLoaded', () => {
// 	'use strict';
// 	modals();
// });

// если так нет возможности, то просто
// modals();


