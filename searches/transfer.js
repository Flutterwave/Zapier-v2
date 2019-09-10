const searchTransfer = (z, bundle) => {
  const {
    seckey
  } = bundle.authData;
  const {
    reference
  } = bundle.inputData;
  const params = {
    seckey
  };
  const requestOptions = {
    method: 'GET',
    url: 'https://api.ravepay.co/v2/gpx/transfers',
    params,
  };

  return z.request(requestOptions)
    .then((response) => {
      if (response.status !== 200) {
        return [];
      } else if (response.json.data.code === " ") {
        return [];
      }
      return response.json.data.transfers;
    });
};

module.exports = {
  key: 'search_transfer',
  noun: 'Find Transfer',
  display: {
    label: 'Find Transfer',
    description: 'Find a transfer by the transfer reference.',
    important: true,
  },
  operation: {
    inputFields: [{
        key: 'reference',
        type: 'string',
        helpText: 'This is the unique transfer reference you generated for the transfer on Rave.',
        label: 'Transfer Reference',
        required: true,
      }

    ],
    perform: searchTransfer,
    sample: {
      id: 1234,
      account_number: '1234567890',
      bank_code: '044',
      fullname: 'Johnny Kramer',
      date_created: '2018-08-09T11:32:05.000Z',
      currency: 'NGN',
      debit_currency: null,
      amount: 1,
      fee: 45,
      status: 'FAILED',
      reference: '12345678',
      meta: null,
      narration: null,
      approver: null,
      complete_message: 'DISBURSE FAILED: An error has occurred.',
      requires_approval: 0,
      is_approved: 1,
      bank_name: 'ACCESS BANK NIGERIA',
    },
    outputFields: [{
        key: 'id',
        label: 'ID'
      },
      {
        key: 'account_number',
        label: 'account_number'
      },
      {
        key: 'bank_code',
        label: 'bank_code'
      },
      {
        key: 'fullname',
        label: 'fullname'
      },
      {
        key: 'currency',
        label: 'currency'
      },
      {
        key: 'amount',
        label: 'amount'
      },
      {
        key: 'fee',
        label: 'fee'
      },
      {
        key: 'status',
        label: 'status'
      },
      {
        key: 'reference',
        label: 'reference'
      },
      {
        key: 'narration',
        label: 'narration'
      },
      {
        key: 'complete_message',
        label: 'complete_message'
      },
      {
        key: 'bank_name',
        label: 'bank_name'
      },
    ],
  },
};