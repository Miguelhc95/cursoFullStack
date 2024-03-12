const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken');


blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs);
});


  blogsRouter.get('/api/blogs/:id', async (request, response) => {
    try {
      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
      }
      response.json(blog);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  

  blogsRouter.post('/api/blogs', async (request, response) => {
    const body = request.body;
    const getTokenFrom = request => {
      const authorization = request.get('authorization')
      if (authorization && authorization.startsWith('bearer ')) {
        return authorization.replace('bearer ', '')
      }
      return null
    }
  
    try {

      if (!request.token) {
        return response.status(401).json({ error: 'Token missing' });
      }

      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid' })
      }

      const user = request.user
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' });
      }
     
  
      if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title and URL are required' });
      }
  
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
      });
  
      const savedBlog = await blog.save();
      user.blogs.push(savedBlog._id);
      await user.save();
  
      const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
      response.status(201).json(populatedBlog);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  blogsRouter.delete('/api/blogs/:id', async (request, response) => {
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if ( !request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' });
      }
  
      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
      }
  
      if (blog.user.toString() !== decodedToken.id) {
        return response.status(401).json({ error: 'Unauthorized: You are not allowed to delete this blog' });
      }
  
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });
  

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body;

  const blogToUpdate = {
    likes: body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true });
    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    response.json(updatedBlog);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = blogsRouter
