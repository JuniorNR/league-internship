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
  if(posts.length !== 0) {
    newPosts = posts
    Array.from(postsList.children).forEach(item => item.remove())

    posts.forEach(item => {
      const li = document.createElement('li')
      li.innerHTML = `
        <h3>${item.name.length <= 5 ? item.name : item.name.slice(0, 5)}</h3>
        <p>${item.info.length <= 5 ? item.info : item.info.slice(0, 5)}</p>
        <div class="input-fields">
          <input type="button" value="edit" data-id=${item.id} />
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
        posts.forEach(item => {
          if(item.id === +event.target.dataset.id) {
            posts.splice(posts.indexOf(item), 1)
          }
        })
        renderPosts(posts)
      })
      .catch(console.error)
  }
})

// edit post
const postEditWrapper = document.querySelector('.post-edit')
const postEditForm = document.querySelector('.post-edit > form')
const inputName = postEditForm.querySelector('[name="name"]')
const inputInfo = postEditForm.querySelector('[name="info"]')

let postId = null

postsList.addEventListener('click', (event) => {
  if(event.target.getAttribute('value') === 'edit') {
    newPosts.forEach(item => {
      if(item.id === +event.target.dataset.id) {
        postId = item.id
        inputName.value = item.name
        inputInfo.value = item.info

        postEditWrapper.classList.remove('blur-bg')
      }
    })
  }
})

postEditForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const formData = new FormData(postEditForm)

  formData.append('name', inputName.value)
  formData.append('info', inputInfo.value)
  formData.append('isImportant', false)
  formData.append('isCompleted', true)

  editPost('https://intership-liga.ru/tasks/' + postId, formData)
    .then(data => {
      const result = JSON.parse(data.response)

      const newPosts = posts.map(item => {
        if(item.id === result.id) {
          return result
        }
        return item
      })

      renderPosts(newPosts)

      postEditWrapper.classList.add('blur-bg')
    })
    .catch(error => console.error(error))
})

function editPost(url, body) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.open('PATCH', url, false)
    request.setRequestHeader('Content-type', 'application/json')
    request.setRequestHeader('Accept', 'application/json')

    request.onLoad = resolve(request)
    request.onError = reject(request.status)

    request.send(JSON.stringify({
      name: body.get('name'),
      info: body.get('info'),
      isImportant: body.get('isImportant'),
      IsCompleted: body.get('isCompleted')
    }))
  })
}