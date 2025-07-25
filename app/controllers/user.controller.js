const User = require('./models/User');

const checkUserForm = async (citizenId) => {
  const user = await User.findOne({ citizenId }).populate('form');
  if (!user) {
    console.log('User không tồn tại');
    return;
  }

  if (user.form) {
    console.log('✅ User đã nhập form:', user.form);
  } else {
    console.log('❌ User chưa nhập form');
  }
};

const getUsersWithoutForm = async () => {
  const users = await User.find({ form: null });
  console.log('📋 Danh sách users chưa nhập form:', users);
};
