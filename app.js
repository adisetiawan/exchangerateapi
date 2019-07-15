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
    if(req.query.currency) {
    	result = await exchange.getRate(req.query.currency);
    } else {
    	result = await exchange.getRate();
    }
    
    res.json(JSON.parse(result));

});

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});