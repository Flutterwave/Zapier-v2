const listTransfers = (z, bundle) => {
  const requestOptions = {
    method: 'GET',
    url: 'https://api.ravepay.co/v2/gpx/transfers',
    params: { seckey: bundle.authData.seckey, status: bundle.inputData.status },
  };

  return z.request(requestOptions)
    .then((response) => {
        if (response.status !== 200) {
          throw new Error(`unable to retrieve new transfers because: ${response.json.message}`);
        }
        return response.json.data.transfers;
    });
};

module.exports = {
  key: 'transfer',
  noun: 'Transfer',
  display: {
    label: 'New Transfer',
    description: 'Triggers when a new transfer is added.',
    important: true,
  },
  operation: {
    inputFields: [
      {
        key: 'status',
        required: true,
        choices: {successful: 'Successful', failed: 'Failed'}
      }
    ],
    perform: listTransfers,
    sample: {
      // id: 1234,
      // account_number: '1234567890',
      // bank_code: '044',
      // fullname: 'Johnny Kramer',
      // date_created: '2018-08-09T11:32:05.000Z',
      // currency: 'NGN',
      // debit_currency: null,
      // amount: 1,
      // fee: 45,
      // status: 'FAILED',
      // reference: '12345678',
      // meta: null,
      // narration: null,
      // approver: null,
      // complete_message: 'DISBURSE FAILED: An error has occurred.',
      // requires_approval: 0,
      // is_approved: 1,
      // bank_name: 'ACCESS BANK NIGERIA',


      
        id: 30487,
        account_number: '2003024',
        bank_code: "wallet",
        fullname: "Fincode",
        date_created: "2020-03-16T19:21:08.000Z",
        currency: "NGN",
        debit_currency: "NGN",
        amount: 20000,
        fee: 0,
        status: "SUCCESSFUL",
        reference: "TRF-363834833883",
        meta: {
          wallet_email: "ravesb_8f90354d001efec04215_aiyeniko.moyinoluwa@fincode.co.uk",
          AccountId: 84096,
          merchant_id: "4049338"
        },
        narration: null,
        approver: null,
        complete_message: "Transfer was successful",
        requires_approval: 0,
        is_approved: 1,
        bank_name: "FA-BANK"
      },
    
    // outputFields: [
    //   { key: 'id', label: 'ID', type: 'integer'},
    //   { key: 'account_number', label: 'Account number' },
    //   { key: 'bank_code', label: 'Bank code' },
    //   { key: 'fullname', label: 'Fullname' },
    //   { key: 'date_created', label: 'Date created' },
    //   { key: 'currency', label: 'Currency' },
    //   { key: 'debit_currency', label: 'Debit currency' },
    //   { key: 'amount', label: 'Amount' , type: 'integer'},
    //   { key: 'fee', label: 'Fee', type: 'integer' },
    //   { key: 'status', label: 'Status' },
    //   { key: 'reference', label: 'Reference' },
    //   { key: 'meta', label: 'Meta' , type:'object'},
    //   { key: 'narration', label: 'Narration' },
    //   { key: 'approver', label: 'Approver' },
    //   { key: 'complete_message', label: 'Complete message' },
    //   { key: 'requires_approval', label: 'Requires approval' , type: 'integer'},
    //   { key: 'is_approved', label: 'Is approved', type: 'integer' },
    //   { key: 'bank_name', label: 'Bank name' },
    // ],
  },
};
