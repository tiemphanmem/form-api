const Form = require('../models/form.model');
const User = require('../models/user.model');

exports.createForm = async (req, res) => {
  try {
    const {
      fullName,
      dob,
      citizenId,
      newAddress,
      temporaryAddress,
      currentAddress,
    } = req.body;

    console.log('📥 Body:', req.body);
    console.log('📸 Files:', req.files);

    const vnidImage = req.files?.vnidImage?.[0]?.filename
      ? `${process.env.BASE_UPLOAD_URL}/${req.files.vnidImage[0].filename}`
      : null;

    if (!vnidImage) {
      return res.status(400).json({ error: 'Ảnh chụp màn hình CCCD từ VNID là bắt buộc.' });
    }

    // Tìm user
    const user = await User.findOne({ citizenId });

    if (!user) {
      return res.status(404).json({ error: 'Không tìm thấy user với citizenId này.' });
    }

    if (user.form) {
      return res.status(400).json({ error: 'User đã nhập form trước đó.' });
    }

    const newForm = new Form({
      fullName,
      dob,
      citizenId,
      newAddress,
      temporaryAddress,
      currentAddress,
      vnidImage,
    });

    await newForm.save();

    user.form = newForm._id;
    await user.save();

    console.log('✅ Form đã lưu và gán cho user:', newForm);
    res.status(201).json({ message: 'Gửi form thành công', form: newForm });

  } catch (err) {
    console.error('❌ Lỗi khi gửi form:', err.message);
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
