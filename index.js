const express = require('express')
const path = require('path')
const url = require('url')
const PORT = process.env.PORT || 5000

const postage =  {
	'letters-stamped' : {
		'1' : '0.55',
		'2' : '0.70',
		'3' : '0.85',
		'3.5' : '1.00'
	},
	'letters-metered' : {
		'1' : '0.50',
		'2' : '0.65',
		'3' : '0.80',
		'3.5' : '0.95'
	},
	'large-envelopes-flats' : {
		'1' : '1.00',
		'2' : '1.20',
		'3' : '1.40',
		'4' : '1.60',
		'5' : '1.80',
		'6' : '2.00',
		'7' : '2.20',
		'8' : '2.40',
		'9' : '2.60',
		'10' : '2.80',
		'11' : '3.00',
		'12' : '3.20',
		'13' : '3.40'
	},
	'parcels-oz' : {
		'1' : '3.80',
		'2' : '3.80',
		'3' : '3.80',
		'4' : '3.80',
		'5' : '4.60',
		'6' : '4.60',
		'7' : '4.60',
		'8' : '4.60',
		'9' : '5.30',
		'10' : '5.30',
		'11' : '5.30',
		'12' : '5.30',
		'13' : '5.90'
	}
};

function calculateRate(data) {
	const weight = data.weight;
	const type = data.type;
	const rate = postage[data.type][data.weight];
	if (rate === undefined) {
		return 'Error: Something went wrong';
	}
	return rate;
}


express()
	.use(express.static(path.join(__dirname, 'public')))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.get('/', (req, res) => res.write('404'))
	.get('/getRate', (req, res) => {
		let q = url.parse(req.url, true);
		console.log(`Received request for ${q.pathname}`);
		let data = q.query;
		const rate = calculateRate(data);

		console.log(rate);

		res.render('pages/index', {
			weight: data.weight,
			type: data.type,
			rate: rate
		});
	})
	.listen(PORT, () => console.log(`Listening on ${PORT}`))

