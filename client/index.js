const SERVER = 'http://localhost:3000'

$(document).ready(function () {

  const access_token = localStorage.getItem('access_token')
  
  
  if(access_token){
    $('#home').show()
    $('#login').hide()
    $('#register').hide()
    fetchTodo()

  } else {
    $('#login').show()
    $('#register').hide()
    $('#home').hide()
  }
  
  
})

function signUp (){
  $('#login').hide()
  $('#register').show()
}
function signIn (){
  $('#login').show()
  $('#register').hide()
}

function promiseAjax (url, method, headers, data) {

  return new Promise((resolve, reject) => {
    $.ajax({
      method: method,
      url: url,
      headers: headers,
      data: data
    }).done(respones => {
      resolve(respones)
    }).fail(err => {
      reject(err)
    })
  })
} 
// LOGIN
function login (e) {
  e.preventDefault()
  const email = $('#email-login').val()
  const password = $('#password-login').val()

  return promiseAjax(SERVER + '/users/login','POST',null,{ email,password})
            .then(response => {
              console.log('login berhasil'); 
              $('#email-login').val("")
              $('#password-login').val("")
              const access_token = response.access_token
              console.log(access_token);
              localStorage.setItem('access_token', access_token)
              $('#login').hide()
              $('#home').show()
              fetchTodo()
            })
            .catch(err => {
              console.log(err.responseJSON.error);
              $('#email-login').val("")
              $('#password-login').val("") 
            })
 
}

function onSignIn(googleUser) {
  const google_access_token =  googleUser.getAuthResponse().id_token;
  console.log(google_access_token);
  
  return promiseAjax(SERVER + '/users/googleLogin', 'POST', null, { google_access_token })
          .then(response => {
            console.log(response);
            const access_token = response.access_token
            console.log(access_token);
            localStorage.setItem('access_token', access_token)
            $('#login').hide()
            $('#home').show()
            fetchTodo()
          })
          .catch(err => {
            console.log(err);
            
          })
}

// REGISTER
function register (e) {
  e.preventDefault()
  const email = $('#email-register').val()
  const password = $('#password-register').val()

  return promiseAjax(SERVER + '/users/register','POST',null, { email, password })
            .then(response => {
              console.log(response, 'register berhasil');
              $('#email-register').val("")
              $('#password-register').val("")
              signIn()
            })
            .catch(err => {
              console.log(err.responseJSON.error);
              $('#email-register').val("")
              $('#password-register').val("") 
            })
 
}



