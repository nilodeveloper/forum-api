'use strict'
const Post = use('App/Models/Post')
class PostController {
	async create({request, auth}){
		try{
			await auth.check()
			const user = await auth.getUser()			
			const email = user.email			
			let data = request.only(['name', 'message'])
			data.email = email
			const post = await Post.create(data) 
			return post
		}catch{
			return response.status(401)
		}
	}
	async show(){
		const post = await Post.all()
		return post
	}
}

module.exports = PostController
