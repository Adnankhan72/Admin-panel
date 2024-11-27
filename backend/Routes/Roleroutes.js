const express = require('express');
const router = express.Router();
const Role = require('../Models/Role');

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new role
router.post('/', async (req, res) => {
  try {
    const { name, description, permissions, customAttributes } = req.body;
    const newRole = new Role({ name, description, permissions, customAttributes });
    await newRole.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a role
router.put('/:id', async (req, res) => {
  try {
    const { name, description, permissions, customAttributes } = req.body;
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      { name, description, permissions, customAttributes },
      { new: true }
    );
    res.json(updatedRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a role
router.delete('/:id', async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
