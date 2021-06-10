const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

// import cac models
require('./models/User');
require('./models/Word');
// connect mongodb
mongoose.connect(process.env.MONGODB_URI || '', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('Connected to mongo');
});

mongoose.connection.on('error', error => {
	console.log('Connect to mongo error', error);
});

const app = express();

app.use(express.json());

app.all('/*', function(req, res, next) {
	// CORS headers
	res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header(
		'Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization', 
	);
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

const api = require('./routes');
// import cac routes
const useApi = (object, object2, prefix = []) => {
	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			const element = object[key];
			if (typeof element === 'object') {
				useApi(element, object2, [...prefix, `${key}`])
			} else {
				let x = object2;
				[...prefix, `${key}`].forEach(y => {x = x[y]});
				app.use(x);
			}
		}
	}
};

useApi(api, api);

app.listen(process.env.PORT || 3001);
