'use strict'

// TODO: FETCH requests
// method: 'get', 'post', 'catch', 'delete'

let bodyPost = {
  name: 'test',
  info: 'testing',
  isImportant: false
} // захардкодил данные

let bodyPatch = {
  name: 'console Edited',
  info: '.log(1) Edited',
  isImportant: false
} // захардкодил данные

function request(method = 'get', url, body) {
  method = method.toUpperCase()

  async function getFetchPosts(url) {
    const fetchRequest = await fetch(url, {
      method: 'GET',
      header: [
        {'Content-type': 'application/json'}
      ]
    })
    return await fetchRequest.json()
  }

  async function postFetchPosts(url, body) {
    const request = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(body)
    })

    return await request.json()
  }

  async function patchFetchPosts(url, body) {
    const request = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(body)
    })
  
    return await request.json()
  }

  async function deleteFetchPosts(url) {
    const request = await fetch(url, {
      method: "DELETE"
    })
  
    return await request.json()
  }

  switch(method) {
    case 'GET': return getFetchPosts(url)
    case 'POST': return postFetchPosts(url, body)
    case 'PATCH': return patchFetchPosts(url, body)
    case 'DELETE': return deleteFetchPosts(url)
    default: throw new Error('Method is not defined')
  }
}


// request('get', 'https://intership-liga.ru/tasks', bodyPost)
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

// request('post', 'https://intership-liga.ru/tasks', bodyPost)
//   .then(data => console.log(data))
//   .catch(error => console.log(error))


// request('patch', 'https://intership-liga.ru/tasks/21', bodyPatch)
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

// request('delete', 'https://intership-liga.ru/tasks/21')
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

const randomImageWrapper = document.querySelector('.random-image > .random-image__wrapper')
const randomImageForm = document.querySelector('.random-image__form')
let image = null

request('get', 'https://dog.ceo/api/breeds/image/random')
  .then(data => renderImage(data.message))
  .catch(console.error)

function renderImage(url, message = null) {
  if(url === null || url === undefined) return

  if(randomImageWrapper.children.length !== 0) {
    randomImageWrapper.removeChild(randomImageWrapper.children[0])
  }

  const img = document.createElement('img')
  img.src = url
  img.alt = 'random dog'

  randomImageWrapper.append(img)

  if(message) {
    (function renderResponseMessage() {
      const div = document.createElement('div')
      div.classList.add('success')
      div.textContent = message
      randomImageForm.append(div)

      setTimeout(() => {
        div.remove()
      }, 1000)
    })()
  }


}

randomImageForm.addEventListener('submit', (event) => {
  event.preventDefault()

  request('get', 'https://dog.ceo/api/breeds/image/random')
    .then(data => renderImage(data.message, 'Собака!'))
    .catch(console.error)
})