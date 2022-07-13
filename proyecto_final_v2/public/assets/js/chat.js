const socket = io()
const userEmail = document.getElementById('userEmail')
const btnLoginUser = document.getElementById('btnLoginUser')
const usersContainer = document.getElementById('usersList')
const spanServerMessage = document.getElementById('serverNotification')
const divUserHeader = document.getElementById('userHeader')
const divBlurChat = document.getElementById('blurChat')

btnLoginUser.addEventListener('click', () => {
  const username = userEmail.value
  if(username.trim() == ''){
    alert('Complete su email para ingresar al chat')
    return false
  }
  socket.emit('joinChat', { username })
})

socket.on('notification', data => {
  console.log({data})
  spanServerMessage.innerHTML = data
})

socket.on('loadUser', user => {
  userEmail.value = ''
  btnLoginUser.disabled = true
  divBlurChat.style.setProperty('display', 'none')

  //console.log({data})
  const userHeader = `
  <div class="img_cont">
      <img id="imgUserAvatar" src="https://bootdey.com/img/Content/avatar/avatar${user.avatarId}.png" class="rounded-circle user_img">
      <span class="online_icon"></span>
  </div>
  <div class="user_info">
      <span id="spnUserName">${user.username}</span>
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
                <img src="https://bootdey.com/img/Content/avatar/avatar${user.avatarId}.png" class="rounded-circle user_img">
              </div>
              <div class="user_info">
                <span>${user.username}</span>
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
