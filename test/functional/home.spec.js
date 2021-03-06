const { test, trait, afterEach } = use ('Test/Suite')('Testando Users')

trait('Test/ApiClient')
trait('Auth/Client')

const User = use('App/Models/User')

afterEach(async()=>{
	await User.query().delete()
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

test('logando usuario', async({ client })=>{
	const response = await client.post('/user').send({
		username: 'Nilo',
		nickname:'Nileco',
		email:'nilo@email.com',
		password:'abc123',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	const login_response = await client.post('/login').send({
		email: 'nilo@email.com',
		password: 'abc123'
	}).end()
	login_response.assertStatus(200)
})

test('usuário consegue ver o próprio perfil', async({ client })=>{	
	const response = await client.post('/user').send({
		username: 'Nilo',
		nickname:'Nileco',
		email:'nilo@email.com',
		password:'abc123',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	await client.post('/user').send({
		username: 'Nilo2',
		nickname:'Nileco2',
		email:'nilo2@email.com',
		password:'abc1232',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	const user = await User.findBy("email", "nilo@email.com")
	const result = await client.get('profile/'+user.id).loginVia(user).send({
		email: 'nilo@email.com',
	}).end()
	result.assertStatus(200)
})

test('usuário não consegue pegar informações de outro perfil', async({ client })=>{	
	const response = await client.post('/user').send({
		username: 'Nilo',
		nickname:'Nileco',
		email:'nilo@email.com',
		password:'abc123',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	await client.post('/user').send({
		username: 'Nilo2',
		nickname:'Nileco2',
		email:'nilo2@email.com',
		password:'abc1232',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	const user = await User.findBy("email", "nilo@email.com")
	const result = await client.get('profile/'+user.id).loginVia(user).send({
		email: 'nilo2@email.com',
	}).end()
	result.assertStatus(200)
	result.assertJSONSubset(
		{
			status: 'Operação Inválida'
		}
	)
})
test('usuario cadastrado consegue criar um tópico', async({client})=>{	
	const response = await client.post('/user').send({
		username: 'Nilo',
		nickname:'Nileco',
		email:'nilo@email.com',
		password:'abc123',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	const user = await User.findBy("email", "nilo@email.com")
	const result = await client.post('/create/topic').loginVia(user).send({
		name: 'O que você acha do brasil?',
		message: 'Vivemos neste pais desde o nascimento e blablablablabla',
	}).end()
	result.assertStatus(200)
})
test('usuario sem login não consegue criar um tópico', async({client})=>{	
	const response = await client.post('/user').send({
		username: 'Nilo',
		nickname:'Nileco',
		email:'nilo@email.com',
		password:'abc123',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	const user = await User.findBy("email", "nilo@email.com")
	const result = await client.post('/create/topic').send({
		name: 'O que você acha do brasil?',
		message: 'Vivemos neste pais desde o nascimento e blablablablabla',
	}).end()
	result.assertStatus(401)
})

test('usuário logado pode responder a um tópico', async({client})=>{	
	const response = await client.post('/user').send({
		username: 'Nilo',
		nickname:'Nileco',
		email:'nilo@email.com',
		password:'abc123',
		image:'asdasdasdsa',
		description:'uma descrição aqui'
	}).end()
	const user = await User.findBy("email", "nilo@email.com")
	const result = await client.post('/create/answer').loginVia(user).send({
		message: 'eu concordo com o seu tópico!',
	}).end()
	result.assertStatus(200)
})

test('usuário deslogado não pode responder a um tópico', async({client})=>{	
	const result = await client.post('/create/answer').send({
		message: 'eu concordo com o seu tópico!',
	}).end()
	result.assertStatus(401)
})
