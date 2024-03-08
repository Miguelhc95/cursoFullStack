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

test('The blog posts have the property "id" instead of "_id"', async () => {
  const response = await api.get('/api/blogs');

  expect(response.status).toBe(200);
  expect(response.type).toBe('application/json');
  expect(response.body).toBeDefined();

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined();
    expect(blog._id).toBeUndefined(); 
  });
});

test('Al realizar una solicitud POST a /api/blogs, se crea correctamente una nueva publicación de blog', async () => {
  
  const initialResponse = await api.get('/api/blogs');
  const initialBlogs = initialResponse.body;

  const newBlog = {
    title: 'Example title',
    author: 'Example Author',
    url: 'https://www.example.com',
    likes: 0
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201);

  const response = await api.get('/api/blogs');
  const updatedBlogs = response.body;

  expect(updatedBlogs).toHaveLength(initialBlogs.length + 1);

  const titles = updatedBlogs.map(blog => blog.title);
  expect(titles).toContain('Example title');
});

