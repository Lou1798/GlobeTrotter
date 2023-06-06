let express = require('express');
let router = express.Router();

// Import note controller
const dayController = require('./controllers/dayController');
const voyageController = require('./controllers/voyageController');
const userController = require('./controllers/userController');

router.get('/', (req,res) => res.redirect('/voyages'));

router.get('/voyages', voyageController.voyages);
router.post('/voyage', voyageController.voyageCreate);
router.put('/voyage/:voyage_id', voyageController.voyageUpdate);
router.delete('/voyage/:voyage_id', voyageController.voyageDelete);
router.get('/voyage/:voyage_id', voyageController.voyageDetail);
router.post('/voyage/search', voyageController.voyageFilter);

router.get('/days', dayController.days);
router.post('/day', dayController.dayCreate);
router.put('/day/:day_id', dayController.dayUpdate);
router.delete('/day/:day_id', dayController.dayDelete);
router.get('/day/:day_id', dayController.dayDetail);
router.post('/day/search', dayController.dayFilter);

router.post('/login', userController.login);

module.exports = router;