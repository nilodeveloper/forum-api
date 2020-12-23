'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.post('login', 'UserController.login')
Route.get('users/:email', 'UserController.show').middleware('auth')
Route.get('profile/:email', 'UserController.show').middleware('auth')
Route.post('/user', 'UserController.create')
Route.post('/create/topic', 'PostController.create').middleware('auth')
Route.post('/create/answer', 'AnswerController.create').middleware('auth')
Route.get('/posts', 'PostController.show')
