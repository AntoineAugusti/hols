/* eslint-disable */
// docs: https://helmetjs.github.io/docs/csp/
module.exports = {
  defaultSrc: ["'none'"],
  connectSrc: ["'none'"],
  baseUri: ["'none'"],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  formAction: ["'none'"],
  frameAncestors: ["'none'"],
  imgSrc: ["'self'", 'data:', 'https://www.google-analytics.com'],
  scriptSrc: ["'self'", 'https://www.google-analytics.com'],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
}
