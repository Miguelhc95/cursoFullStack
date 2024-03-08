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

test('When making a POST request to /api/blogs, a new blog post is created successfully', async () => {
  
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

test('If the likes property is missing in the request, it will default to 0', async () => {
  const newBlog = {
    title: 'Example title',
    author: 'Example Author',
    url: 'https://www.example.com'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201);

  const response = await api.get('/api/blogs');
  const newBlogFromResponse = response.body.find(blog => blog.title === 'Example title');

  expect(newBlogFromResponse.likes).toBe(0);
});

test('If the title or url properties are missing in the request data, the backend responds with status code 400 Bad Request', async () => {
  const newBlogWithoutTitle = {
    author: 'Example Author',
    url: 'https://www.example.com',
    likes: 0
  };

  const newBlogWithoutUrl = {
    title: 'Example title',
    author: 'Example Author',
    likes: 0
  };

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400);

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400);
});

test('Deleting a single blog post by ID', async () => {

  const blogsAtStart = await api.get('/api/blogs');

  await api
    .delete(`/api/blogs/65eb3c9792f73d9b4aae5ec9`)
    .expect(204);

  const blogsAtEnd = await api.get('/api/blogs');
  

  expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1);

});

test('Updating the likes of a single blog post by ID', async () => {
  const response = await api.get('/api/blogs');
  const newLikes = 10;

  await api
    .put(`/api/blogs/65eb3c9792f73d9b4aae5ec6`)
    .send({ likes: newLikes })
    .expect(200);

    
  const updatedResponse = await api.get(`/api/blogs/65eb3c9792f73d9b4aae5ec6`);
  console.log("BLOOOOOOG ",updatedResponse.body,"EEEE", response.body);

  const updatedBlog = updatedResponse.body;
  expect(updatedBlog.likes).toBe(newLikes);
});



