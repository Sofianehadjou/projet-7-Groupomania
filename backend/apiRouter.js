//import
const express = require('express');
const usersCtrl = require('./controllers/usersCtrl');
const publicationsCtrl = require('./controllers/publicationsCtrl');
const likesCtrl = require('./controllers/likesCtrl');
  
// Router
exports.router = (function() {
  var apiRouter = express.Router();

  // Users routes
  apiRouter.route('/users/register/').post(usersCtrl.register);
  apiRouter.route('/users/login/').post(usersCtrl.login);
  apiRouter.route('/users/profil/').get(usersCtrl.getUserProfile);
  apiRouter.route('/users/profil/').put(usersCtrl.updateUserProfile);

  //Publications routes.
  apiRouter.route('/publications/new/').post(publicationsCtrl.createPublication);
  apiRouter.route('/publications/').get(publicationsCtrl.listPublications);

  //likes routes
  apiRouter.route('/publications/:publicationId/vote/like').post(likesCtrl.likePost);
  apiRouter.route('/publications/:publicationId/vote/dislike').post(likesCtrl.dislikePost);

return apiRouter; 
})();