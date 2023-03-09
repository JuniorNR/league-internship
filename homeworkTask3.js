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

const promise1 = new Promise(resolve => {
	resolve('microTask 2')
})

const promise2 = new Promise(resolve => {
	console.log('microTask 1')

	resolve('microTask 3')
})

setTimeout(() => {
	console.log('microTask 4')
	document.body.innerHTML = `<h1 style="color: #fff">Microtask 4</h1>`
}, 4)

promise1.then(data => {
	console.log(data)
	document.body.style.backgroundColor = 'black'
})

promise2.then(data => {
	console.log(data)
})