'use strict'

// TODO: Третья задача.
// Написать функцию которая создаст очереди в следующем порядке:

// 1. Задача
// 1.1 микрозадача
// 1.2 Рендер задача (например изменение стилей)
// 2. Задача
// 2.1 микрозадача
// 2.2 микрозадача
// 3. Задача
// 3.1 микрозадача
// 3.2 Рендер задача (например изменение содержание элемента)

setTimeout(() => {
	console.log('microTask 1')

	document.body.style.backgroundColor = 'black'
}, 500)

setTimeout(() => {
	console.log('microTask 2')
	console.log('microTask 3')
}, 1000)

setTimeout(() => {
	console.log('microTask 4')

	document.body.style.display = 'none'
}, 1500)