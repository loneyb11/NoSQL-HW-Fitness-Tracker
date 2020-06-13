const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan")

const PORT = process.env.PORT || 3000;

const db = require("./models/Workout");

const path = require('path');

const app = express();

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,});



// get all the workouts
app.get("/api/workouts", (req, res) => {
  db.find({})
  .then(dbWorkout => {
    
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});


// get a workout by id and then push an excercise to the array
app.put("/api/workouts/:id", ({body, params}, res) => {
  db.findByIdAndUpdate(params.id, {$push: {exercises: body}}, {new: true, runValidators: true})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  })
});

// create a new blank workout
app.post("/api/workouts", (req, res) => {
  db.create({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

// get the last 7 days workouts for graphs
app.get("/api/workouts/range", (req, res) => {
  db.find({})
  .limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});

//route to exercise page
app.get("/exercise", (req, res) => {
  res.sendFile(path.resolve("public/exercise.html"));
});

//route to stats page
app.get("/stats", (req, res) => {
  res.sendFile(path.resolve("public/stats.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});