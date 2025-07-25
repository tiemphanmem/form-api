const Form = require('../models/form.model');

exports.createForm = async (req, res) => {
  try {
    const { fullName, dob, oldAddress, newAddress, citizenId, attr } = req.body;

    console.log('📥 Body:', req.body);
    console.log('📸 Files:', req.files);

    const imageFront = req.files?.imageFront?.[0]?.filename
      ? `${process.env.BASE_UPLOAD_URL}/${req.files.imageFront[0].filename}`
      : null;

    const imageBack = req.files?.imageBack?.[0]?.filename
      ? `${process.env.BASE_UPLOAD_URL}/${req.files.imageBack[0].filename}`
      : null;

    const newForm = new Form({
      fullName,
      dob,
      oldAddress,
      newAddress,
      citizenId,
      attr: attr ? (Array.isArray(attr) ? attr : [attr]) : [],
      imageFront,
      imageBack,
    });

    await newForm.save();
    console.log('✅ Form saved:', newForm);
    res.status(201).json({ message: 'Gửi thành công', form: newForm });
  } catch (err) {
    console.error('❌ Lỗi khi gửi form:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
};


exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
};
