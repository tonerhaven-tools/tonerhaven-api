const Axios = require("axios")
const ModelBase = require("../base/model_base");
const moment = require('moment-timezone');
const DB = require("../../configs/database/DB");

class FedexModel extends ModelBase {
  date_format = 'MM/DD/YYYY hh:mm A';

  constructor(request, response) {
    super('shipping_tokens',request, response);
  }

  /**
   * Check if the last saved token in the database is valid
   **/
  async is_token_expired() {
    const token = await this.get_token();
    if (!token) {
      return true;
    }
    const date_now = moment().tz("America/New_York");
    return date_now.isAfter(moment(token.expires_stamp,this.date_format));
  }

  async get_token() {
    const result = await DB('th_shipping_tokens').where('courier_id', 2).orderBy('id','desc').first();
    if (typeof result == "undefined") {
      return false;
    } else {
      return result;
    }
  }

  /**
   * Refresh access_token if expired (1hrs expiry)
   * Also updates the th_shipping_token table with a new token
   **/
  async refresh_token() {
    //return await this.get_token();
    // Recreate token and insert to DB
    if (await this.is_token_expired()) {
      const body = new URLSearchParams();
      const headers = {"content-type": "application/x-www-form-urlencoded"}
      body.append('grant_type', 'client_credentials');
      body.append('client_id', process.env.FEDEX_API_KEY);
      body.append('client_secret', process.env.FEDEX_API_SECRET);
      const response = await Axios.post(process.env.FEDEX_API_URL+'/oauth/token', body, {headers});
      const expiry = moment().tz("America/New_York").clone().add(1,'hours').format(this.date_format);

      await this.table.insert({
        courier_id: 2,
        expires_stamp: expiry,
        access_token: response.data.access_token,
        token_type: response.data.token_type,
        expires_in: response.data.expires_in,
        scope: response.data.scope,
      });
      return await this.get_token();
    }

    // Just return the token from database
    else {
      return await this.get_token();
    }
  }
}
module.exports = FedexModel;
