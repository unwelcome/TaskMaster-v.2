const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/health', (req,res) => {
  res.status(200).json({status: 'health'});
})

router.get('/db/health', async(req,res) => {
  const users = await db.getAllUsers();
  res.status(200).json(users);
})

module.exports = router;