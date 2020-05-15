const express= require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(bodyParser.json())
app.use(cors())

const db = {
	users: [
	{
		id:'123',
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()
	},
	{
		id:'124',
		name: 'Sally',
		email: 'Sally@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()
	}
	],
	login: [
	{
		id: '987',
		hash: '',
		email: 'john@gmail.com'
	}
	]
}

app.get('/', (req, res)=>{
	res.send(db.users);
})

app.post('/', (req, res)=>{
	res.send(db.users);
})

app.post('/signin', (req, res)=>{
	// bcrypt.compare("apples", '$2a$10$LcPiAguv1VbVCeLKMfYLnePowu9MAMz/8Qb5eXnHsvi3wPLHgHbDu', function(err, res) {
 //    	console.log('right one ',res)
	// });

	// bcrypt.compare("veggies", '$2a$10$LcPiAguv1VbVCeLKMfYLnePowu9MAMz/8Qb5eXnHsvi3wPLHgHbDu', function(err, res) {
 //    	console.log('wrong one ',res)
	// });
	if (req.body.email === db.users[0].email &&
		req.body.password === db.users[0].password) {
		res.json(db.users[0])
	}else{
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res)=>{
	const {email, name, password} = req.body;
	// bcrypt.hash(password, null, null, function(err, hash) {
 //    	console.log(hash);
	// });
	db.users.push({
		id:'125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(db.users[db.users.length-1]);
})

app.get('/profile/:id', (req, res)=>{
	const {id} = req.params;
	var found = false;
	db.users.forEach(user => {
		if (user.id === id) {
			found = true;
		    return res.json(user);
		}
	})
	if(!found){
			res.status(404).send('user not found')
		}
})

app.put('/image', (req, res)=>{
	//const {id} = req.body.id;
	console.log(db.users[0].entries)
	let found = false;
	//console.log(id)
	// console.log(req.body)
	// console.log(req.body.id)
	// console.log(typeof req.body.id)
	// console.log(req.body.email)
	db.users.forEach(user => {
		if (req.body.id===user.id) {
			found = true;
			user.entries ++
		    return res.json(user.entries);
		}	
	})
	if(!found){
			res.status(404).json('user not found')
		}
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(1809, ()=>{
	console.log('app is running on port 1809');
})


/*
res = this is worin
/signin --> post = success/fail
/register -> post = user
/profile/:userId --> get = user
/image --> put -->
*/