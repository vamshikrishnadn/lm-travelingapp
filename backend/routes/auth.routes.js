const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
} = require('../controllers/auth.controller');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/users').get(isAuthenticatedUser, allUsers);
router.route('/user/:id').get(isAuthenticatedUser, getUserDetails);

module.exports = router;
