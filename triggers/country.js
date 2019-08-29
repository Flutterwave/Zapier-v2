const listCountries = () => {
    return [
      { id: 001, Code: "NG", Name: "Nigeria" },
      { id: 002, Code: "KE", Name: "Kenya" },
      { id: 003, Code: "GH", Name: "Ghana" },
      { id: 004, Code: "UG", Name: "Uganda" },
      { id: 005, Code: "TZ", Name: "Tanzania" },
      { id: 006, Code: "ZA", Name: "South Africa" }
    ];
    
};

module.exports = {
  key: "country",
  noun: "Country",
  display: {
    label: "New Country",
    description: "Triggers to populate the country dropdown",
    important: true,
    hidden: true
  },
  operation: {
    perform: listCountries
  }
};
