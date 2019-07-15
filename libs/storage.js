require('dotenv').config();
let Keyv = require('keyv');

const keyv = new Keyv();
keyv.on('error', (err) => { throw new Error(err) } );

const storage = {
  getRate :  async function(uri) {
    return await keyv.get(uri);
  },
  updateRate :  async function(uri, result) {
    return await keyv.set(uri, result, process.env.EXPIRE); // 1 hour

  },
  getCurrency :  async function() {
    return await keyv.get('currency');
  },
  updateCurrency :  async function(currency) {
    return await keyv.set('currency', currency); // never expires

  },

};

module.exports = storage;