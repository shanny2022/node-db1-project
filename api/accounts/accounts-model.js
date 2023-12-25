const db = require("../../data/db-config");

async function getAll(){
  const result = await db("accounts");
  return result;
}

async function getById(id){
  const result = await db("accounts").where("id", id).first();
  return result;
}

async function create(account){
  const result = await db("accounts").insert(account);
  return getById(result[0]);
}

async function updateById(id, account){
  await db("accounts").update({name: account.name, budget: account.budget}).where("id", id);
  return getById(id);
}

async function deleteById(id){
  const data = await getById(id);
  await db("accounts").delete().where("id", id);
  return data;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
