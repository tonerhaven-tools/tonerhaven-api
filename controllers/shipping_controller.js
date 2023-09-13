const express = require("express");
const router = express.Router();
const Axios = require("axios");
const FedexModel = require("../models/shipping/fedex_model")

router.get("/fedex-estimate-cost", async (req, res) => {
  const fedex = new FedexModel(req,res);
  const token = await fedex.refresh_token();
  const headers = {
    "content-type": "application/json",
    "x-locale": "en_US",
    "authorization": `Bearer ${token.access_token}`
  }
  const body = {
    accountNumber: {
      value: "740561073"
    },
    requestedShipment: {
      shipper: {
        address: {
          city: "Medley",
          stateOrProvinceCode: "FL",
          postalCode: 33178,
          countryCode: "US"
        }
      },
      recipient: {
        address: {
          city: "Frisco",
          stateOrProvinceCode: "TX",
          postalCode: 75034,
          countryCode: "US"
        }
      },
      pickupType: "DROPOFF_AT_FEDEX_LOCATION",
      rateRequestType: [
        "ACCOUNT","LIST"
      ],
      requestedPackageLineItems: [
        {
          weight: {
            units: "LB",
            value: 10
          }
        }
      ]
    }
  }

  Axios.post(process.env.FEDEX_API_URL+'/rate/v1/rates/quotes',body,{headers}).then(e=>{
    return res.json(e.data);
  }).catch(error => {
    return res.json(error);
  });
});

module.exports = router;

