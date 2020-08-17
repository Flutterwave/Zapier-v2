const cancelSubscriptions = (z, bundle) => {
    const requestOptions = {
      method: 'GET',
      url: 'https://api.ravepay.co/v2/gpx/subscriptions/query',
      params: { seckey: bundle.authData.seckey },
    };
  
    return z.request(requestOptions)
      .then((response) => {
          if (response.status !== 200) {
            throw new Error(`unable to fetch cancelled subscription: ${response.json.message}`);
          }

         return  response.json.data.plansubscriptions.filter(item => item.status='cancelled')
    
          
      });
  };
  
  module.exports = {
    key: 'cancel_subscription',
    noun: 'Cancel_Subscription',
    display: {
      label: 'Cancel Subscription',
      description: 'Triggers when a  subscription is cancelled.',
    //   important: true,
    },
    operation: {
      type:'polling',
      inputFields: [],
      perform: cancelSubscriptions,
      sample: {
        id: 8086,
        amount: 1.11,
        next_due: '2020-04-08T11:29:11.000Z',
        customer: { id: 193573819, customer_email: 'user@yahoo.com' },
        plan: 13582,
        status: 'cancelled',
        date_created: '2020-04-07T11:29:11.000Z'
      },
      
    },
  };
  