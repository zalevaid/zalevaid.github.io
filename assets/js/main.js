/*
 * Zaleva
 * https://zalevastore.com
 * Sprei kekinian, berkualitas, lembut dan nyaman untuk keluarga
 * Copyright (c) 2021
 */

// Dark Mode
	function iconDarkModeToggle() {
		var icon = document.querySelectorAll('.icon-dark-mode .mdi')
		for (var i = 0; i < icon.length; i++) {
			icon[i].classList.toggle('d-none')
		}
	}

	function carouselDarkModeToggle() {
		var carousel = document.querySelectorAll('.carousel')
		for (var i = 0; i < carousel.length; i++) {
			carousel[i].classList.toggle('carousel-dark')
		}
	}

	if ( localStorage.getItem('dark') !== null ) {
		document.querySelector('body').classList.toggle('dark')
		var toggle = document.getElementById('dark-mode')
		if ( toggle !== null ) {
			toggle.setAttribute('checked','true')
			iconDarkModeToggle()
			carouselDarkModeToggle()
		}
	}

	function darkMode() {
		var body = document.querySelector('body')
		if ( localStorage.getItem('dark') === null ) {
			body.classList.remove('transition-off')
			body.classList.add('transition-on')
			iconDarkModeToggle()
			carouselDarkModeToggle()
			setTimeout(function() {
				body.classList.add('dark')
				body.classList.remove('transition-on')
			}, 75)
			localStorage.setItem('dark','on')
		} else {
			body.classList.remove('transition-on')
			body.classList.add('transition-off')
			iconDarkModeToggle()
			carouselDarkModeToggle()
			setTimeout(function() {
				body.classList.remove('dark')
			}, 75)
			setTimeout(function() {
				body.classList.remove('transition-off')
			}, 200)
			localStorage.removeItem('dark')
		}
	}
