const { Router } = require('express');

const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const userRouter = require('./userRoutes');
const reviewRouter = require('./review.js');

const router = Router();

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/user', userRouter);
router.use('/reviews', reviewRouter);

module.exports =  router;