import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { blogApi } from "../services/api";
import "./Blog.css";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await blogApi.getPublished();

        setBlogs(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (err) {
        console.error("Failed to load published blogs:", err);
        setError("Unable to load blog articles.");
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <main className="blog-page">

      {/* Hero */}
      <section className="blog-hero">
        <div className="container">
          <span>Suvarna Lakshmi Gold Buyers</span>

          <h1>Our Blog</h1>

          <p>
            Gold guides, valuation information and helpful
            information for our customers.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="section-padding">
        <div className="container">

          <div className="section-heading">
            <span>FROM OUR BLOG</span>
            <h2>Latest Articles</h2>
          </div>

          {loading && (
            <div className="blog-loading">
              Loading articles...
            </div>
          )}

          {error && (
            <div className="blog-error">
              {error}
            </div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="blog-empty">
              <h3>No published articles yet</h3>
              <p>
                Published blog articles will appear here.
              </p>
            </div>
          )}

          {!loading && blogs.length > 0 && (
            <div className="row g-4">

              {blogs.map((blog) => (
                <div
                  className="col-md-6 col-lg-4"
                  key={blog.id}
                >
                  <article className="blog-card">

                    {/* Image */}
                    <div
                      className="blog-card-image"
                      style={
                        blog.featuredImage
                          ? {
                              backgroundImage: `url(${blog.featuredImage})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : {}
                      }
                    >
                      {!blog.featuredImage && (
                        <span>
                          {blog.category || "Gold Tips"}
                        </span>
                      )}
                    </div>

                    <div className="blog-card-content">

                      <small>
                        {blog.createdAt
                          ? new Date(
                              blog.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </small>

                      <h3>
                        {blog.title}
                      </h3>

                      <p>
                        {blog.shortDescription ||
                          "Read this article to learn more about gold buying and valuation."}
                      </p>

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="blog-read-more"
                      >
                        Read Full Article →
                      </Link>

                    </div>

                  </article>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Blog;