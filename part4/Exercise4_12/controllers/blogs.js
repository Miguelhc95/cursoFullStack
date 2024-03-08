const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs',async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

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


  module.exports = blogsRouter