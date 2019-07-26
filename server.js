const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const serviceAccount = require("./serviceAccountKey.json");

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://testejoao-fab91.firebaseio.com/'
});

const db = admin.database();
const ref = db.ref('emails')
var exists = false;

app.post('/assinar', async (req, res) => {
	const { email } = req.body;
	const emails = {};
	let exists = false;
	

	ref.on('value', snapshot => {
		snapshot.forEach(key => {
			// exists = true
			if (key.val() == email) {
				exists = true;
				return true;
			}
		});
	}, error => {
		console.log(error);
	})


	console.log(exists);
	if (exists) {

		res.send('Email já cadastrado!');
	} else {
		const NewRandomRef = ref.push();
		try {
			await NewRandomRef.set(email);
			res.send('email recebido');
		} catch (error) {
			console.log(error);
			res.send('Algo deu errado')
		}
	}

})

const PORT  = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`servidor iniciado na porta ${PORT}`));
