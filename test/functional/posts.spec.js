const { test, trait, afterEach } = use ('Test/Suite')('Testando Posts')
// add um comentario
trait('Test/ApiClient')
trait('Auth/Client')

const Post = use('App/Models/Post')
const User = use('App/Models/User')

test('retornar todos os posts', async({client})=>{
	const result = await client.post('/create/topic').send({
		name: 'Anime, DC ou Marvel?',
		message: 'E aí? Qual desses vocês preferem?',
	}).end()
	const response = await client.get('posts').end() 	
	response.assertStatus(200)
})
