import passport from 'passport';
import { Strategy as QQStrategy } from 'passport-qq';
import User from '../models/User.js'; // 确保路径正确

passport.use(new QQStrategy({
  clientID: process.env.QQ_APP_ID,
  clientSecret: process.env.QQ_APP_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/qq/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ qqId: profile.id });
    if (!user) {
      // 如果用户不存在，创建新用户
      user = new User({
        qqId: profile.id,
        username: profile.nickname, // 根据 QQ 资料获取用户名
        role: 'user', // 默认角色为普通用户
      });
      await user.save();
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
