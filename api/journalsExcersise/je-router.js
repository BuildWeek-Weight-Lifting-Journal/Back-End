const router = require('express').Router();

const Jouexe = require('./je-model');


router.get('/',  (req, res) => {
    Jouexe.find()
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id',  (req, res) => {
    Jouexe.findById(req.params.id)
    .then(item => {
        console.log(item)
        res.status(200).json(item)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/',  (req, res) => {
    let newjouexe = req.body;
    if (!newjouexe.weight) {
        res.status(422).json({message: "Missing fields: weight"})
    }
    if (!newjouexe.reps) {
        res.status(422).json({message: "Missing fields: reps"})
    }
    if (!newjouexe.sets) {
        res.status(422).json({message: "Missing fields: sets"})
    }
    if (!newjouexe.journalId) {
        res.status(422).json({message: "Missing fields: journalId"})
    }
    if (!newjouexe.exerciseId) {
        res.status(422).json({message: "Missing fields: exerciseId"})
    }
    Jouexe.add(newjouexe)
    .then(item => {
        res.status(201).json(item);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id',  (req, res) => {
    const {id} = req.params
    let changes = req.body;
    if (!changes.weight) {
        res.status(422).json({message: "Missing fields: weight"})
    }
    if (!changes.reps) {
        res.status(422).json({message: "Missing fields: reps"})
    }
    if (!changes.sets) {
        res.status(422).json({message: "Missing fields: sets"})
    }
    if (!changes.journalId) {
        res.status(422).json({message: "Missing fields: journalId"})
    }
    if (!changes.exerciseId) {
        res.status(422).json({message: "Missing fields: exerciseId"})
    }
    Jouexe.update(id, changes)
    .then(updated => {
        if (updated) {
            res.status(200).json({success: true, updated})
        } else {
            res.status(404).json({message: "This item could not be updated"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id',  (req, res) => {
    Jouexe.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "This item has been removed from the database"})
        } else {
            res.status(404).json({message: "This item does not exist"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;