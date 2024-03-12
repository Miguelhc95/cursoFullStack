const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const initialBlogs = [
    {
      title: 'First Blog',
      author: 'John Doe',
      url: 'http://example.com/first-blog',
      likes: 10
    },
    {
      title: 'Second Blog',
      author: 'Jane Smith',
      url: 'http://example.com/second-blog',
      likes: 15
    }
  ];
  
beforeEach(async () => {
  await Blog.deleteMany({});
  
  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

test('adding a new blog with valid token succeeds', async () => {
  const newBlog = {
    title: 'New Test Blog',
    author: 'New Test Author',
    url: 'http://newtest.com',
    likes: 0
  };

  const user = { username: 'rooteo', id: '65ee0a7e3797cb6ec8f9809b' };

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3RlbyIsImlkIjoiNjVlZTBhN2UzNzk3Y2I2ZWM4Zjk4MDliIiwiaWF0IjoxNzEwMjYxMzc2LCJleHAiOjE3MTAyNjQ5NzZ9.mM0AOSdy-csFpTFBROOlinrJ_AOuuZwrsxTlDDYaPhw" // Replace with the token

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test('adding a new blog without token fails with status 401', async () => {
  const newBlog = {
    title: 'New Test Blog',
    author: 'New Test Author',
    url: 'http://newtest.com',
    likes: 0
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});
