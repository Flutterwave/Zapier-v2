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
    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'account_number', label: 'Account number' },
      { key: 'bank_code', label: 'Bank code' },
      { key: 'fullname', label: 'Fullname' },
      { key: 'date_created', label: 'Date created' },
      { key: 'currency', label: 'Currency' },
      { key: 'debit_currency', label: 'Debit currency' },
      { key: 'amount', label: 'Amount' },
      { key: 'fee', label: 'Fee' },
      { key: 'status', label: 'Status' },
      { key: 'reference', label: 'Reference' },
      { key: 'meta', label: 'Meta' },
      { key: 'narration', label: 'Narration' },
      { key: 'approver', label: 'Approver' },
      { key: 'complete_message', label: 'Complete message' },
      { key: 'requires_approval', label: 'Requires approval' },
      { key: 'is_approved', label: 'Is approved' },
      { key: 'bank_name', label: 'Bank name' },
    ],
  },
};
