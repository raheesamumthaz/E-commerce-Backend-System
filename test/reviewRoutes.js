const express = require('express');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const supertest = require('supertest');
const Review = require('../models/reviewModel');

const app = express();
const router = require('../routes/reviewRoutes');
app.use(express.json());
app.use('/reviews', router);

// Mock data for testing
const testReview = {
    productId: 'testProductId',
    userId: 'testUserId',
    rating: 4,
    comment: 'test comment',
  };
  const request = supertest(app);

  describe('Review Routes test', () => {

    before(async () => {
        //connect to a test DB
        await mongoose.connect('mongodb://localhost:27017/testDB' );
      });
      after(async () => {
        // Disconnect from the test database
        await mongoose.disconnect();
      });
      it('should add a new review with valid input', async () => {
        const response = await request.post('/reviews').send(testReview);
    
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('_id');
        expect(response.body.productId).to.equal(testReview.productId);
        expect(response.body.userId).to.equal(testReview.userId);
        expect(response.body.rating).to.equal(testReview.rating);
        expect(response.body.comment).to.equal(testReview.comment);
      });
    
  })