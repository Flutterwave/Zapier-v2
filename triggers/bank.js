const listBanks = (z, bundle) => {
  const { pubkey } = bundle.authData;
  const requestOptions = {
    method: "GET",
    url: "https://api.ravepay.co/v2/banks/" + bundle.inputData.country + "/?",
    params: { public_key: pubkey }
  };

  return z.request(requestOptions)
    .then(response => {
    if (response.status !== 200) {
      throw new Error(`unable to retrieve banks because: ${response.json.message}`);
    }
      let arr = response.json.data.Banks;
      let res = arr.map(({ Id, ...rest }) => ({ id: Id, ...rest }));

      return res
  });

};

module.exports = {
  key: "bank",
  noun: "Bank",
  display: {
    label: "New Bank",
    description: "Triggers when account bank dropdown is clicked.",
    // important: true,
    // hidden: true
  },
  operation: { type: 'polling', perform: listBanks, sample:{
    "id": 179,
    "Code": "232",
    "Name": "Sterling Bank"
  }}
};
