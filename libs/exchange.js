require('dotenv').config();
const rp = require('request-promise-native');
const storage = require('./storage');

const exchange = {
  getRate :  async function(currency) {
    
    try {
      
      let URI = process.env.OPENEX_URL + 'latest.json?app_id=' + process.env.OPENEX_APPID
      if(currency) {
        URI += '&base=' + currency;
      }

      //check if there's in-memory result
      const localRate = await storage.getRate(URI);
      //get from in memory instead
      if(localRate) {
        return localRate;
      
      } else {

        var options = {
          method: 'GET',
          uri: URI,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'               
          },
          resolveWithFullResponse: true,
        };

        const response =  await rp(options);

        return response.body;

      }

    } catch(err) {
      throw new Error(err);
    }

  },
  getCurrency :  async function() {
    
    try {
      
      let URI = process.env.OPENEX_URL + 'currencies.json?app_id=' + process.env.OPENEX_APPID

      //check if there's in-memory result
      const localRate = await storage.getRate(URI);
      //get from in memory instead
      if(localRate) {
        return localRate;
      
      } else {

        var options = {
          method: 'GET',
          uri: URI,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'               
          },
          resolveWithFullResponse: true,
        };

        const response =  await rp(options);

        if(response.statusCode == 200) {
          //store result from API to in memory
          await storage.updateRate(URI, response.body);
          return response.body;
        } else {
          return false;
        }

      }

    } catch(err) {
      throw new Error(err);
    }

  },
  isValidCurrency : async function(currency) {
    
    try {
      const currencies = await this.getCurrency();
      if(currencies.hasOwnProperty(currency)) {
        return true;
      } else {
        return false;
      }

    } catch(err) {
      throw new Error(err);
    }

  },

};

module.exports = exchange;