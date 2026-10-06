import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { blogApi } from "../services/api";
import "./BlogDetails.css";

function BlogDetails() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await blogApi.getBySlug(slug);

        setBlog(response.data);
      } catch (err) {
        console.error("Failed to load blog article:", err);
        setError("Unable to load this article.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="blog-details-page">
        <div className="blog-details-loading">
          Loading article...
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="blog-details-page">
        <section className="blog-not-found">
          <div className="container">

            <h1>Article Not Found</h1>

            <p>
              The blog article could not be loaded.
            </p>

            <Link
              to="/blog"
              className="blog-back-button"
            >
              ← Back to Blog
            </Link>

          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="blog-details-page">

      {/* Article Header */}
      <section className="blog-details-hero">
        <div className="container">

          <Link
            to="/blog"
            className="blog-back-link"
          >
            ← Back to Blog
          </Link>

          <span className="blog-details-category">
            {blog.category || "Gold Tips"}
          </span>

          <h1>{blog.title}</h1>

          <div className="blog-details-meta">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )
              : ""}
          </div>

          {blog.author && (
            <div className="blog-details-author">
              By {blog.author}
            </div>
          )}

        </div>
      </section>

      {/* Featured Image */}
      {blog.featuredImage && (
        <section className="blog-details-image-section">
          <div className="container">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="blog-details-image"
            />
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="blog-details-content-section">
        <div className="container">

          <article className="blog-details-content">

            {blog.shortDescription && (
              <div className="blog-introduction">
                {blog.shortDescription}
              </div>
            )}

            <div className="blog-full-content">
              {blog.content
                .split(/\n+/)
                .filter((paragraph) => paragraph.trim() !== "")
                .map((paragraph, index) => (
                  <p key={index}>
                    {paragraph.trim()}
                  </p>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="blog-details-cta">

              <h2>Have gold to sell?</h2>

              <p>
                Contact Suvarna Lakshmi Gold Buyers for
                more information about gold valuation.
              </p>

              <div className="blog-cta-buttons">

                <Link
                  to="/calculator"
                  className="blog-cta-primary"
                >
                  Calculate Gold Value
                </Link>

                <Link
                  to="/contact"
                  className="blog-cta-secondary"
                >
                  Contact Us
                </Link>

              </div>

            </div>

          </article>

        </div>
      </section>

    </main>
  );
}

export default BlogDetails;