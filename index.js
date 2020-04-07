/** Authentication */
const authentication = require('./authentication');
/** Triggers */
const transactionTrigger = require('./triggers/transaction');
const transferTrigger = require('./triggers/transfer');
const subscriptionTrigger = require('./triggers/subscription');
// const bankTrigger = require('./triggers/bank');
const countryTrigger = require("./triggers/country");
/** Actions */
const transferAction = require('./creates/transfer');
const paymentPlanAction = require('./creates/paymentPlan');
//const refundAction = require('./creates/refund');
/** Searches */
const transactionSearch = require('./searches/transaction');
const transferSearch = require('./searches/transfer');
/** Helpers */
const h = require('./helpers');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [h.addContentType],
  afterResponse: [h.autoParseJson],
  resources: {},
  triggers: {
    [transactionTrigger.key]: transactionTrigger,
    [transferTrigger.key]: transferTrigger,
    [subscriptionTrigger.key]: subscriptionTrigger,
    // [bankTrigger.key]: bankTrigger,
    [countryTrigger.key]: countryTrigger
  },
  creates: {
    [transferAction.key]: transferAction,
    [paymentPlanAction.key]: paymentPlanAction,
    //[refundAction.key]: refundAction,
  },
  searches: {
    [transactionSearch.key]: transactionSearch,
    [transferSearch.key]: transferSearch,
  },
};

module.exports = App;
