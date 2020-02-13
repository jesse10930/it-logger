const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Tech = require('../models/Tech');

// @route   GET api/techs
// @desc    Retrieve techs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const techs = await Tech.find();
    res.send(techs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/techs
// @desc    Enter a tech
// @access  Public
router.post(
  '/',
  [
    check('firstName', 'First name is required')
      .not()
      .isEmpty(),
    check('lastName', 'Last name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { id, firstName, lastName } = req.body;

    try {
      const newTech = new Tech({
        id,
        firstName,
        lastName
      });

      const tech = await newTech.save();

      res.json(tech);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/techs
// @desc    Update a tech
// @access  Public
router.put('/:id', async (req, res) => {
  const { id, firstName, lastName } = req.body;

  const techFields = {};
  if (id) techFields.id = id;
  if (firstName) techFields.firstName = firstName;
  if (lastName) techFields.lastName = lastName;

  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    tech = await Tech.findByIdAndUpdate(
      req.params.id,
      { $set: techFields },
      { new: true }
    );

    res.json(tech);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/techs
// @desc    Remove a tech
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    let tech = await Tech.findById(req.params.id);

    if (!tech) return res.status(404).json({ msg: 'Tech not found' });

    await Tech.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Tech removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