function fetchTodo () {

  const access_token = localStorage.getItem('access_token')

  return promiseAjax(SERVER + '/todos', 'GET' ,{ access_token })
          .then(response => {
            console.log(response);
            
            $('#todo').empty()
            response.todos.forEach(element => {
            let status = element.status
            let id = element.id
              $('#todo').append(`
              <div class="render-todo mt-3"> 
                <div class="todo-content">
                  <p style="margin-left:2%;">${element.email}</p>
                  <h4 style="margin-left:2%;"><strong>${element.title}</strong></h4>
                  <p style="margin-left:2%;">${element.description}</p>
                  <button class="btn btn-primary btn-sm ml-2" onclick="detail(${element.id})">
                      Detail
                  </button>  
                </div>                 
                <div class="todo-date">
                  <p style="margin-top:5%;">${element.due_date}</p>
                    ${(status === 'unfinished' ? 
                      `<button id="status" class="btn btn-warning btn-sm mt-3";" onclick="changeStatus('${status}',${element.id})">undone</button>`: 
                      `<button id="status" class="btn btn-success btn-sm mt-3";  onclick="changeStatus('${status}',${element.id})">done</button>`)} 
                </div>
              </div>
              `)
            });
          })
          .catch(err => {
            console.log(err);
            
          })

}

function changeStatus(value,id) {
  console.log('terclick', value, id);
  let status 
  if(value === 'unfinished'){
    status = 'finished'
  } else if (value === 'finished') {
    status = 'unfinished'
  }
  let data = {
    status
  } 
  const access_token = localStorage.getItem('access_token')
  return promiseAjax(SERVER + `/todos/${id}`, 'PATCH' ,{ access_token }, data )
          .then(() => {
            fetchTodo()
          })
          .catch(err => {
            console.log(err);     
          })
  
}
function postTodo (e){
  e.preventDefault()

  const access_token = localStorage.getItem('access_token')

  const todo = $('#add-todo').val()
  const description = $('#add-description').val()
  const date = $('#add-date').val()

  let data = {
    title: todo,
    description: description,
    due_date: date
  }
  console.log(data);
  
  console.log(todo, description, date, '>>>>>');

  return promiseAjax(SERVER + '/todos','POST', { access_token } ,  data)
        .then(response => {
          fetchTodo()
          console.log(response);
          $('#add-todo').val("")
          $('#add-description').val("")
          $('#add-date').val("")
        })
        .catch(err => {
          console.log(err);
          $('#add-todo').val("")
          $('#add-description').val("")
          $('#add-date').val("")
        }) 
}

function detail (id){

  const access_token = localStorage.getItem('access_token')

  return promiseAjax(`${SERVER}/todos/${id}`, 'GET', { access_token }, null)
          .then(response => {
            let status = response.todo.status
            console.log(response, '<<<');
            $('#todo-detail').append(`
            <div class="render-todo mt-3"> 
                <div class="todo-content">
                  <p style="margin-left:2%;">${response.todo.email}</p>
                  <h4 style="margin-left:2%;"><strong>${response.todo.title}</strong></h4>
                  <p style="margin-left:2%;">${response.todo.description}</p> 
                </div>                 
                <div class="todo-date">
                  <p style="margin-top:5%;">${response.todo.due_date}</p>
                    ${(status === 'unfinished' ? 
                      '<button class="btn btn-warning btn-sm mt-3";">undone</button>': 
                      '<button class="btn btn-success btn-sm mt-3">done</button>')} 
                </div>
               
              </div>
              <button class="btn btn-primary mt-4" onclick="edit(${response.todo.id})">Edit</button>
              <button class="btn btn-warning mt-4" onclick="delete(${response.todo.id})">Delete</button>
            `)
            $('#todo').hide()
            $('#todo-form').hide()
          })
          .catch(err => {
            console.log(err);  
          })
}

function deleteTodo (id) {
  const access_token = localStorage.getItem('access_token')

  return promiseAjax(SERVER + '/todos/' + id, 'DELETE', { access_token }, null)
          .then(response => {
            console.log(response);
            fetchTodo()
            $('#todo').show()
            $('#todo-form').show()
            $('#todo-detail').hide()
          })
          .catch(err => {
            console.log(err);
            
          })
}
function edit(id) {

  $('#todo').hide()
  $('#todo-form').hide()
  $('#todo-detail').hide()

  const access_token = localStorage.getItem('access_token')
  return promiseAjax(`${SERVER}/todos/${id}`, 'GET', { access_token }, null)
  .then(({todo}) => {
    $('#editPage').append(`
    <form id="todo-form" class="mt-2">
      <div class="todo-content">
        <input 
          type="text" 
          id="edit-todo" 
          value='${todo.title}' 
          class="form-control"/>
        <div class="mt-3"> 
          <textarea 
            id="edit-description"
            rows="3"
            cols="44"
          > 
          ${todo.description}
          </textarea>
        </div>
      </div>
      <div>
        <input 
          type="date" 
          id="edit-date" 
          class="form-control"  
          value='${todo.display_date}'
          style="width:69%"
          />
      </div>
      <button 
        type="submit" 
        class="btn btn-primary 
        btn-color white" 
        style="width: 70%; 
        margin-top: 15px"
        onclick="submitEdit(event,${todo.id})"
      >
        SUBMIT
      </button>
    </form>
    `)
  })
}

function submitEdit (e, id) {
  e.preventDefault()
  const access_token = localStorage.getItem('access_token')
  const editTodo = $('#edit-todo').val()
  const editDescription = $('#edit-description').val()
  const editDate = $('#edit-date').val()
  console.log(editTodo, editDate, editDescription);
  const data = {
    title: editTodo,
    description: editDescription,
    due_date: editDate
  }
  return promiseAjax(`${SERVER}/todos/${id}`, 'PUT', { access_token }, data)
    .then(() => {
      fetchTodo()
      $('#todo').show()
      $('#todo-form').show()
      $('#todo-detail').hide()
      $('#editPage').hide()
    })
    .catch(err => {
      console.log(err);   
    })
}
function logOut(){

    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
    localStorage.removeItem('access_token')
    $('#home').hide()
    $('#login').show()
    $('#register').hide()

}





