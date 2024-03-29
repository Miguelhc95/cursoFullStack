const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
    })
  })

blogsRouter.post('/api/blogs', (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
  
    blog
      .save()
      .then(result => {
        response.json(result)
    })
    .catch(error => {
        response.status(400).json({ error: error.message })
    })
  })

  module.exports = blogsRouter