'use strict'
const  User = use('App/Models/User')
class UserController {
	async create({request}){
		const { username, email, password, image, description, nickname } = request.all()
		const data = request.only(['username', 'email', 'password', 'image', 'description', 'nickname'])
		const user = await User.create(data)
		return user
	}	
}

module.exports = UserController
