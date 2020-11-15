const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Log = require('../models/Log');

// @route   GET api/logs
// @desc    Retrieve logs
// @access  Public
router.get('/', async (req, res) => {
  // find logs in db and return data
  try {
    const logs = await Log.find().sort({ date: -1 });
    res.send(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/logs
// @desc    Enter a log
// @access  Public
router.post(
  '/',
  // middleware check message not empty
  [
    check('message', 'Message is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // declare errors array, check it's empty
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    // declare request variables
    const { id, message, attention, tech, date } = req.body;

    // declare new log schema
    try {
      const newLog = new Log({
        id,
        message,
        attention,
        tech,
        date
      });

      // save new log schema to db
      const log = await newLog.save();

      res.json(log);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/logs
// @desc    Update a log
// @access  Public
router.put('/:id', async (req, res) => {
  // declare request variables
  const { id, message, attention, tech } = req.body;

  // declare empty object, check if request info matches db info
  const logFields = {};
  if (id) logFields.id = id;
  if (message) logFields.message = message;
  if (attention) logFields.attention = attention;
  if (tech) logFields.tech = tech;

  // declare log variable with db, update if found
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/logs
// @desc    Remove a log
// @access  Public
router.delete('/:id', async (req, res) => {
  // declare log variable with data from db, delete if found
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: 'Log not found' });

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Log removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
