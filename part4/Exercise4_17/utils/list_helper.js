const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0);
  }

  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
  
    let favorite = blogs[0];
    for (let i = 1; i < blogs.length; i++) {
      if (blogs[i].likes > favorite.likes) {
        favorite = blogs[i];
      }
    }
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    };
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
  
    const authorCounts = lodash.countBy(blogs, 'author');
    const mostBlogsAuthor = lodash.maxBy(lodash.keys(authorCounts), (author) => authorCounts[author]);
  
    return {
      author: mostBlogsAuthor,
      blogs: authorCounts[mostBlogsAuthor]
    };
  }

  const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;
  
    const authorLikes = lodash.groupBy(blogs, 'author');
    const authorTotalLikes = lodash.mapValues(authorLikes, (blogs) => lodash.sumBy(blogs, 'likes'));
    const mostLikesAuthor = lodash.maxBy(lodash.keys(authorTotalLikes), (author) => authorTotalLikes[author]);
  
    return {
      author: mostLikesAuthor,
      likes: authorTotalLikes[mostLikesAuthor]
    };
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }