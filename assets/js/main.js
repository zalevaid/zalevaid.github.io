/*
 * Zaleva
 * https://zalevastore.com
 * Sprei kekinian, berkualitas, lembut dan nyaman untuk keluarga
 * Copyright (c) 2021
 */

// Dark Mode
	function labelDarkModeToggle() {
		let icon = document.querySelectorAll('.icon-dark-mode span')
		for (let i = 0; i < icon.length; i++) {
			icon[i].classList.toggle('d-none')
		}
		let text = document.querySelectorAll('.text-dark-mode span')
		for (let i = 0; i < text.length; i++) {
			text[i].classList.toggle('d-none')
		}
	}

	function carouselDarkModeToggle() {
		let carousel = document.querySelectorAll('.carousel')
		for (let i = 0; i < carousel.length; i++) {
			carousel[i].classList.toggle('carousel-dark')
		}
	}

	if ( localStorage.getItem('dark') !== null ) {
		document.querySelector('body').classList.toggle('dark')
		let toggle = document.getElementById('dark-mode')
		if ( toggle !== null ) {
			toggle.setAttribute('checked','true')
			labelDarkModeToggle()
			carouselDarkModeToggle()
		}
	}

	function darkMode() {
		let body = document.querySelector('body')
			on = 'transition-on'
			off = 'transition-off'

		if ( localStorage.getItem('dark') === null ) {
			body.classList.remove(off)
			body.classList.add(on)

			labelDarkModeToggle()
			carouselDarkModeToggle()

			setTimeout(function() {
				body.classList.add('dark')
				body.classList.remove(on)
			}, 75)

			localStorage.setItem('dark','on')
		} else {
			body.classList.remove(on)
			body.classList.add(off)

			labelDarkModeToggle()
			carouselDarkModeToggle()

			setTimeout(function() {
				body.classList.remove('dark')
			}, 75)
			setTimeout(function() {
				body.classList.remove(off)
			}, 200)

			localStorage.removeItem('dark')
		}
	}

// Slider
	if ( document.querySelector('#sliderData') !== null ) {
		// Parse JSON data
		var slider = JSON.parse(slideshow)

		// Loop JSON data
		for (let i = 0; i < slider.length; i++) {

			// Define JSON data
			let title = slider[i].title
				jpg = slider[i].image.jpg
				webp = slider[i].image.webp

			// Duplicate DOM element
			let list = document.querySelector('.slider-list')
				clone = list.cloneNode(true)
			list.after(clone)

			// ------------------------------------------------------
			// Fill in JSON data to DOM element
			// ------------------------------------------------------

			// Define Selector
			let sliderImage = document.querySelector('.slider-image')

			// Banner Image
			if ( sliderImage !== null ) {
				let img = sliderImage.querySelector('img')
					origin = 'https://drive.google.com/uc?export=view&id='
				if ( img !== null ) {
					sliderImage.querySelector('[type="webp"]').srcset = origin + webp + ' 1x, ' + origin + webp + ' 2x'
					sliderImage.querySelector('[type="jpg"]').srcset = origin + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.srcset = origin + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.src = origin + jpg
					img.alt = title
				}
			}
		}

		// Activate slider
		document.querySelector('.slider-list:first-child').classList.add('active')

		// Remove DOM element that used as duplicate template
		let template = document.querySelector('.slider-list:last-child')
		template.remove(template)
	}

// Product
	if ( document.querySelector('#productData') !== null ) {
		// Parse JSON data
		var product = JSON.parse(produk)

		// Product latest
		if ( document.querySelector('#productLatest') !== null ) {
			var product = product.filter(function(el, index) {
				return index >= product.length - 8
			})
		}

		// Product list
		if ( document.querySelector('#productList') !== null ) {
			// Loop JSON data
			for (let i = 0; i < product.length; i++) {

				// Define JSON data
				let id = product[i].id
					title = product[i].title
					price = product[i].price
					category = product[i].category
					badge = product[i].badge
					jpg = product[i].image.src0.jpg
					webp = product[i].image.src0.webp
					instagram = product[i].link.instagram

				// Duplicate DOM element
				let list = document.querySelector('.product-list')
					clone = list.cloneNode(true)
				list.after(clone)

				// ------------------------------------------------------
				// Fill in JSON data to DOM element
				// ------------------------------------------------------

				// Define Selector
				let productID = document.querySelector('.product-id')
					productTitle = document.querySelector('.product-title')
					productPrice = document.querySelector('.product-price')
					productCategory = document.querySelector('.product-category')
					productImage = document.querySelector('.product-image')
					productLink = document.querySelector('.product-link')
					productWhatsapp = document.querySelector('.product-whatsapp')
					productInstagram = document.querySelector('.product-instagram')

				// Product ID
				if ( productID !== null ) productID.innerText = id

				// Product Title
				if ( productTitle.querySelector('h3') !== null ) productTitle.querySelector('h3').innerText = title

				// Product Price
				if ( productPrice !== null ) productPrice.innerText = price

				// Product Category
				if ( productCategory !== null ) {
					productCategory.innerText = category

					const badges = productCategory.classList
					if (badges.contains('bg-pink')) {
						badges.remove('bg-pink')
					} else if (badges.contains('bg-purple')) {
						badges.remove('bg-purple')
					} else if (badges.contains('bg-primary')) {
						badges.remove('bg-primary')
					} else if (badges.contains('bg-success')) {
						badges.remove('bg-success')
					} else if (badges.contains('bg-orange')) {
						badges.remove('bg-orange')
					}

					productCategory.classList.add(badge)

					let categoryName = category.split(' ')
						categorySize = categoryName[categoryName.length - 1]
						categoryLabel = category.substring(0, category.lastIndexOf(' '))
						categoriesSize = document.querySelector('.product-category-size')
						categoriesLabel = document.querySelector('.product-category-label')
					if ( categoriesSize !== null ) categoriesSize.innerText = categorySize
					if ( categoriesLabel !== null ) categoriesLabel.innerText = categoryLabel
				}

				// Product Image
				if ( productImage !== null ) {
					let img = productImage.querySelector('img')
						thumb = 'https://drive.google.com/thumbnail?id='
						origin = 'https://drive.google.com/uc?export=view&id='
					if ( img !== null ) {
						productImage.querySelector('[type="webp"]').srcset = thumb + webp + ' 1x, ' + origin + webp + ' 2x'
						productImage.querySelector('[type="jpg"]').srcset = thumb + jpg + ' 1x, ' + origin + jpg + ' 2x'
						img.srcset = thumb + jpg + ' 1x, ' + origin + jpg + ' 2x'
						img.src = thumb + jpg
						img.alt = 'Foto ' + title
					}
				}

				// Product Link
				let encode = title.toLowerCase().split(' ').join('-')
					link = '/produk/detail?' + id + '&' + encode
				if ( productTitle !== null ) productTitle.href = link
				if ( productImage !== null ) productImage.href = link
				if ( productLink !== null ) productLink.href = link

				// Release filter
				let productRelease = document.querySelector('.product-release')
				if ( productRelease !== null ) productRelease.innerText = i + 1

				// Total Product
				let total = Object.keys(product).length
					productTotal = document.querySelector('.product-total')
				if ( productTotal !== null ) productTotal.innerText = total

			}

			// Remove DOM element that used as duplicate template
			if ( document.querySelector('.product-list') !== null ) {
				let template = document.querySelector('.product-list:last-child')
				template.remove(template)
			}

			// List.js
			if ( document.querySelector('#filter') !== null ) {
				document.addEventListener('DOMContentLoaded', function() {
					var listjs = document.getElementById('filter')
						listjs1 = document.createElement('script')
						listjs1.src = 'https://cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js'
						listjs2 = document.createElement('script')
						listjs2.innerHTML = 'var listProduct = new List("filter", { valueNames: ["filter-title", "filter-price", "filter-label", "filter-size", "filter-release"], page: 8, pagination: [{ paginationClass: "filter-pagination", left: 2, right: 2, item: `<li><a class="page" onclick="hrefPagin()"></a></li>` }] })'
					listjs.appendChild(listjs1)
					setTimeout(function() {
						listjs.appendChild(listjs2)

						// Category filter from link
						let url = window.location.href

						if ( url.indexOf('?') > -1 ) {

							// Define URL
							let urlDetail = url.split('?')
								urlSplit = urlDetail[1].split('-')
								words = urlSplit.join(' ')
								category = words.replace(/\b[a-z]/g, function(a) { return a.toUpperCase() })
								search = document.querySelector('.search')
								button = document.querySelector('[data-sort="filter-title"]')

							// Define selected product
							if ( search !== null ) {
								search.focus()
								search.value = category
								listProduct.search(category)
							}

						}

						// Filter and sorting button
						let button1 = document.querySelector('.list-sort-name')
							button2 = document.querySelector('.list-sort-size')
							button3 = document.querySelector('.list-sort-price')
							search = document.querySelector('.search')
							resetSort = document.querySelector('.list-sort-reset')
							resetFilter = document.querySelector('.list-filter-reset')
							result = document.querySelector('#searchResult')

						button1.onclick = function(e) { resetSort.classList.remove('d-none') }
						button2.onclick = function(e) { resetSort.classList.remove('d-none') }
						button3.onclick = function(e) { resetSort.classList.remove('d-none') }

						resetSort.onclick = function(e) {
							listProduct.sort('filter-release', { order: 'desc' })
							resetSort.classList.add('d-none')
							button1.querySelector('.sort').classList.remove('asc')
							button2.querySelector('.sort').classList.remove('asc')
							button3.querySelector('.sort').classList.remove('asc')
							button1.querySelector('.sort').classList.remove('desc')
							button2.querySelector('.sort').classList.remove('desc')
							button3.querySelector('.sort').classList.remove('desc')
						}

						resetFilter.onclick = function(e) {
							listProduct.sort('filter-release', { order: 'desc' })
							resetSort.classList.add('d-none')
							button1.querySelector('.sort').classList.remove('asc')
							button2.querySelector('.sort').classList.remove('asc')
							button3.querySelector('.sort').classList.remove('asc')
							button1.querySelector('.sort').classList.remove('desc')
							button2.querySelector('.sort').classList.remove('desc')
							button3.querySelector('.sort').classList.remove('desc')
							search.value = ''
							listProduct.search()
							result.classList.add('d-none')
						}

						search.oninput = function(e) {
							resetSort.classList.add('d-none')
							if ( this.value == '' ) {
								result.classList.add('d-none')
							} else {
								result.classList.remove('d-none')
								result.querySelector('strong').innerText = this.value
								listProduct.on('searchComplete', function() {
									let resultTotal = listProduct.update().matchingItems.length
									result.querySelector('span').innerText = resultTotal
								})
							}
						}
					},1000)
				})
				function hrefPagin() {
					window.scroll({
						top: 180
					})
				}
			}
		}

		// Product detail
		if ( document.querySelector('#productDetail') !== null ) {
			// Define product ID
			let url = window.location.href

			if ( url.indexOf('?') > -1 ) {
				// Define URL
				let urlDetail = url.split('?')
					urlSplit = urlDetail[1].split('&')
					urlID = urlSplit[0]
					urlTitle = urlSplit[1]

				// Loop JSON data
				for (let i = 0; i < product.length; i++) {
					// Define last item
					let lastItem = product[product.length - 1]
						detailID = product[i].id
						detailTitle = product[i].title

					// Define selected product
					if ( detailID == urlID && detailTitle.toLowerCase().split(' ').join('-') == urlTitle ) {

						// Remove Template
						let pu = document.querySelector('#productUnavailable')
						if ( pu !== null ) pu.remove(pu)

						// Define JSON data
						let id = product[i].id
							title = product[i].title
							price = product[i].price
							category = product[i].category
							desc = product[i].description
							badge = product[i].badge
							jpg0 = product[i].image.src0.jpg
							jpg1 = product[i].image.src1.jpg
							jpg2 = product[i].image.src2.jpg
							jpg3 = product[i].image.src3.jpg
							webp0 = product[i].image.src0.webp
							webp1 = product[i].image.src1.webp
							webp2 = product[i].image.src2.webp
							webp3 = product[i].image.src3.webp
							instagram = product[i].link.instagram

						// ------------------------------------------------------
						// Fill in JSON data to DOM element
						// ------------------------------------------------------

						// Define Selector
						let productID = document.querySelector('.product-id')
							productTitle = document.querySelector('.product-title')
							productPrice = document.querySelector('.product-price')
							productCategory = document.querySelector('.product-category')
							productDesc = document.querySelector('.product-description')
							productImage = document.querySelectorAll('.product-image')
							productThumb = document.querySelectorAll('.product-thumbnail')
							productModal = document.querySelectorAll('.product-modal')
							productLink = document.querySelector('.product-link')
							productWhatsapp = document.querySelector('.product-whatsapp')
							productInstagram = document.querySelector('.product-instagram')
							productBreadcrumb = document.querySelector('.breadcrumb-item.active')

						// Product ID
						if ( productID !== null ) productID.innerText = id

						// Product Title
						if ( productTitle.querySelector('h2') !== null ) productTitle.querySelector('h2').innerText = title

						// Product Description
						if ( productDesc !== null ) productDesc.innerText = desc

						// Product Price
						if ( productPrice !== null ) productPrice.innerText = price

						// Product Category
						if ( productCategory !== null ) {
							productCategory.innerText = category

							const badges = productCategory.classList
							if (badges.contains('bg-pink')) {
								badges.remove('bg-pink')
							} else if (badges.contains('bg-purple')) {
								badges.remove('bg-purple')
							} else if (badges.contains('bg-primary')) {
								badges.remove('bg-primary')
							} else if (badges.contains('bg-success')) {
								badges.remove('bg-success')
							} else if (badges.contains('bg-orange')) {
								badges.remove('bg-orange')
							}

							productCategory.classList.add(badge)

							// Get category specification
							if ( document.querySelector('#productCategory') !== null ) {
								// Parse JSON data
								let categories = JSON.parse(kategori)

								// Loop JSON data
								for (let c = 0; c < categories.length; c++) {
									if ( category == categories[c].title ) {
										let categoriesSize = document.querySelector('.product-category-size')
											categoriesLabel = document.querySelector('.product-category-label')
										if ( categoriesSize !== null ) categoriesSize.innerText = categories[c].size
										if ( categoriesLabel !== null ) categoriesLabel.innerText = categories[c].label
									}
								}
							}
						}

						// Product Image
						if ( productImage !== null ) {
							let img0 = productImage[0].querySelector('img')
								img1 = productImage[1].querySelector('img')
								img2 = productImage[2].querySelector('img')
								img3 = productImage[3].querySelector('img')
								thumb = 'https://drive.google.com/thumbnail?id='
								origin = 'https://drive.google.com/uc?export=view&id='
							if ( img0 !== null ) {
								productImage[0].querySelector('[type="webp"]').srcset = thumb + webp0 + ' 1x, ' + origin + webp0 + ' 2x'
								productImage[0].querySelector('[type="jpg"]').srcset = thumb + jpg0 + ' 1x, ' + origin + jpg0 + ' 2x'
								img0.srcset = thumb + jpg0 + ' 1x, ' + origin + jpg0 + ' 2x'
								img0.src = thumb + jpg0
								img0.alt = 'Foto ' + title + ' 1'
							}
							if ( img1 !== null ) {
								productImage[1].querySelector('[type="webp"]').srcset = thumb + webp1 + ' 1x, ' + origin + webp1 + ' 2x'
								productImage[1].querySelector('[type="jpg"]').srcset = thumb + jpg1 + ' 1x, ' + origin + jpg1 + ' 2x'
								img1.srcset = thumb + jpg1 + ' 1x, ' + origin + jpg1 + ' 2x'
								img1.src = thumb + jpg1
								img1.alt = 'Foto ' + title + ' 2'
							}
							if ( img2 !== null ) {
								productImage[2].querySelector('[type="webp"]').srcset = thumb + webp2 + ' 1x, ' + origin + webp2 + ' 2x'
								productImage[2].querySelector('[type="jpg"]').srcset = thumb + jpg2 + ' 1x, ' + origin + jpg2 + ' 2x'
								img2.srcset = thumb + jpg2 + ' 1x, ' + origin + jpg2 + ' 2x'
								img2.src = thumb + jpg2
								img2.alt = 'Foto ' + title + ' 3'
							}
							if ( img3 !== null ) {
								productImage[3].querySelector('[type="webp"]').srcset = thumb + webp3 + ' 1x, ' + origin + webp3 + ' 2x'
								productImage[3].querySelector('[type="jpg"]').srcset = thumb + jpg3 + ' 1x, ' + origin + jpg3 + ' 2x'
								img3.srcset = thumb + jpg3 + ' 1x, ' + origin + jpg3 + ' 2x'
								img3.src = thumb + jpg3
								img3.alt = 'Foto ' + title + ' 4'
							}
						}

						// Product Thumbnail
						if ( productThumb !== null ) {
							let thumb0 = productThumb[0].querySelector('img')
								thumb1 = productThumb[1].querySelector('img')
								thumb2 = productThumb[2].querySelector('img')
								thumb3 = productThumb[3].querySelector('img')
								thumb = 'https://drive.google.com/thumbnail?id='
								origin = 'https://drive.google.com/uc?export=view&id='
							if ( thumb0 !== null ) {
								productThumb[0].querySelector('[type="webp"]').srcset = thumb + webp0 + ' 1x, ' + origin + webp0 + ' 2x'
								productThumb[0].querySelector('[type="jpg"]').srcset = thumb + jpg0 + ' 1x, ' + origin + jpg0 + ' 2x'
								thumb0.srcset = thumb + jpg0 + ' 1x, ' + origin + jpg0 + ' 2x'
								thumb0.src = thumb + jpg0
								thumb0.alt = 'Foto ' + title + ' 1'
							}
							if ( thumb1 !== null ) {
								productThumb[1].querySelector('[type="webp"]').srcset = thumb + webp1 + ' 1x, ' + origin + webp1 + ' 2x'
								productThumb[1].querySelector('[type="jpg"]').srcset = thumb + jpg1 + ' 1x, ' + origin + jpg1 + ' 2x'
								thumb1.srcset = thumb + jpg1 + ' 1x, ' + origin + jpg1 + ' 2x'
								thumb1.src = thumb + jpg1
								thumb1.alt = 'Foto ' + title + ' 2'
							}
							if ( thumb2 !== null ) {
								productThumb[2].querySelector('[type="webp"]').srcset = thumb + webp2 + ' 1x, ' + origin + webp2 + ' 2x'
								productThumb[2].querySelector('[type="jpg"]').srcset = thumb + jpg2 + ' 1x, ' + origin + jpg2 + ' 2x'
								thumb2.srcset = thumb + jpg2 + ' 1x, ' + origin + jpg2 + ' 2x'
								thumb2.src = thumb + jpg2
								thumb2.alt = 'Foto ' + title + ' 3'
							}
							if ( thumb3 !== null ) {
								productThumb[3].querySelector('[type="webp"]').srcset = thumb + webp3 + ' 1x, ' + origin + webp3 + ' 2x'
								productThumb[3].querySelector('[type="jpg"]').srcset = thumb + jpg3 + ' 1x, ' + origin + jpg3 + ' 2x'
								thumb3.srcset = thumb + jpg3 + ' 1x, ' + origin + jpg3 + ' 2x'
								thumb3.src = thumb + jpg3
								thumb3.alt = 'Foto ' + title + ' 4'
							}
						}

						// Product Modal
						if ( productModal !== null ) {
							let img0 = productModal[0].querySelector('img')
								img1 = productModal[1].querySelector('img')
								img2 = productModal[2].querySelector('img')
								img3 = productModal[3].querySelector('img')
								thumb = 'https://drive.google.com/thumbnail?id='
								origin = 'https://drive.google.com/uc?export=view&id='
							if ( img0 !== null ) {
								productModal[0].querySelector('[type="webp"]').srcset = thumb + webp0 + ' 1x, ' + origin + webp0 + ' 2x'
								productModal[0].querySelector('[type="jpg"]').srcset = thumb + jpg0 + ' 1x, ' + origin + jpg0 + ' 2x'
								img0.srcset = thumb + jpg0 + ' 1x, ' + origin + jpg0 + ' 2x'
								img0.src = thumb + jpg0
								img0.alt = 'Foto ' + title + ' 1'
							}
							if ( img1 !== null ) {
								productModal[1].querySelector('[type="webp"]').srcset = thumb + webp1 + ' 1x, ' + origin + webp1 + ' 2x'
								productModal[1].querySelector('[type="jpg"]').srcset = thumb + jpg1 + ' 1x, ' + origin + jpg1 + ' 2x'
								img1.srcset = thumb + jpg1 + ' 1x, ' + origin + jpg1 + ' 2x'
								img1.src = thumb + jpg1
								img1.alt = 'Foto ' + title + ' 2'
							}
							if ( img2 !== null ) {
								productModal[2].querySelector('[type="webp"]').srcset = thumb + webp2 + ' 1x, ' + origin + webp2 + ' 2x'
								productModal[2].querySelector('[type="jpg"]').srcset = thumb + jpg2 + ' 1x, ' + origin + jpg2 + ' 2x'
								img2.srcset = thumb + jpg2 + ' 1x, ' + origin + jpg2 + ' 2x'
								img2.src = thumb + jpg2
								img2.alt = 'Foto ' + title + ' 3'
							}
							if ( img3 !== null ) {
								productModal[3].querySelector('[type="webp"]').srcset = thumb + webp3 + ' 1x, ' + origin + webp3 + ' 2x'
								productModal[3].querySelector('[type="jpg"]').srcset = thumb + jpg3 + ' 1x, ' + origin + jpg3 + ' 2x'
								img3.srcset = thumb + jpg3 + ' 1x, ' + origin + jpg3 + ' 2x'
								img3.src = thumb + jpg3
								img3.alt = 'Foto ' + title + ' 4'
							}
						}

						// WhatsApp
						let phone = '6287838610808'
							waTo = 'https://wa.me/' + phone + '?text='
							waMsg = 'Hai kak... Saya sedang mencari sprei yang cocok di Zaleva, dan saya tertarik dengan '
							link = window.location.href.split(':').join('%3A').split('/').join('%2F').split('?').join('%3F').split('&').join('%26')
							content = waTo + waMsg + '_*' + title + ' (' + id + ')*_' + ' - ' + link
							encode = content.split(' ').join('%20')

						if ( productWhatsapp !== null ) productWhatsapp.href = encode

						// Instagram
						if ( productInstagram !== null ) productInstagram.href = 'https://www.instagram.com/p/' + instagram

						// Breadcrumb
						if ( productBreadcrumb !== null ) productBreadcrumb.innerText = title

						break

					} else if ( detailID == lastItem.id ) {

						// Remove Template
						let pa = document.querySelector('#productAvailable')
						if ( pa !== null ) pa.remove(pa)

						break

					} else {

						// Define Selector
						let na = document.querySelector('#productUnavailable')
							title = na.querySelector('h2')
							desc = na.querySelector('p')
							link = na.querySelector('a')
							svg = na.querySelector('[type="image/svg+xml"]')
							img = na.querySelector('img')
							src = '../assets/img/not-available.svg'
							productBreadcrumb = document.querySelector('.breadcrumb-item.active')

						// Unavailable Title
						if ( title !== null ) title.innerText = 'Maaf...'

						// Unavailable Description
						if ( desc !== null ) desc.innerText = 'Produk yang Anda cari tidak tersedia, silakan kembali ke halaman produk.'

						// Unavailable Button
						if ( link !== null ) {
							link.href = '/produk/'
							link.innerText = 'Kembali'
							link.classList.add('btn-primary')
						}

						// Unavailable Image
						if ( img !== null ) {
							svg.srcset = src + ' 1x, ' + src + ' 2x'
							img.srcset = src + ' 1x, ' + src + ' 2x'
							img.src = src
							img.alt = 'Produk tidak tersedia'
						}

						// Breadcrumb
						if ( productBreadcrumb !== null ) productBreadcrumb.innerText = 'Tidak Tersedia'

					}
				}
			} else {
				window.location.href = '/produk/'
			}
		}
	}

// Category
	if ( document.querySelector('#categoryData') !== null ) {
		// Parse JSON data
		var categories = JSON.parse(kategori)

		// Loop JSON data
		for (let i = 0; i < categories.length; i++) {

			// Define JSON data
			let title = categories[i].title
				size = categories[i].size
				label = categories[i].label
				jpg = categories[i].image.jpg
				webp = categories[i].image.webp
				detail = categories[i].link.detail

			// Duplicate DOM element
			let list = document.querySelector('.category-list')
				clone = list.cloneNode(true)
			list.after(clone)

			// ------------------------------------------------------
			// Fill in JSON data to DOM element
			// ------------------------------------------------------

			// Define Selector
			let categoryTitle = document.querySelector('.category-title')
				categorySize = document.querySelector('.category-size')
				categoryLabel = document.querySelector('.category-label')
				categoryImage = document.querySelector('.category-image')
				categoryLink = document.querySelector('.category-link')

			// Category Title
			if ( categoryTitle.querySelector('h3') !== null ) categoryTitle.querySelector('h3').innerText = title

			// Category Size
			if ( categorySize !== null ) categorySize.innerText = size

			// Category Label
			if ( categoryLabel !== null ) categoryLabel.innerText = label

			// Category Image
			if ( categoryImage !== null ) {
				let img = categoryImage.querySelector('img')
					thumb = 'https://drive.google.com/thumbnail?id='
					origin = 'https://drive.google.com/uc?export=view&id='
				if ( img !== null ) {
					categoryImage.querySelector('[type="webp"]').srcset = thumb + webp + ' 1x, ' + origin + webp + ' 2x'
					categoryImage.querySelector('[type="jpg"]').srcset = thumb + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.srcset = thumb + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.src = thumb + jpg
					img.alt = 'Foto ' + title
				}
			}

			// Category Link
			let link = '/produk?' + detail
			if ( categoryTitle !== null ) categoryTitle.href = link
			if ( categoryImage !== null ) categoryImage.href = link
			if ( categoryLink !== null ) categoryLink.href = link
		}

		// Remove DOM element that used as duplicate template
		let template = document.querySelector('.category-list:last-child')
		template.remove(template)
	}

// Testimonial
	if ( document.querySelector('#testimonyData') !== null ) {
		// Parse JSON data
		var testi = JSON.parse(testimoni)

		// Testimonial latest
		if ( document.querySelector('#testimonyLatest') !== null ) {
			var testi = testi.filter(function(el, index) {
				return index >= testi.length - 3
			})
		}

		// Loop JSON data
		for (let i = 0; i < testi.length; i++) {

			// Define JSON data
			let name = testi[i].name
				address = testi[i].address
				content = testi[i].content
				jpg = testi[i].image.jpg
				webp = testi[i].image.webp

			// Duplicate DOM element
			let list = document.querySelector('.testi-list')
				indicator = document.querySelector('.carousel-indicators li')
				cloneList = list.cloneNode(true)
				cloneIndicator = indicator.cloneNode(true)
			list.after(cloneList)
			indicator.after(cloneIndicator)

			// ------------------------------------------------------
			// Fill in JSON data to DOM element
			// ------------------------------------------------------

			// Define Selector
			let testiName = document.querySelector('.testi-name')
				testiAddress = document.querySelector('.testi-address')
				testiContent = document.querySelector('.testi-content')
				testiImage = document.querySelector('.testi-image')

			// Testimonial Name
			if ( testiName !== null ) testiName.innerText = name

			// Testimonial Address
			if ( testiAddress !== null ) testiAddress.innerText = address

			// Testimonial Content
			if ( testiContent !== null ) testiContent.innerText = content

			// Testimonial Image
			if ( testiImage !== null ) {
				let img = testiImage.querySelector('img')
					origin = 'https://drive.google.com/uc?export=view&id='
				if ( img !== null ) {
					testiImage.querySelector('[type="webp"]').srcset = origin + webp + ' 1x, ' + origin + webp + ' 2x'
					testiImage.querySelector('[type="jpg"]').srcset = origin + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.srcset = origin + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.src = origin + jpg
					img.alt = 'Foto ' + name
				}
			}

			let total = testi.length
				inverse = total - i - 1
			document.querySelector('.carousel-indicators li').setAttribute('data-bs-slide-to',inverse)
		}

		// Activate slider
		document.querySelector('.testi-list:first-child').classList.add('active')
		document.querySelector('.carousel-indicators li:first-child').classList.add('active')

		// Remove DOM element that used as duplicate template
		let template = document.querySelector('.testi-list:last-child')
			templateIndicator = document.querySelector('.carousel-indicators li:last-child')
		template.remove(template)
		templateIndicator.remove(templateIndicator)
	}

	if ( document.querySelector('#testimonialData') !== null ) {
		// Parse JSON data
		var testi = JSON.parse(testimoni)

		// Loop JSON data
		for (let i = 0; i < testi.length; i++) {

			// Define JSON data
			let name = testi[i].name
				address = testi[i].address
				content = testi[i].content
				jpg = testi[i].image.jpg
				webp = testi[i].image.webp

			// Duplicate DOM element
			let list = document.querySelector('.testi-list')
				clone = list.cloneNode(true)
			list.after(clone)

			// ------------------------------------------------------
			// Fill in JSON data to DOM element
			// ------------------------------------------------------

			// Define Selector
			let testiName = document.querySelector('.testi-name')
				testiAddress = document.querySelector('.testi-address')
				testiContent = document.querySelector('.testi-content')
				testiImage = document.querySelector('.testi-image')

			// Testimonial Name
			if ( testiName !== null ) testiName.innerText = name

			// Testimonial Address
			if ( testiAddress !== null ) testiAddress.innerText = address

			// Testimonial Content
			if ( testiContent !== null ) testiContent.innerText = content

			// Testimonial Image
			if ( testiImage !== null ) {
				let img = testiImage.querySelector('img')
					origin = 'https://drive.google.com/uc?export=view&id='
				if ( img !== null ) {
					testiImage.querySelector('[type="webp"]').srcset = origin + webp + ' 1x, ' + origin + webp + ' 2x'
					testiImage.querySelector('[type="jpg"]').srcset = origin + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.srcset = origin + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.src = origin + jpg
					img.alt = 'Foto ' + name
				}
			}

			// Masonry.js
			if ( document.querySelector('#grid') !== null ) {
				document.addEventListener('DOMContentLoaded', function() {
					var masonry = document.getElementById('grid')
						masonry1 = document.createElement('script')
						masonry1.src = 'https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js'
						masonry2 = document.createElement('script')
						masonry2.innerHTML = 'var msnry = new Masonry("#grid")'
					masonry.appendChild(masonry1)
					setTimeout(function() {
						masonry.appendChild(masonry2)
					},1000)
				})
			}

		}

		// Remove DOM element that used as duplicate template
		let template = document.querySelector('.testi-list:last-child')
		template.remove(template)
	}

