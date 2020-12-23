'use strict'

const Answer = use('App/Models/Answer')

class AnswerController {
	async create({request, auth}){
		try{
			await auth.check()
			const {message} = request.only('message')
			return message
		}catch{
			return {status: 'Ação Inválida'}
		}
	}
}

module.exports = AnswerController
