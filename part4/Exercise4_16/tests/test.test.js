const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

test('Creating a new user with invalid data returns proper error response', async () => {
    const newUser = {
      username: 'ab', 
      password: 'pass', 
      name: 'Test User'
    };
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'Username and password must be provided and have at least 3 characters' });
  });
  
  test('Creating a new user with existing username returns proper error response', async () => {
    const newUser = {
      username: 'testuser', 
      password: 'password123',
      name: 'Test User'
    };
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect({ error: 'Username must be unique' });
  });
  