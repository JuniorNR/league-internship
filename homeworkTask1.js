'use strict'

// TODO: Первая задача
// Сделать функцию, которая будет позволять вызывать себя последовательно для
// суммирования и/или при выводе и/или математической операции вернет конечный
// результат fucn(2)(3)(5) = 10


// 1 способ. Захардкодить арность
const func = (a) => (b) => (c) => a + b + c

// console.log(func(2)(3)(5))


// 2 способ. Через шаблон каррирования (подсмотрел метод, сделал не сам, но понимаю принцип)
const _funcN3 = (a, b, c) => {
	return a + b + c
}

function curry(fn) {
	const n = fn.length
	function innerFn(n, args) {
		return function actualInnerFn(a) {
			if(n <= 1) {
				return fn(...args, a)
			}
			return innerFn(n - 1, [...args, a])
		}
	}
	return innerFn(n, [])
}

const func3 = curry(_funcN3)

// console.log(func3(2)(3)(5))