**FANCY TODO**

----

```
 Manage All about todo
  - Create new todo
  - Show All todo
  - Update data todo
  - Delete data todo
```
  
* **RESTful API end point**

```
    POST   /todos
    GET    /todos
    GET    /todos/:id
    PUT    /todos/:id
    PATCH  /todos/:id
    DELETE /todos/:id
```


1. POST  `/todos`

    `Creating new todo`
  
* **URL**

  `/todos`

* **Method:**
  
   `POST`
  
* **Data Body**

  * **Endpoint ini akan menerima request body:**
  ```
    title, 
    description, 
    status, 
    due_date
  ```

  Request Body
    ```JSON
    {
      "title" : "Learn REST API",
      "description": "Learn to How create API",
      "status" : "undone",
      "due_date": "2020-01-29"
    }
    ```
 
* **Success Response:**

  
  * **Code:** 201 <br />
  * **Response:** 
  ```JSON
    {
      "id" : 1,
      "title" : "Learn REST API",
      "description": "Learn to How create API",
      "status" : "undone",
      "due_date": "2020-01-29",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:30:28.044Z"
    }
  ```
 
* **Error Response:**

    get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

2. GET  `/todos`

    `Get All data todo`

* **URL**

  `/todos`

* **Method:**
  
   `GET`
  
* **Data Body**

  `none`
 
* **Success Response:**

  
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    [
      {
      "id" : 1,
      "title" : "Learn REST API",
      "description": "Learn to How create API",
      "status" : "undone",
      "due_date": "2020-01-29",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:30:28.044Z"
      }
    ]
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

3. GET   `/todos/:id`

    `Show data todo by id`
* **URL**

  `/todos/:id`

* **Method:**
  
   `GET`
  
* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`


* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "id" : 1,
      "title" : "Learn REST API",
      "description": "Learn to How create API",
      "status" : "undone",
      "due_date": "2020-01-29",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:30:28.044Z"
    }
  ```
 
* **Error Response:**

  get failed because server error
    * **Code:** 500 Internal server error <br />

4. PUT `/todos/:id`

    `Update All data todo by id`
* **URL**

  `/todos/:id`

* **Method:**
  
   `PUT`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`

* **Data Body**

  * **Endpoint ini akan menerima request body:**
  ```
    title, 
    description, 
    status, 
    due_date
  ```

  Request Body
    ```JSON
    {
      "title" : "Learn Vue JS",
      "description": "Learn to Using Vue",
      "status" : "done",
      "due_date": "2020-01-30"
    }
    ```
 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "title" : "Learn Vue JS",
      "description": "Learn to Using Vue",
      "status" : "done",
      "due_date": "2020-01-29",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:31:28.044Z"
    }
  ```
 
* **Error Response:**

  get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed response because  data todo not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />

5. PATCH  `/todos/id`

    `Update one data in todo by id`
* **URL**

  `/todos/:id`

* **Method:**
  
   `PATCH`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`

* **Data Body**

  * **Endpoint ini akan menerima request body:**

    `status`

  Request Body
    ```JSON
    {
      "status" : "undone", 
    }
    ```
 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "title" : "Learn Vue JS",
      "description": "Learn to Using Vue",
      "status" : "undone",
      "due_date": "2020-01-29",
      "createdAt": "2020-10-26T12:30:28.044Z",
      "UpdatedAt":  "2020-10-26T12:31:28.044Z"
    }
  ```
 
* **Error Response:**

  get failed response because the validation not fulfill

  * **Code:** 400 Bad Request  <br />
    **Content:** `{ message : "message about validation error" }`

  get failed response because  data todo not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />


6. DELETE  `/todos/:id`

    `DELETE data todo by id`
* **URL**

  `/todos/:id`

* **Method:**
  
   `DELETE`

* **Data Params**

  * **Endpoint ini akan menerima request params:**

    `id`

 
* **Success Response:**
  * **Code:** 200 <br />
  * **Response:** 
  ```JSON
    {
      "message" : "todo success delete"
    }
  ```
 
* **Error Response:**


  get failed response because  data todo not found

  * **Code:** 404 Not Found  <br />
    **Content:** `{ message : "data not found" }`

  get failed because server error
    * **Code:** 500 Internal server error <br />








