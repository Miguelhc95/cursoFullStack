import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { BlogForm } from "../App";

describe("Blog component", () => {
  /*test('renders title and author but not URL or likes by default', () => {
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
  
  test('URL and likes are displayed when details button is clicked', async() => {
    const blog = {
      title: 'TestBlog',
      author: 'TestAuthor',
      url: 'http',
      likes: 10
    };

    const setBlogs = jest.fn()
    render(<Blog blog={blog} setBlogs={setBlogs} />);

    const showHideButton = screen.getByText('show/hide');
    await act(async () => {
      userEvent.click(showHideButton);
    });

    await waitFor(() => {
      const url = screen.getByText('http');
      expect(url).toBeDefined();

      const likes = screen.getByText(10);
      expect(likes).toBeDefined();
    });
});


test('like button click handler is called twice when clicked twice', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 10
  };

  const mockHandler = jest.fn();
  const setBlogs = jest.fn()
  render(<Blog blog={blog} setBlogs={setBlogs} handleLike={mockHandler} />);
  const showHideButton = screen.getByText('show/hide');

  await act(async () => {
    userEvent.click(showHideButton);
  });

  await waitFor(() => {
    const button = screen.getByText('like');
    userEvent.click(button);
    userEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

});
*/

  test("calls event handler with correct details when a new blog is created", async () => {
    const createBlog = jest.fn();
    const setBlogs = jest.fn();

    render(
      <BlogForm
        createBlog={createBlog}
        setBlogs={setBlogs}
        token="dummyToken"
      />,
    );

    const showAddButton = screen.getByText("Add blog");

    await act(async () => {
      userEvent.click(showAddButton);
    });

    await waitFor(() => {
      const titleInput = screen.getAllByPlaceholderText("title");
      const authorInput = screen.getAllByPlaceholderText("author");
      const urlInput = screen.getAllByPlaceholderText("url");
      const createButton = screen.getByText("create");

      userEvent.type(titleInput, "New Blog Title");
      userEvent.type(authorInput, "New Blog Author");
      userEvent.type(urlInput, "http://newblog.com");
      userEvent.click(createButton);
    });

    expect(createBlog).toHaveBeenCalledWith({
      title: "New Blog Title",
      author: "New Blog Author",
      url: "http://newblog.com",
    });
  });
});
