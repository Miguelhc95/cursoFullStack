const listHelper = require('../utils/list_helper')
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

test('The application returns the correct amount of blog posts in JSON format', async () => {
  const response = await api.get('/api/blogs');

  expect(response.status).toBe(200);
  expect(response.type).toBe('application/json');
  expect(response.body).toHaveLength(3); 
});