import express from 'express';
import passport from 'passport';

const router = express.Router();

// QQ 登录路由
router.get('/qq', passport.authenticate('qq'));

// QQ 回调路由
router.get(
  '/qq/callback',
  passport.authenticate('qq', { failureRedirect: '/' }),
  (req, res) => {
    // 登录成功，重定向到主页或其他页面
    res.redirect('/');
  },
);

export default router;
