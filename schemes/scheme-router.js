const express = require("express");
const Schemes = require("./scheme-model.js");
const router = express.Router();

router.get("/", (req, res) => {
  Schemes.find()
    .then(schemes => {
      res.status(200).json(schemes);
    })
    .catch(error => {
      res.status(500).json({ Error: "Error" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Schemes.findById(id)
    .then(ids => {
      res.status(200).json(ids);
    })
    .catch(error => {
      res.status(404).json({ Error: "Invalid ID" });
    });
});

router.get("/:id/steps", (req, res) => {
  const id = req.params.id;
  Schemes.findSteps(id)
    .then(plan => {
      res.status(200).json(plan);
    })
    .catch(error => {
      res.status(404).json({ Error: "No such user" });
    });
});

router.post("/", (req, res) => {
  const schemeData = req.body;
  Schemes.addScheme(schemeData)
    .then(newScheme => {
      res.status(200).json(newScheme);
    })
    .catch(error => {
      res.status(404).json({ Error: "No such user" });
    });
});

// router.post("/:id/steps", (req, res) => {
//   const stepData = req.body;
//   const id = req.params.id;
//   Schemes.updateScheme(stepData, id)
//     .then(updatedScheme => {
//       res.status(200).json(updatedScheme);
//     })
//     .catch(error => {
//       res.status(500).json({ Error: "Server status: 500" });
//     });
// });

router.put("/:id", (req, res) => {
  const id = req.params.id
  const changes = req.body;
  Schemes.updateScheme(id, changes)
      .then(updatedScheme => {
          res.status(200).json(updatedScheme);
        })
        .catch(error => {
          res.status(500).json({ Error: "Server status: 500" });
        });
    });
  
 


router.delete("/:id", (req, res) => {
  const  id  = req.params.id
  Schemes.deleteScheme(id).then(deletedScheme => {
    res.status(200).json(deletedScheme);
  })
  .catch(error => {
    res.status(500).json({ Error: "Server status: 500" });
  });
});


module.exports = router;
