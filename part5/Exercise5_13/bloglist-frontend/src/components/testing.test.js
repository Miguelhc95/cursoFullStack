import React from 'react'
import { render, screen} from '@testing-library/react';
import Blog from './Blog';

describe('Blog component', () => {
  test('renders title and author but not URL or likes by default', () => {
    const blog = {
      title: 'TestBlog',
      author: 'TestAuthor',
      url: 'http://example.com',
      likes: 10
    };

    render(<Blog blog={blog} />);

    const title = screen.getByText('TestBlog')
    expect(title).toBeDefined()

    const author = screen.getByText('TestAuthor')
    expect(author).toBeDefined()

  });
  
});
