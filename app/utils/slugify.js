module.exports = function slugify(str) {
  return str
    .toLowerCase()
    .replace(/đ/g, 'd')                 // xử lý riêng đ
    .replace(/Đ/g, 'd')                 // nếu có chữ hoa
    .normalize('NFD')                   // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')    // xoá dấu
    .replace(/[^a-z0-9 ]/g, '')         // xoá ký tự đặc biệt
    .trim()
    .replace(/\s+/g, '-');              // thay khoảng trắng = dấu -
};
