const searchTransaction = (z, bundle) => {
  const SECKEY  = bundle.authData.seckey;
  const {
    txref,
    flwref,
  } = bundle.inputData;

  const body =  { SECKEY } ;

  if (txref) body.txref = bundle.inputData.txref;
  if (flwref) body.flwref = bundle.inputData.flwref;

  const requestOptions = {
    method: 'POST',
    url: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/verify',
    body,
  };

  return z.request(requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        return [];
      } 
      else if(response.json.data.code ===  'NO_TX') {
        return [];
      }
      const apiResponse = [response.json.data];
      return apiResponse;
    });
};

module.exports = {
  key: 'search_transaction',
  noun: 'Find Transaction',
  display: {
    label: 'Find Transaction',
    description: 'Find a transaction by the transaction id or payment reference.',
    important: true,
  },
  operation: {
    inputFields: [
      
      {
        key: 'txref',
        type: 'string',
        helpText: 'This is the merchant unique reference displayed as Transaction ID on your rave dashboard.',
        label: 'Transaction ID',
      },
      {
        key: 'flwref',
        type: 'string',
        helpText: 'This is the payment gateway reference displayed as Payment reference on your rave dashboard.',
        label: 'Payment Reference',
      },
    ],
    perform: searchTransaction,
    sample: {
      "txid": 157524,
      "txref": "Rave-Pages655350753556",
      "flwref": "FLWACHMOCK-1527583529027",
      "devicefingerprint": "532b4e9fa7695279392f4780b9868b9b",
      "cycle": "one-time",
      "amount": 700,
      "currency": "NGN",
      "chargedamount": 700,
      "appfee": 0,
      "merchantfee": 0,
      "merchantbearsfee": 1,
      "chargecode": "00",
      "chargemessage": "Approved. Successful.",
      "authmodel": "AUTH",
      "ip": "41.190.30.27",
      "narration": "Synergy Group",
      "status": "successful",
      "vbvcode": "N/A",
      "vbvmessage": "N/A",
      "authurl": "NO-URL",
      "acctcode": null,
      "acctmessage": null,
      "paymenttype": "account",
      "paymentid": "478",
      "fraudstatus": "ok",
      "chargetype": "normal",
      "createdday": 2,
      "createddayname": "TUESDAY",
      "createdweek": 22,
      "createdmonth": 4,
      "createdmonthname": "MAY",
      "createdquarter": 2,
      "createdyear": 2018,
      "createdyearisleap": false,
      "createddayispublicholiday": 0,
      "createdhour": 8,
      "createdminute": 45,
      "createdpmam": "am",
      "created": "2018-05-29T08:45:26.000Z",
      "customerid": 29378,
      "custphone": "N/A",
      "custnetworkprovider": "UNKNOWN PROVIDER",
      "custname": "Temi Adesina",
      "custemail": "temiloluwa_adesina@yahoo.com",
      "custemailprovider": "YAHOO",
      "custcreated": "2018-05-29T08:45:26.000Z",
      "accountid": 134,
      "acctbusinessname": "Synergy Group",
      "acctcontactperson": "Desola Ade",
      "acctcountry": "NG",
      "acctbearsfeeattransactiontime": 1,
      "acctparent": 1,
      "acctvpcmerchant": "N/A",
      "acctalias": "temi",
      "acctisliveapproved": 0,
      "orderref": "URF_1527583526904_2107135",
      "paymentplan": null,
      "paymentpage": null,
      "raveref": "RV315275835263042C559EA650",
      "amountsettledforthistransaction": 700,
      "account": {
        "id": 478,
        "account_number": "0690000037",
        "account_bank": "044",
        "first_name": "Dele Moruf",
        "last_name": "Quadri",
        "account_is_blacklisted": 0,
        "createdAt": "2018-04-05T13:30:04.000Z",
        "updatedAt": "2018-06-01T06:03:41.000Z",
        "deletedAt": null,
        "account_token": {
          "token": "flw-t0cd8f7ac849807c50-k3n-mock"
        }
      },
      "meta": [
        {
          "id": 30106,
          "metaname": "Book ID",
          "metavalue": "hsjsjsj",
          "createdAt": "2018-05-29T08:45:26.000Z",
          "updatedAt": "2018-05-29T08:45:26.000Z",
          "deletedAt": null,
          "getpaidTransactionId": 157524
        }
      ],
    },
    outputFields: [
      { key: 'amount', label: 'Amount' },
      { key: 'currency', label: 'Currency' },
      { key: 'appfee', label: 'Rave fee' },
      { key: 'merchantfee', label: 'Merchant fee' },
      { key: 'narration', label: 'Narration' },
      { key: 'status', label: 'Status' },
      { key: 'created', label: 'Date created' },
      { key: 'customer', label: 'Customer' },
    ],
  },
};
