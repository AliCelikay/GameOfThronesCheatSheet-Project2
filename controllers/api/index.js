const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const bookRoutes = require('./bookRoutes');
const characterRoutes = require('./characterRoutes');
const savedRoutes = require('./savedRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/books', bookRoutes);
router.use('/characters', characterRoutes);
// router.use('/savedRoutes', savedRoutes);

module.exports = router;
