'use strict'
const  User = use('App/Models/User')
class UserController {
	async create({request}){
		const { username, email, password, image, description, nickname } = request.all()
		const data = request.only(['username', 'email', 'password', 'image', 'description', 'nickname'])
		const user = await User.create(data)
		return user
	}	

  async login ({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }

	async show({response, request, auth}){
		try{
			await auth.check()
			const user = await auth.getUser()
			if(user.email == request.only('email').email)
				return await auth.getUser()
			else			
				return {status: 'Operação Inválida'}
		}catch(e){
			return response.status(401)
		}
	}
}

module.exports = UserController
