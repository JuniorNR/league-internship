'use strict'

// TODO: Вторая задача.
// *Написать функцию которая выполнит быструю сортировку массива чисел


// Первый способ. Вручную написать алгоритм.
const arr = [5, 1, 3, 2, -15, 4, 0, 152, -1, -2]

function sortArr(arr) {
	let sortedArray = [...arr]
	for(let i = 0; i < sortedArray.length; i++) {
		for(let j = 0; j < sortedArray.length - 1; j++) {
			if(sortedArray[j] > sortedArray[j + 1]) {
				let temp = sortedArray[j]
				sortedArray[j] = sortedArray[j + 1]
				sortedArray[j + 1] = temp
			}
		}
	}
	return sortedArray
}

// console.log(sortArr(arr))


// Второй способ. Через метод массива sort()
function sort(a, b) {
	if(a > b) return 1
	if(a === b) return 0
	if(a < b) return -1
}

// console.log(arr.sort(sort))
