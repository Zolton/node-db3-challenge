const knex = require("knex")
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)

module.exports = {
    find, findById, findSteps, addScheme, updateScheme, deleteScheme
}

function find () {
    return db("schemes")
}

function findById (id) {
    return db("schemes").where({id})
}

function findSteps (id) {
    // Grab the schemes table
    return db("schemes")
    // Join it with the Steps table based on these matches
    .join("steps",  "schemes.id", "=", "steps.scheme_id")
    // Filter out the array based on ID client supplies
    .where({scheme_id: id})
    // Order the results before sending back
    .orderBy("steps.step_number")
    // Only send back these columns
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
}

// SELECT schemes.id, schemes.scheme_name, steps.step_number, steps.instructions, steps.scheme_id 
// FROM schemes 
// inner JOIN steps 
// ON schemes.id = steps.scheme_id

function addScheme (schemeData) {
    return db("schemes").insert(schemeData)
}

function updateScheme(id, changes) {
    return db("schemes").where({id}).update(changes)
}

function deleteScheme (id) {
    return db("schemes").where({id}).del()
}



 // try {
  //   const scheme = await Schemes.findById(id);

  //   if (scheme) {
  //     const updatedScheme = await Schemes.update(changes, id);
  //     res.json(updatedScheme);
  //   } else {
  //     res.status(404).json({ message: "Could not find scheme with given id" });
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: "Failed to update scheme" });
  // }