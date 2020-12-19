'use strict'
const Post = use('App/Models/Post')
class PostController {
	async create({request, auth}){
		try{
			await auth.getUser()			
			const data = request.only(['name', 'message', 'email'])
			const post = await Post.create(data) 
		}catch{
			return response.status(401)
		}
		return post
	}
}

module.exports = PostController
