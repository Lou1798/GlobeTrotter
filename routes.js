let express = require('express');
let router = express.Router();

// Import controllers
const dayController = require('./controllers/dayController');
const voyageController = require('./controllers/voyageController');
const userController = require('./controllers/userController');
let auth = require('./auth.js');

router.post('/signup', userController.createUser);
router.post('/login', auth.loginUser);

router.get('/', (req,res) => res.redirect('/voyages'));

router.post('/voyage', auth.isAuth, voyageController.voyageCreate);
router.put('/voyage/:voyage_id', voyageController.voyageUpdate);
router.delete('/voyage/:voyage_id', auth.isAuth, voyageController.voyageDelete);
router.get('/voyage/:voyage_id', voyageController.voyageDetail);
router.get('/voyages', voyageController.voyageFilter);

router.get('/days', auth.isAuth, dayController.days);
router.post('/day', auth.isAuth, dayController.dayCreate);
router.put('/day/:day_id',auth.isAuth, dayController.dayUpdate);
router.delete('/day/:day_id', auth.isAuth, dayController.dayDelete);
router.get('/day/:day_id', auth.isAuth, dayController.dayDetail);
router.post('/day/search', auth.isAuth, dayController.dayFilter);

module.exports = router;