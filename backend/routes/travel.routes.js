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
} = require('../controllers/travel.controllers');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

router.route('/get/other').get(isAuthenticatedUser, otherTravels);
router.route('/get/my').get(isAuthenticatedUser, myTravels);
router.route('/request').post(isAuthenticatedUser, sendRequest);
router.route('/request/sent').get(isAuthenticatedUser, sentRequests);
router.route('/request/received').get(isAuthenticatedUser, receivedRequests);
router.route('/create').post(isAuthenticatedUser, createTravel);
router.route('/request/update/:id').patch(isAuthenticatedUser, updateStatusRequests);
router.route('/review/create').post(isAuthenticatedUser, createTravelReview);
router.route('/review/get/my').get(isAuthenticatedUser, getMyTravelReviews);
router.route('/review/get/:id').get(isAuthenticatedUser, getTravelReview);
router.route('/single/:id').get(isAuthenticatedUser, getTravelDetails);
router.route('/request/get/:id').get(isAuthenticatedUser, getSingTravelRequest);
router.route('/delete/:id').delete(isAuthenticatedUser, deleteTravel);

module.exports = router;
