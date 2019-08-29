const listSubscriptions = (z, bundle) => {
  const requestOptions = {
    method: 'GET',
    url: 'https://api.ravepay.co/v2/gpx/subscriptions/query',
    params: { seckey: bundle.authData.seckey },
  };

  return z.request(requestOptions)
    .then((response) => {
        if (response.status !== 200) {
          throw new Error(`unable to get a new subscription: ${response.json.message}`);
        }
  
        return response.json.data.plansubscriptions;
    });
};

module.exports = {
  key: 'subscription',
  noun: 'Subscription',
  display: {
    label: 'New Subscription',
    description: 'Triggers when a new subscription is added.',
    important: true,
  },
  operation: {
    inputFields: [],
    perform: listSubscriptions,
    sample: {
      id: 1234,
      amount: 3000,
      stop_date: null,
      next_due: null,
      customer: {
        id: 12345,
        customer_email: 'test@example.com',
      },
      plan: 123,
      status: 'active',
      date_created: '2018-07-23T12:50:20.000Z',
    },
    outputFields: [
      { key: 'id', label: 'ID' },
      { key: 'amount', label: 'Amount' },
      { key: 'stop_date', label: 'Stop date' },
      { key: 'next_due', label: 'Next due' },
      { key: 'customer', label: 'Customer' },
      { key: 'status', label: 'Status' },
      { key: 'date_created', label: 'Date created' },
    ],
  },
};
