const ApiError = require('../errors/ApiError');

const checkResponse = async res => {
  if(!res.ok){
    let json, error;
    if(hasJSONResponse(res)){
      json = await res.json();
      error = json && json.message;
    }
    const body = json ? JSON.stringify(json) : await res.text();
    throw new ApiError(res.status, res.statusText, { body, json, error });
  }
}

const hasJSONResponse = res => {
  const contentType = res.headers.get('content-type');
  return contentType && contentType.indexOf('application/json') > -1;
}

exports = module.exports = { checkResponse };