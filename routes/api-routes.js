const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find()
        .then(dbWorkout => {
            dbWorkout.forEach(workout => {
                workout.setTotalDuration();
            });
            console.log(dbWorkout);
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);

    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
        .then(result => {
            // console.log(result);
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body)
        .then(workout => {
            // console.log(workout);
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then(results => {
        res.json(results);
    });
});

module.exports = router;