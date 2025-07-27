const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.render('users/index', { users });
});
router.get('/new', (req, res) => {
  res.render('users/new');
});
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;
  await User.create({ name, email, age });
  res.redirect('/users');
});
router.get('/:id/edit', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.render('users/edit', { user });
});
router.post('/:id', async (req, res) => {
  const { name, email, age } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, email, age });
  res.redirect('/users');
});
router.post('/:id/delete', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/users');
});

module.exports = router;


const authenticateToken = require('../middleware/authMiddleware');

router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'You have accessed a protected route!', user: req.user });
});
