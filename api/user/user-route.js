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

router.get('/:id/workouts', (req, res) => {
  const { id } = req.params
  
  userModel.findWorkouts(id)
      .then(workouts => {
          res.status(200).json(workouts)
      })
      .catch(err => {
          console.log(err)
          res.status(500).json({message: "Unable to find workouts"})
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

router.get('/:id/workouts/:workoutId', (req, res) => {
  const { workoutId } = req.params

  userModel.findWorkoutById(workoutId)
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
  console.log(req.params, req.body)

  userModel.insertWorkout({...workout, users_id: id})
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

  userModel.updateWorkout(workout, workoutId)
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

  userModel.removeWorkout(workoutId)
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