// functions for workout (get/post/delete/etc)
const Workout = require("../models/workoutModel.js");
const mongoose = require("mongoose");

//GET all workouts
const getWorkouts = async (request, response) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  response.status(200).json(workouts);
};

//GET single workout
const getWorkout = async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such Workout." });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return response.status(404).json({ error: "Workout does not exist." });
  }
  response.status(200).json(workout);
};

//Create a workout
const createWorkout = async (request, response) => {
  const { title, sets, reps, weight } = request.body;

   let emptyFields = []
   if (!title) {
    emptyFields.push('title')
   }
   if (!sets) {
    emptyFields.push('sets')
   }
   if (!reps) {
    emptyFields.push('reps')
   } 
   if (!weight) {
    emptyFields.push('weight')
   }
   if (emptyFields.length > 0) {
    return response.status(400).json({error: "Please Fill in All Fields", emptyFields})
   }

  //add doc to db
  try {
    const workout = await Workout.create({ title, sets, reps, weight });
    response.status(200).json(workout);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such Workout." });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return response.status(404).json({ error: "Workout does not exist." });
  }
  response.status(200).json(workout);
};

//update a workout
const updateWorkout = async (request, response) => {
  const { id } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({ error: "No such Workout." });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...request.body,
    }
  );

  if (!workout) {
    return response.status(404).json({ error: "Workout does not exist." });
  }
  response.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
