/** status 200 middleware */
// const mustBe200 = (response) => {
//   if (response.status !== 200) {
//     throw new Error(`Unexpected status code ${response.status}`);
//   }
//   return response;
// };

/** auto parse JSON */
const autoParseJson = (response, z) => {
  if (!response.content) throw new z.errors.HaltedError('Rave API error!');
  response.json = z.JSON.parse(response.content);
  return response;
};

/** add content type to request */
const addContentType = (request) => {
  request.headers['Content-Type'] = 'application/json';
  return request;
};

module.exports = {
  autoParseJson,
  addContentType,
};
