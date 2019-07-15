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
        };

        const rates =  await rp(options);

        if(rates) {
          //store result from API to in memory
          await storage.updateRate(URI, rates);
          return rates;
        } else {
          return false;
        }

      }

    } catch(err) {
      throw new Error(err);
    }

  }  

};

module.exports = exchange;