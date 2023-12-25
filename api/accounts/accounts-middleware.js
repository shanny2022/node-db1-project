const db = require("../../data/db-config");

async function checkAccountPayload(req, res, next) {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    next({
      status: 400,
      message: "name and budget are required"
    })
  }
  else if (name.trim().length < 3 || name.trim().length > 100) {
    next({
      status: 400,
      message: "name of account must be between 3 and 100"
    })
  } else if (typeof budget !== "number" || Number.isNaN(budget)){
    next({
      status: 400,
      message: "budget of account must be a number"
    })
  } else if (budget < 0 || budget > 1000000) {
    next({
      status: 400,
      message: "budget of account is too large or too small"
    })
  }
  else {
    next();
  }
}

async function checkAccountNameUnique(req, res, next) {
try {
  const data = await db("accounts").where("name", req.body.name.trim()).first();
  if (data){
    next({
      status: 400,
      message: "that name is taken"
    })
  } else {
    next();
  }
} catch (err){
  next(err)
}
}

async function checkAccountId(req, res, next) {
  const data = await db("accounts").where("id", req.params.id).first();
  if (!data) {
    next({
      status: 404,
      message: "account not found"
    })
  } else {
    next();
  }
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}
