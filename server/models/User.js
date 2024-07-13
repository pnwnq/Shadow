import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user', // 默认角色为普通用户
  },
  qqId: {
    type: String,
    unique: true,
  },
  qqPassword: {
    type: String,
  },
  // 其他字段根据需要添加
});

export default mongoose.model('User', UserSchema);
