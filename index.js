import ServerModel from './serverModel.js';

const express = require('express')
const path = require('path')
const url = require('url')
const PORT = process.env.PORT || 5000
const model = ServerModel();

express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.write('404'))
	.get('/getRate', (req, res) => {
		let q = url.parse(req.url, true);
		console.log(`Received request for ${q.pathname}`);
		let data = q.query;
		const rate = model.calculateRate(data);

		console.log(rate);

		res.render('pages/index');
	});
	.listen(PORT, () => console.log(`Listening on ${PORT}`))