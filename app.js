require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(helmet());
app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const exchange = require("./libs/exchange");

//API homepage
app.get('/', function (req, res) {
    res.json({msg : 'Hourly updated open exchange rate information'});
});

app.get('/current_rates', async function (req, res) {
    
	let result;
    if(req.query.currency != '') {
    	let isValid = await exchange.isValidCurrency(req.query.currency);
    	//check if valid 
    	if(isValid) {
    		result = await exchange.getRate(req.query.currency);
    	} else {
    		res.json({msg: 'invalid currency'});
    	}
    } else {
    	result = await exchange.getRate();
    }
    
    res.json(JSON.parse(result));

});

app.get('/currency', async function (req, res) {
    
	let result = await exchange.getCurrency();
    res.json(JSON.parse(result));

});

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});