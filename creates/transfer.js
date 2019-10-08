const createTransfer = (z, bundle) => {
  const { seckey } = bundle.authData;
  const {
    account_bank,
    account_number,
    
    amount,
    narration,
    currency,
    reference,
    callback_url,
  } = bundle.inputData;

  const requestOptions = {
    method: 'POST',
    url: 'https://api.ravepay.co/v2/gpx/transfers/create',
    body: {
      seckey,
      account_bank,
      account_number,
      
      
      amount,
      narration,
      currency,
      reference,
      callback_url,
      reference: `${amount}${currency}${Date.now()}`,
    },
  };

  return z.request(requestOptions)
    .then((response) => {
        if (response.status !== 200) {
          throw new Error(`create a new transfer error: ${response.json.message}`);
        }
        return response.json.data;
    })
};

module.exports = {
  key: "create_transfer",
  noun: "Transfer",
  display: {
    label: "Create Transfer",
    description: "Creates a new transfer.",
    important: true
  },
  operation: {
    inputFields: [
      // {
      //   key: "country",
      //   required: true,
      //   helpText: "This is the country of the recipient bank",
      //   label: "Country",
      //   dynamic: "country.Code.Name"
      // },
      {
        key: "account_bank",
        required: true,
        type: "string",
        helpText: "This is the recipient bank code e.g Access Bank-044",
        label: "Bank Code",
        // dynamic: "bank.Code.Name"
      },
      {
        key: "bank_Name",
        required: true,
        type: "string",
        helpText: "This is the recipient bank name e.g: Access Bank",
        label: "Bank Name",
        // dynamic: "bank.Code.Name"
      },
      {
        key: "account_number",
        type: "string",
        required: true,
        helpText:
          "This is the recipient account number, for mpesa and ghana mobile money please add the recipient's phone number including the country code e.g. 233567394737, 25493743988",
        label: "Account number"
      },
      {
        key: "amount",
        type: "number",
        required: true,
        label: "Amount"
      },
      {
        key: "currency",
        type: "string",
        required: true,
        label: "Currency",
        choices: {
          NGN: "Naira",
          KES: "Kenyan Shillings",
          GHS: "Ghanian cedis",
          UGX: "Ugandan shillings",
          TZS: "Tanzania shillings"
        }
      },
      {
        key: "narration",
        type: "string",
        required: true,
        label: "Narration"
      },
      {
        key: "callback_url",
        type: "string",
        helpText:
          "This is a url you provide so we can notify you when the transfer is completed, you can pass this in place of using [webhooks](https://developer.flutterwave.com/v2.0/reference#how-transfers-work)",
        label: "Callback URL"
      }
    ],
    perform: createTransfer,
    sample: {
      // status: "success",
      // message: "TRANSFER-CREATED",
      // data:
      
      //  {
        id: 1234,
        account_number: "1234567890",
        bank_code: "044",
        fullname: "Johnny Kramer",
        date_created: "2018-08-10T12:21:13.000Z",
        currency: "NGN",
        amount: "123",
        fee: 45,
        status: "NEW",
        reference: "12345678",
        meta: null,
        complete_message: "",
        requires_approval: 0,
        is_approved: 1,
        bank_name: "ACCESS BANK NIGERIA"
      // }
    },
    outputFields: [{ key: "data", label: "Transfer data" }]
  }
};
