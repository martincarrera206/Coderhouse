const socket = io()

const userNombre = document.getElementById('userNombre')
const userApellido = document.getElementById('userApellido')
const userEmail = document.getElementById('userEmail')
const userEdad = document.getElementById('userEdad')
const userAlias = document.getElementById('userAlias')
const userAvatar = document.getElementById('userAvatar')

const btnLoginUser = document.getElementById('btnLoginUser')
const usersContainer = document.getElementById('usersList')
const spanServerMessage = document.getElementById('serverNotification')
const divUserHeader = document.getElementById('userHeader')
const divBlurChat = document.getElementById('blurChat')

btnLoginUser.addEventListener('click', () => {

  const user_nombre = userNombre.value
  const user_apellido = userApellido.value
  const user_email = userEmail.value
  const user_edad = userEdad.value
  const user_alias = userAlias.value
  const user_avatar = userAvatar.value

  if(user_nombre.trim() == ''){
    alert('Complete su nombre para ingresar al chat')
    return false
  }
  if(user_apellido.trim() == ''){
    alert('Complete su apellido para ingresar al chat')
    return false
  }
  if(user_email.trim() == ''){
    alert('Complete su email para ingresar al chat')
    return false
  }
  if(user_edad.trim() == ''){
    alert('Complete su edad para ingresar al chat')
    return false
  }

  const user = {
    nombre: user_nombre,
    apellido: user_apellido,
    email: user_email,
    edad: user_edad,
    alias: user_alias,
    avatar: user_avatar
  }

  socket.emit('joinChat', { 
    user
  })

})

socket.on('notification', data => {
  console.log({data})
  spanServerMessage.innerHTML = data
})

socket.on('loadUser', user => {

  userNombre.value = ''
  userApellido.value = ''
  userEmail.value = ''
  userEdad.value = ''
  userAlias.value = ''
  userAvatar.value = ''
  btnLoginUser.disabled = true

  divBlurChat.style.setProperty('display', 'none')
  const userHeader = `
  <div class="img_cont">
      <img id="imgUserAvatar" src="${user.avatar}" class="rounded-circle user_img">
      <span class="online_icon"></span>
  </div>
  <div class="user_info">
      <span id="spnUserName">${user.nombre} ${user.apellido}</span>
  </div>
  `
  divUserHeader.innerHTML = userHeader
})

socket.on('users', data => {
    const users = data
      .map(user => {
        const userElement = `
          <li>
            <div class="d-flex bd-highlight">
              <div class="img_cont">
                <img src="${user.avatar}" class="rounded-circle user_img">
              </div>
              <div class="user_info">
                <span>${user.nombre} ${user.apellido}</span>
              </div>
            </div>
          </li>
          `
        return userElement
      })
      .join('')
   
    usersContainer.innerHTML = users
})

const messagesContainer = document.getElementById('messagesContainer')
const sendMessage = document.getElementById('sendMessage')
const messageInput = document.getElementById('messageInput')

socket.on('message', data => {
    const message = `
      <div class="d-flex justify-content-start mb-4">
        <div class="img_cont_msg">
          <img src="https://bootdey.com/img/Content/avatar/avatar${data.user.avatar}.png" class="rounded-circle user_img_msg">
        </div>
        <div class="msg_cotainer">
          ${data.text}
          <span class="msg_time">${data.time} ${data.user.nombre} ${data.user.apellido}</span>
        </div>
      </div>
      `
    messagesContainer.innerHTML += message
})

socket.on('myMessage', data => {
  const message = `
  <div class="d-flex justify-content-start mb-4">
    <div class="img_cont_msg">
      <img src="https://bootdey.com/img/Content/avatar/avatar${data.user.avatarId}.png" class="rounded-circle user_img_msg">
    </div>
    <div class="msg_cotainer">
      ${data.text}
      <span class="msg_time">${data.time} ${data.user.username}</span>
    </div>
  </div>
  `
  
  messagesContainer.innerHTML += message
})
   
sendMessage.addEventListener('click', () =>{
  socket.emit('messageInput', messageInput.value)
  messageInput.value = ''
})
