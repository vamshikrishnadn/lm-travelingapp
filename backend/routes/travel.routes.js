const express = require('express');
const router = express.Router();

const {
  createTravel,
  editTravel,
  deleteTravel,
  otherTravels,
  myTravels,
  sendRequest,
  sentRequests,
  receivedRequests,
  updateStatusRequests,
  getSingTravelRequest,
  createTravelReview,
  getTravelReview,
  getMyTravelReviews,
  getTravelDetails,
  reviewUsers,
  getUsersInTravel,
  filterTravels,
} = require('../controllers/travel.controllers');
const store = require('../middlewares/uploadFiles');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/get/other').get(isAuthenticatedUser, otherTravels);
router.route('/get/other/filter').post(isAuthenticatedUser, filterTravels);
router.route('/get/my').get(isAuthenticatedUser, myTravels);
router.route('/request').post(isAuthenticatedUser, sendRequest);
router.route('/users/:id').get(isAuthenticatedUser, getUsersInTravel);
router.route('/request/sent').get(isAuthenticatedUser, sentRequests);
router.route('/request/received').get(isAuthenticatedUser, receivedRequests);
router.route('/create').post(isAuthenticatedUser, store.array('file', 12), createTravel);
router.route('/request/update/:id').patch(isAuthenticatedUser, updateStatusRequests);
router.route('/review/create').post(isAuthenticatedUser, createTravelReview);
router.route('/review/users').get(isAuthenticatedUser, reviewUsers);
router.route('/review/get/my').get(isAuthenticatedUser, getMyTravelReviews);
router.route('/review/get/:id').get(isAuthenticatedUser, getTravelReview);
router.route('/single/:id').get(isAuthenticatedUser, getTravelDetails);
router.route('/edit/:id').patch(isAuthenticatedUser, store.array('file', 12), editTravel);
router.route('/request/get/:id').get(isAuthenticatedUser, getSingTravelRequest);
router.route('/delete/:id').delete(isAuthenticatedUser, deleteTravel);

module.exports = router;
