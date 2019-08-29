const raveAuth = (z, bundle) => {
  const customHttpOptions = {
    method: 'POST',
    url: 'https://api.ravepay.co/v2/gpx/merchant_details',
    body: {
      seckey: '{{bundle.authData.seckey}}',
    },
  }

  return z.request(customHttpOptions)
    .then((response) => {
    if(response.status !== 200) {
      throw new Error(`not authenticated: ${response.json.message} Please use a valid secret key`);
    }
      console.log(response.json.data);
    return response.json.data;
  })
}



module.exports = {
  type: "custom",
  test: raveAuth,
  fields: [
    {
      key: "pubkey",
      label: "Public Key",
      type: "string",
      required: true,
      helpText:
        "You can find your Public Key on the [Settings > API](https://rave.flutterwave.com/dashboard/settings/apis) page."
    },
    {
      key: "seckey",
      label: "Secret Key",
      type: "string",
      required: true,
      helpText:
        "You can find your Secret Key on the [Settings > API](https://rave.flutterwave.com/dashboard/settings/apis) page."
    }
  ],
  connectionLabel: "{{bundle.inputData.business_name}}"
};
