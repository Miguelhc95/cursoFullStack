const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs',async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

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
    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title and URL are required' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0 
    })
  
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
    if (!deletedBlog) {
      return response.status(404).json({ error: 'Blog not found' });
    }
    response.status(204).end();
  } catch (error) {
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