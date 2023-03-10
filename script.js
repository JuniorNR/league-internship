'use strict'

const postsList = document.querySelector('.posts > ul')

let posts = []
let newPosts = []

// get posts
function getPosts(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.open('GET', url)
    request.onload = () => resolve(request.response)
    request.onerror = () => reject(request.status)
    request.send()
  })
}

getPosts('https://intership-liga.ru/tasks/')
  .then(data => {
    JSON.parse(data).forEach(item => posts.push(item))
    renderPosts(posts)
  })
  .catch(error => console.error(error))

function renderPosts(posts) {
  newPosts = structuredClone(posts)
  posts.length = 0

  if(newPosts.length !== 0) {
    newPosts.forEach(item => {
      const li = document.createElement('li')
      li.innerHTML = `
        <h3>${item.name.length <= 5 ? item.name : item.name.slice(0, 5)}</h3>
        <p>${item.info.length <= 5 ? item.info : item.info.slice(0, 5)}</p>
        <div class="input-fields">
          <input type="button" value="edit" />
          <input type="button" value="delete" data-id=${item.id} />
        </div>
      `
      postsList.append(li)
    })
  }
}


// post add
const postAddForm = document.querySelector('.post-add > form')

function addPost(url, data) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('POST', url, false)
    
    request.onLoad = resolve(request)
    request.onError = reject(request.status)
    request.setRequestHeader('Content-type', 'application/json')
    request.setRequestHeader('Accept', 'application/json')
    
    request.send(JSON.stringify({
      name: data.get('name'),
      info: data.get('info'),
      isImportant: data.get('isImportant')
    }))
  })
}

postAddForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const formData = new FormData(postAddForm)
  formData.append('isImportant', false)
  postAddForm.reset()

  addPost('https://intership-liga.ru/tasks', formData)
    .then(data => {
      posts.push(JSON.parse(data.response))
      renderPosts(posts)
    })
    .catch(error => console.error(error))
})


// delete post
const postEditForm = document.querySelector('.post-edit > form')

function deletePost(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.open('DELETE', url)
    request.onLoad = resolve(request)
    request.onError = reject(request.status)
    request.send()
  })
}

postsList.addEventListener('click', (event) => {
  if(event.target.getAttribute('value') === 'delete') {
    deletePost('https://intership-liga.ru/tasks/' + event.target.dataset.id)
      .then(() => {
        // TODO: доделать удаление
      })
      .catch(console.error)
  }
})