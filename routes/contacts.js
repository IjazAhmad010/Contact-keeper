const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');
//@route   Get  api/contacts
//@desc    Get all usres contacts
// @access private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route   Post  api/contacts
//@desc    add new contact
// @access private
router.post(
  '/',
  [auth, [check('name', 'name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//@route   Put  api/contacts/:id
//@desc    update contact
// @access private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).json({ msg: 'Contact not found' });

    //make sure user owns contatct
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route   Delete  api/contacts/:id
//@desc    Dlelete contact
// @access private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).json({ msg: 'Contact not found' });

    //make sure user owns contatct
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorize' });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
