const fs = require('fs');
const path = require('path');
const UPLOAD_FOLDER = process.env.UPLOAD_FOLDER || '/opt/nodeapps/uploads';

function ensurePathExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Đệ quy lấy cây thư mục
function getDirectoryTree(basePath) {
  const stats = fs.statSync(basePath);
  const name = path.basename(basePath);

  if (stats.isDirectory()) {
    return {
      name,
      path: basePath.replace(UPLOAD_FOLDER, ''),
      type: 'folder',
      children: fs.readdirSync(basePath).map(child => getDirectoryTree(path.join(basePath, child)))
    };
  } else {
    return {
      name,
      path: basePath.replace(UPLOAD_FOLDER, ''),
      type: 'file'
    };
  }
}

exports.listTree = () => {
  if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER, { recursive: true });
  }

  try {
    return getDirectoryTree(UPLOAD_FOLDER);
  } catch (e) {
    console.error("Lỗi đọc thư mục:", e.message);
    return { name: 'uploads', path: '/', type: 'folder', children: [] };
  }
};



exports.createFolder = (parentPath, folderName) => {
  const fullPath = path.join(UPLOAD_FOLDER, parentPath || '', folderName);
  ensurePathExists(fullPath);
  return { message: 'Tạo thư mục thành công' };
};

exports.uploadFile = (folderPath, file) => {
  const destPath = path.join(UPLOAD_FOLDER, folderPath, file.originalname);
  fs.renameSync(file.path, destPath);
  return { message: 'Tải file thành công', filename: file.originalname };
};

exports.renameItem = (oldPath, newName) => {
  const src = path.join(UPLOAD_FOLDER, oldPath);
  const dst = path.join(path.dirname(src), newName);
  fs.renameSync(src, dst);
  return { message: 'Đổi tên thành công' };
};

exports.deleteItem = (targetPath) => {
  const fullPath = path.join(UPLOAD_FOLDER, targetPath);
  if (!fs.existsSync(fullPath)) throw new Error('Không tìm thấy');

  const stats = fs.statSync(fullPath);
  if (stats.isDirectory()) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  } else {
    fs.unlinkSync(fullPath);
  }
  return { message: 'Đã xoá thành công' };
};
