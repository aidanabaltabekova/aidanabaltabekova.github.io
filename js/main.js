//<====================================================================================================================================>//
//< " Определение типа устройства " >=============================================================================================================>//
//<====================================================================================================================================>//

let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any()) {
	document.body.classList.add("_touch");
} else {
	document.body.classList.add("_pc");
};

//<====================================================================================================================================>//
//< " Подключение основных скриптов " >=============================================================================================================>//
//<====================================================================================================================================>//

new WOW({
	mobile: false,
	offset: 80,
}).init();;

//<====================================================================================================================================>//
//< " Подключение меню бургера " >=============================================================================================================>//
//<====================================================================================================================================>//

function myBurger() {
	const burgerOpen = document.getElementById("menu-open");
	const burgerContent = document.getElementById("menu-content");

	let unlock = true;
	const time = 500;

	const lockPadding = document.querySelectorAll("._lock-padding");
	const body = document.body;

	function addActive() {
		if (unlock) {
			burgerOpen.classList.add("_active");
			burgerContent.classList.add("_active");
			bodyLock();
		}
	}

	function removeActive() {
		burgerOpen.classList.remove("_active");
		burgerContent.classList.remove("_active");
	}

	if (burgerOpen && burgerContent) {
		burgerOpen.addEventListener("click", () => {
			if (!burgerOpen.classList.contains("_active")) {
				addActive();
			} else {
				removeActive();
				bodyUnLock();
			}
		});

		document.addEventListener("click", function (e) {
			const elementTarget = e.target;
			if (elementTarget.closest("[data-popup-open]") && unlock) {
				removeActive();
			}
		});

		document.addEventListener("keydown", function (e) {
			if (e.code === "Escape" && unlock) {
				removeActive();
				bodyUnLock();
			}
		});
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

		if (lockPadding) {
			lockPadding.forEach(elem => {
				elem.style.paddingRight = lockPaddingValue;
			});
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add("_lock-scroll");

		unlock = false;
		setTimeout(() => {
			unlock = true;
		}, time);
	}

	function bodyUnLock() {
		setTimeout(() => {
			if (lockPadding) {
				lockPadding.forEach(elem => {
					elem.style.paddingRight = "0px";
				});
			}
			body.style.paddingRight = "0px";
			body.classList.remove("_lock-scroll");
		}, time);

		unlock = false;
		setTimeout(() => {
			unlock = true;
		}, time);
	}
}
myBurger();;
