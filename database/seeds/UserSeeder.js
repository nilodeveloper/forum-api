'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
class UserSeeder {
  async run () {
		await User.create({
			username: "Nilo",
			password: "abc123",
			email: "nilopaiva@email.com"
		})
		await User.create({
			username: "MariaClementina",
			password: "abc123",
			email: "mariaclementina@email.com"
		})
  }
}

module.exports = UserSeeder
