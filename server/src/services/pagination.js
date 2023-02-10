const LIMIT = 0;

async function getQueryParam(query) {
  const limit = +query.limit || LIMIT;
  const page = Math.abs(query.page);
  const skip = (page - 1) * +limit;
  return { skip, limit };
}

module.exports = { getQueryParam };
