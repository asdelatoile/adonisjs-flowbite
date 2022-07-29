import customConfig from "Config/custom";

const datatableFormat = (request, session, name) => {
  const page = request.input("page", session.get(`${name}.page`, 1));
  if (session.get(`${name}.page`) !== page) session.put(`${name}.page`, page);

  const sort = request.input(
    "sort",
    session.get(`${name}.sort`, customConfig.pagination.field)
  );
  if (session.get(`${name}.sort`) !== sort) session.put(`${name}.sort`, sort);

  const dir = request.input(
    "dir",
    session.get(`${name}.dir`, customConfig.pagination.dir)
  );
  if (session.get(`${name}.dir`) !== dir) session.put(`${name}.dir`, dir);

  let limit = request.input(
    "limit",
    session.get(`${name}.limit`, customConfig.pagination.limit)
  );
  if (session.get(`${name}.limit`) !== limit)
    session.put(`${name}.limit`, limit);
  if (limit === "-1") limit = Infinity;

  return { page, sort, dir, limit };
};

export { datatableFormat };
