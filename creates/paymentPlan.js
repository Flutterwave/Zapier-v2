const createPaymentPlan = (z, bundle) => {
  const { seckey } = bundle.authData;
  const {
    amount,
    name,
    interval,
    duration,
    currency,
  } = bundle.inputData;

  const requestOptions = {
    method: 'POST',
    url: 'https://api.ravepay.co/v2/gpx/paymentplans/create',
    body: {
      seckey,
      amount,
      name,
      interval,
      currency,
    },
  };
  if (duration) requestOptions.body.duration = duration;

  return z.request(requestOptions)
    .then((response) => {
      if(response.status !==200 ) {
        throw new Error(`create payment plan error: ${response.json.message}`)
      }
      return response.json.data;
    })
};

module.exports = {
  key: 'create_payment_plan',
  noun: 'Payment Plan',
  display: {
    label: 'Create Payment Plan',
    description: 'Creates a new payment plan.',
    important: true,
  },
  operation: {
    inputFields: [
      {
        key: 'name',
        type: 'string',
        required: true,
        helpText: 'This is what would appear on the subscription reminder email.',
        label: 'Name',
      },
      {
        key: 'amount',
        type: 'number',
        required: true,
        helpText: 'this is the amount for the plan. The amount would be charged on each billing cycle.',
        label: 'Amount',
      },
      {
        key: 'currency',
        type: 'string',
        required: true,
        label: 'Currency',
        choices: { NGN: 'Naira', KES: 'Kenyan Shillings', GHS: 'Ghanian cedis', UGX: 'Ugandan shillings', TZS: 'Tanzania shillings'}
      },
      {
        key: 'interval',
        type: 'string',
        required: true,

        choices: { daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', yearly: 'Yearly'},
        label: 'Interval',
      },
      {
        key: 'duration',
        type: 'number',
        helpText: 'If set to 5 and intervals is set to monthly, the subscriber would be charged 5 times. Leave empty to charge indefinitely.',
        label: 'Number of times to charge a subscriber.',
      },
    ],
    perform: createPaymentPlan,
    sample: {
      status: 'success',
      message: 'CREATED-PAYMENTPLAN',
      data: {
        id: 13,
        name: 'N/A',
        amount: 0,
        interval: 'daily',
        duration: 0,
        status: 'active',
        plan_token: 'rpp_4893h39493b439f2',
        date_created: '2018-02-21T15:34:13.000Z',
      },
    },
    // outputFields: [
    //   { key: 'data', label: 'Payment plan data' type:'object', required:true},
    // ],
  },
};
