const SERVER = 'http://localhost:3000'

$(document).ready(function () {

  const access_token = localStorage.getItem('access_token')
  console.log(access_token);
  
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
              fetchTodo()
            })
            .catch(err => {
              console.log(err.responseJSON.error);
              $('#email-login').val("")
              $('#password-login').val("") 
            })
 
}

// REGISTER
function register (e) {
  e.preventDefault()
  const email = $('#email-register').val()
  const password = $('#password-register').val()

  return promiseAjax(SERVER + '/users/register','POST',null, { email, password })
            .then(response => {
              alert('register berhasil')
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
            
              $('#todo').append(`
             
              <div class="render-todo"> 
              <a onclick="detail(${element.id})">
                <div class="todo-content">
                  <p style="margin-left:2%;">${element.email}</p>
                  <h2 style="margin-left:2%;"><strong>${element.title}</strong></h2>
                  <p style="margin-left:2%;">${element.description}</p>
                  <div class="form-check">
                  <input class="form-check-input ml-1" type="checkbox" value="" id="defaultCheck1">
                  <label class="form-check-label ml-4 " for="defaultCheck1">
                    Done 
                  </label>
                </div>
                </div>                    
                <div class="todo-date">
                  <h2 style="margin-top:20%;">${element.due_date}</h2>
                </div>
                </a>
              </div>
              `)
            });
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
          alert('adding success')
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
            console.log(response, '<<<');
            $('#todo-detail').append(`
            <div class="render-todo"> 
           
              <div class="todo-content">
              <p style="margin-left:2%;">${response.todo.email}</p>
                <h2 style="margin-left:2%;"><strong>${response.todo.title}</strong></h2>
                <p style="margin-left:2%;">${response.todo.description}</p>
                <div class="form-check">
                <input class="form-check-input ml-1" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label ml-4 " for="defaultCheck1">
                  Done 
                </label>
              </div>
              </div>                    
              <div class="todo-date">
                <h3 style="margin-top:20%;">${response.todo.due_date}</h3>
                <div class="delete-edit mt-5">
                  <i class="far fa-edit" style="font-size:24px;color:rgb(29,161,242)"></i>
                  <i class="fas fa-trash-alt" style='font-size:24px;color:red'></i>
                </div>
              </div>
            </div>
            `)
            $('#todo').hide()
            $('#todo-form').hide()
          })
          .catch(err => {
            console.log(err);  
          })
}




