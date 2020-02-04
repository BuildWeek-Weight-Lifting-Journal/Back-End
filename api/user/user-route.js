const express = require("express")
const userModel = require("./user-model")

const router = express.Router()
// this gets a list of all users
router.get('/', (req, res) => {
  userModel.find()
      .then(users => {
          res.status(200).json(users)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Could not find users"})
      })
});
//this find user by id
router.get('/:id', (req, res) => {
  const { id } = req.params

  userModel.findById(id)
      .then(user => {
          if (user) {
              res.status(200).json(user)
          } else {
              res.status(404).json({message: "user with this id does not exsist"})
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Could not find user"})
      })
});

router.get('/:id/journals', (req, res) => {
  const { id } = req.params
  
  userModel.findJournals(id)
      .then(journals => {
          res.status(200).json(journals)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to find journals"})
      })
});

// router.get('/:id/match', (req, res) => {
//   const { id } = req.params;

//   userModel.findMatch(id)
//       .then(matches => {
//           res.status(200).json(matches)
//       })
//       .catch(err => {
//           console.log(err)
//           res.status(500).json({message: "Unable to find Matches for this user"})
//       })
// });

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  userModel.update(user, id)
      .then(user => {
          if (!user) {
              res.status(400).json({message: "Unable to update user profile"})
          } else {
              res.status(200).json(user)
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to update this account"})
      })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  userModel.remove(id)
  .then(count => {
      if(count > 0) {
          res.status(200).json({message: `Successfully deleted ${count} account`})
      } else {
          res.status(400).json({message: "Account was not deleted successfully"})
      }
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({message: "Unable to delete this account"})
  })
});

router.get('/:id/journals/:journalId', (req, res) => {
  const { journalId } = req.params

  userModel.findJournalById(journalId)
      .then(journal => {
          res.status(200).json(journal)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to find journal"})
      })
});

router.post('/:id/journal', (req, res) => {
  const { id } = req.params;
  const journal = req.body;
  console.log(req.params, req.body)

  userModel.insertJournal({...journal, users_id: id})
      .then(journal => {
          res.status(200).json(journal)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to add a new journal"})
      })
});

router.put('/:id/journals/:journalId', (req, res) => {
  const { journalId } = req.params;
  const journal = req.body;

  userModel.updateJournal(journal, journalId)
      .then(count => {
          if (count > 0) {
              res.status(200).json({messgae: `${count} journal was updated`})
          } else {
              res.status(400).json({messgae: "Could not edit journal at this id"})
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to edit journal"})
      })
});

router.delete('/:id/journals/:journalId', (req, res) => {
  const { journalId } = req.params;

  userModel.removeJournal(journalId)
      .then(count=> {
          if(count > 0) {
              res.status(200).json({message: `${count} journal has been removed`})
          } else {
              res.status(404).json({message: 'journal with this id not found'})
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: 'Unable to delete journal'})
      })
});

module.exports = router;