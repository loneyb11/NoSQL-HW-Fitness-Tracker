const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "Exercise needs a type"
        },
        name: {
            type: String,
            trim: true,
            required: "Exercise needs a name"
        },
        duration: {
            type: Number,
            required: "Exercise needs a duration"
        },
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number
    }],
    totalDuration: Number
});

WorkoutSchema.methods.setTotalDuration = function () {
    // console.log("called");
    let sum = 0;
    for (let i = 0; i < this.exercises.length; i++) {
        sum += this.exercises[i].duration;
    }
    this.totalDuration = sum;
};

// WorkoutSchema.methods.numExercises = function () {
//     return this.exercises.length;
// };

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;