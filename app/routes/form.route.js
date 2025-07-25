const express = require('express');
const router = express.Router();
const formController = require('../controllers/form.controller');
const upload = require('../middlewares/upload');

// POST: Gửi thông tin kèm file
router.post(
  '/forms',
  upload.fields([
    { name: 'imageFront', maxCount: 1 },
    { name: 'imageBack', maxCount: 1 },
  ]),
  formController.createForm
);

// GET: Lấy tất cả form
router.get('/forms', formController.getAllForms);

module.exports = router;
