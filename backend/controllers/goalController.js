const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

// const goals = {
//   "goal 1": "Learn the mern stack 🔥",
//   "goal 2": "Develop apps 😍",
//   "goal 3": "Earn some cash 🤑",
// };

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json({ status: "success", data: goals });
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // res.status(400).json({ message: "Please add a text field 🤯" });
    res.status(400);
    throw new Error("Please add a text field 🤯");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json({
    status: "success",
    message: goal,
  });
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found 🤯");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedGoal,
  });
});

// @desc    Delete goals
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found 🤯");
  }

  await goal.remove();

  res.status(200).json({
    status: "success",
    data: `Delete a goal ${req.params.id}`,
  });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
