import { useEffect, useState } from "react";
import { blogApi } from "../services/api";
import "./AdminBlog.css";

const emptyForm = {
  title: "",
  slug: "",
  featuredImage: "",
  shortDescription: "",
  content: "",
  category: "Gold Tips",
  author: "Suvarna Lakshmi Gold Buyers",
  status: "Draft",
};

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const response = await blogApi.getAll();

      setBlogs(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error("Failed to load blogs:", error);
      alert("Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (blog) => {
    setEditingId(blog.id);

    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      featuredImage: blog.featuredImage || "",
      shortDescription:
        blog.shortDescription || "",
      content: blog.content || "",
      category:
        blog.category || "Gold Tips",
      author:
        blog.author ||
        "Suvarna Lakshmi Gold Buyers",
      status:
        blog.status || "Draft",
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter blog title.");
      return;
    }

    if (!form.content.trim()) {
      alert("Please enter blog content.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await blogApi.update(
          editingId,
          form
        );
      } else {
        await blogApi.create(form);
      }

      alert(
        editingId
          ? "Blog updated successfully."
          : "Blog created successfully."
      );

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await loadBlogs();
    } catch (error) {
      console.error(
        "Failed to save blog:",
        error
      );

      alert("Unable to save blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await blogApi.remove(id);
      await loadBlogs();
    } catch (error) {
      console.error(
        "Failed to delete blog:",
        error
      );

      alert("Unable to delete blog.");
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-blog-page">

      <div className="admin-blog-header">

        <div>
          <div className="blog-eyebrow">
            CONTENT MANAGEMENT
          </div>

          <h1>Blog Management</h1>

          <p>
            Create and manage educational
            content for your customers.
          </p>
        </div>

        <button
          className="blog-add-button"
          onClick={openCreate}
        >
          + Add New Post
        </button>

      </div>

      {showForm && (
        <div className="blog-form-card">

          <div className="blog-form-header">
            <div>
              <h2>
                {editingId
                  ? "Edit Blog Post"
                  : "Create New Blog Post"}
              </h2>

              <p>
                Add the information that should
                appear on your website.
              </p>
            </div>

            <button
              className="blog-close-button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="blog-form-grid">

              <div className="blog-field full">
                <label>Blog Title *</label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div className="blog-field">
                <label>Slug</label>

                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="example-gold-buying-guide"
                />

                <small>
                  Leave blank to generate automatically.
                </small>
              </div>

              <div className="blog-field">
                <label>Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Gold Tips</option>
                  <option>Gold Buying</option>
                  <option>Gold Selling</option>
                  <option>Gold Purity</option>
                  <option>Jewellery</option>
                  <option>Company News</option>
                </select>
              </div>

              <div className="blog-field">
                <label>Author</label>

                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                />
              </div>

              <div className="blog-field">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Published">
                    Published
                  </option>
                </select>
              </div>

              <div className="blog-field full">
                <label>Featured Image URL</label>

                <input
                  name="featuredImage"
                  value={form.featuredImage}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="blog-field full">
                <label>Short Description</label>

                <textarea
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Write a short description..."
                />
              </div>

              <div className="blog-field full">
                <label>Blog Content *</label>

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows="12"
                  placeholder="Write your complete blog article here..."
                  required
                />
              </div>

            </div>

            <div className="blog-form-actions">

              <button
                type="button"
                className="blog-cancel-button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="blog-save-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Post"
                  : "Create Post"}
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="blog-list-card">

        <div className="blog-list-top">
          <div>
            <h2>All Blog Posts</h2>
            <span>
              {blogs.length} post
              {blogs.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="blog-loading">
            Loading blog posts...
          </div>
        ) : blogs.length === 0 ? (
          <div className="blog-empty">
            <div className="blog-empty-icon">
              ✍
            </div>

            <h3>No blog posts yet</h3>

            <p>
              Create your first article to
              display it on the website.
            </p>

            <button
              onClick={openCreate}
              className="blog-add-button"
            >
              + Create First Post
            </button>
          </div>
        ) : (
          <div className="blog-table-wrapper">

            <table className="blog-table">

              <thead>
                <tr>
                  <th>Post</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {blogs.map((blog) => (
                  <tr key={blog.id}>

                    <td>
                      <div className="blog-post-cell">

                        {blog.featuredImage ? (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                          />
                        ) : (
                          <div className="blog-image-placeholder">
                            ✍
                          </div>
                        )}

                        <div>
                          <strong>
                            {blog.title}
                          </strong>

                          <span>
                            /{blog.slug}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="blog-category">
                        {blog.category || "—"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          blog.status === "Published"
                            ? "blog-status published"
                            : "blog-status draft"
                        }
                      >
                        {blog.status || "Draft"}
                      </span>
                    </td>

                    <td>
                      {blog.author || "—"}
                    </td>

                    <td>
                      {formatDate(blog.createdAt)}
                    </td>

                    <td>
                      <div className="blog-actions">

                        <button
                          onClick={() =>
                            openEdit(blog)
                          }
                          className="blog-edit-button"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(blog.id)
                          }
                          className="blog-delete-button"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
};

export default AdminBlog;