// Banner
	if ( document.querySelector('#bannerData') !== null ) {
		// Parse JSON data
		var banner = JSON.parse(banner)

		// Loop JSON data
		for (let i = 0; i < banner.length; i++) {

			// Define JSON data
			let title = banner[i].title
				jpg = banner[i].image.jpg
				webp = banner[i].image.webp
				detail = banner[i].link.detail

			// Duplicate DOM element
			let list = document.querySelector('.banner-list')
				clone = list.cloneNode(true)
			list.after(clone)

			// ------------------------------------------------------
			// Fill in JSON data to DOM element
			// ------------------------------------------------------

			// Define Selector
			let bannerImage = document.querySelector('.banner-image')
				bannerLink = document.querySelector('.banner-link')

			// Banner Image
			if ( bannerImage !== null ) {
				let img = bannerImage.querySelector('img')
					thumb = 'https://drive.google.com/thumbnail?id='
					origin = 'https://drive.google.com/uc?export=view&id='
				if ( img !== null ) {
					bannerImage.querySelector('[type="webp"]').srcset = thumb + webp + ' 1x, ' + origin + webp + ' 2x'
					bannerImage.querySelector('[type="jpg"]').srcset = thumb + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.srcset = thumb + jpg + ' 1x, ' + origin + jpg + ' 2x'
					img.src = thumb + jpg
					img.alt = title
				}
			}

			// Banner Link
			let link = '/' + detail
			if ( bannerImage !== null ) bannerImage.href = link
			if ( bannerLink !== null ) bannerLink.href = link
		}

		// Remove DOM element that used as duplicate template
		let template = document.querySelector('.banner-list:last-child')
		template.remove(template)
	}
