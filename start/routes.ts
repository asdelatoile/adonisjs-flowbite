/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
// import { schema } from '@ioc:Adonis/Core/Validator'
// import User from 'App/Models/User'


Route.group(() => {
  Route.resource('permissions', 'PermissionController').as('permissions')
}).prefix('/admin').middleware('auth');


Route.get('/login', 'AuthController.login');
Route.post('/login', 'AuthController.authenticate');

// Route.get('/', async ({ auth, bouncer, view }) => {
//   return view.render('welcome')
// })

// Route.get('/login', async ({ auth, bouncer, view }) => {
//   return view.render('login')
// })

// Route.post('login', async ({ auth, request, response, session }) => {

//   await request.validate({
//     schema: schema.create({
//       email: schema.string(),
//       password: schema.string(),
//     }),
//     messages: {
//       required: 'The {{ field }} is required',
//     }
//   })

//   const email = request.input('email')
//   const password = request.input('password')

//   try {
//     await auth.use('web').attempt(email, password)
//     session.flash('success', 'Login ok !')
//     response.redirect().back()
//   } catch {
//     session.flash('error', 'Login KO !')
//     response.redirect().back()
//   }
// })