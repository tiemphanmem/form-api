const express = require('express');
const router = express.Router();
const formController = require('../controllers/form.controller');
const upload = require('../middlewares/upload');

// ✅ Cho phép field 'vnidImage'
router.post(
  '/forms',
  upload.fields([
    { name: 'vnidImage', maxCount: 1 },
  ]),
  formController.createForm
);


module.exports = router;
