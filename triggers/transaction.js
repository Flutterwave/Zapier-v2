const listTransactions = (z, bundle) => {
  const requestOptions = {
    method: 'POST',
    url: 'https://api.ravepay.co/v2/gpx/transactions/query',
    body: { seckey: bundle.authData.seckey, status: bundle.inputData.status },
  };

  return z.request(requestOptions)
    .then((response) => {
        if (response.status !== 200) {
          throw new Error(`unable to retrieve new transactions because: ${response.json.message}`);
        }
        return response.json.data.transactions;
    });
};

module.exports = {
  key: 'transaction',
  noun: 'Transaction',
  display: {
    label: 'New Transaction',
    description: 'Triggers when a new transaction is added.',
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
    perform: listTransactions,
    sample: {
      id: 12345,
      transaction_reference: 'CASHOFFLINE-12345',
      processor_reference: '12345-134',
      device_fingerprint: 'N/A',
      transaction_cycle: 'one-time',
      amount: 5000,
      currency: 'NGN',
      amount_charged: 5000,
      rave_fee: 0,
      merchant_fee: 0,
      merchant_bore_fee: 0,
      processor_response_code: '00',
      processor_response_message: null,
      auth_model: 'cashoffline',
      customer_ip: '123.123.123.123',
      narration: 'CASHOFFLINE TX 12345',
      status: 'successful',
      processor_verification_url: 'N/A',
      processor_vbv_response_code: 'N/A',
      processor_vbv_response_message: 'N/A',
      processor_acct_response_code: '00',
      processor_acct_response_message: 'successful',
      payment_entity: 'cash-offline',
      payment_entity_id: 1,
      fraud_status: 'ok',
      date_created: '2018-08-10T10:20:10.000Z',
      unique_reference: null,
      has_events: 'fed3a923c72b2d23dfa230151g23f189',
      amount_due_merchant: 2,
      customer: {
        id: 1234,
        customer_email: 'r12345@rave134dm.com',
        customer_phonenumber: null,
        customer_fullname: 'Johnny Kramer',
        date_created: '2018-08-10T10:20:10.000Z',
      },
      merchant: {
        id: 123,
        business_name: 'FearMer',
        country: 'NG',
        contact_person: 'Desola Ade',
      },
    },
    outputFields: [
      { key: 'amount', label: 'Amount' },
      { key: 'currency', label: 'Currency' },
      { key: 'rave_fee', label: 'Rave fee' },
      { key: 'merchant_fee', label: 'Merchant fee' },
      { key: 'narration', label: 'Narration' },
      { key: 'status', label: 'Status' },
      { key: 'date_created', label: 'Date created' },
      { key: 'customer', label: 'Customer' },
      { key: 'merchant', label: 'Merchant' },
    ],
  },
};
