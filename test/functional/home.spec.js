const { test, trait } = use ('Test/Suite')('Get')

trait('Test/ApiClient')

test('testando a rota / com o get', async({ client })=>{
	const response = await client.get('/').end()
	response.assertStatus(200)
})

test('cadastrando usuario', async({ client })=>{
	const response = await client.post('/user').send({
		username: 'Nilo',
		nickname:'Nileco',
		email:'nilo@email.com',
		password:'1234',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	response.assertStatus(200)
})
