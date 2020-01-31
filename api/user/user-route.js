const express = require("express")
const db = require("./user-model")

const router = express.Router()

router.get('/', (req, res) => {
  db.find()
      .then(users => {
          res.status(200).json(users)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Could not find users"})
      })
});

router.get('/:id', (req, res) => {
  const { id } = req.params

  db.findById(id)
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

router.get('/:id/workouts', (req, res) => {
  const { id } = req.params
  
  db.findWorkouts(id)
      .then(workouts => {
          res.status(200).json(workouts)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to find workouts"})
      })
});

router.get('/:id/match', (req, res) => {
  const { id } = req.params;

  db.findMatch(id)
      .then(matches => {
          res.status(200).json(matches)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to find Matches for this user"})
      })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  db.update(user, id)
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

  db.remove(id)
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

router.get('/:id/workouts/:workoutId', (req, res) => {
  const { workoutId } = req.params

  db.findWorkoutById(workoutId)
      .then(workout => {
          res.status(200).json(workout)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to find workout"})
      })
});

router.post('/:id/workout', (req, res) => {
  const { id } = req.params;
  const workout = req.body;

  db.insertWorkout({...workout, user_id: id})
      .then(workout => {
          res.status(200).json(workout)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to add a new workout"})
      })
});

router.put('/:id/workouts/:workoutId', (req, res) => {
  const { workoutId } = req.params;
  const workout = req.body;

  db.updateWorkout(workout, workoutId)
      .then(count => {
          if (count > 0) {
              res.status(200).json({messgae: `${count} workout was updated`})
          } else {
              res.status(400).json({messgae: "Could not edit workout at this id"})
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to edit workout"})
      })
});

router.delete('/:id/workouts/:workoutId', (req, res) => {
  const { workoutId } = req.params;

  db.removeWorkout(workoutId)
      .then(count=> {
          if(count > 0) {
              res.status(200).json({message: `${count} workout has been removed`})
          } else {
              res.status(404).json({message: 'workout with this id not found'})
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: 'Unable to delete workout'})
      })
});

module.exports = router;