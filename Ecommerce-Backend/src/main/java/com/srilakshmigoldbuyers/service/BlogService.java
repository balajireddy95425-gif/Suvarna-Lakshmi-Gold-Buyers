package com.srilakshmigoldbuyers.service;

import com.srilakshmigoldbuyers.model.Blog;
import com.srilakshmigoldbuyers.repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Blog> getPublishedBlogs() {
        return blogRepository.findByStatusOrderByCreatedAtDesc(
                "Published"
        );
    }

    public Blog getBlogById(String id) {
        return blogRepository.findById(id)
                .orElseThrow(
                        () -> new RuntimeException("Blog not found")
                );
    }

    public Blog getBlogBySlug(String slug) {
        return blogRepository.findBySlug(slug)
                .orElseThrow(
                        () -> new RuntimeException("Blog not found")
                );
    }

    public Blog createBlog(Blog blog) {
        if (blog == null || blog.getTitle() == null || blog.getTitle().isBlank()) {
            throw new IllegalArgumentException("Blog title is required");
        }

        String requestedSlug = (blog.getSlug() == null || blog.getSlug().isBlank())
                ? blog.getTitle() : blog.getSlug();
        String slug = createSlug(requestedSlug);
        if (slug.isBlank()) {
            throw new IllegalArgumentException("A valid blog slug is required");
        }
        if (blogRepository.existsBySlug(slug)) {
            throw new IllegalArgumentException("A blog with this slug already exists");
        }
        blog.setSlug(slug);
        if (blog.getStatus() == null || blog.getStatus().isBlank()) {
            blog.setStatus("Draft");
        }

        return blogRepository.save(blog);
    }

    public Blog updateBlog(String id, Blog updatedBlog) {

        if (updatedBlog == null || updatedBlog.getTitle() == null || updatedBlog.getTitle().isBlank()) {
            throw new IllegalArgumentException("Blog title is required");
        }
        Blog existing = getBlogById(id);

        existing.setTitle(updatedBlog.getTitle());

        String slug = updatedBlog.getSlug();

        if (slug == null || slug.trim().isEmpty()) {
            slug = updatedBlog.getTitle();
        }

        String normalizedSlug = createSlug(slug);
        if (normalizedSlug.isBlank()) {
            throw new IllegalArgumentException("A valid blog slug is required");
        }
        blogRepository.findBySlug(normalizedSlug).ifPresent(found -> {
            if (!found.getId().equals(id)) {
                throw new IllegalArgumentException("A blog with this slug already exists");
            }
        });
        existing.setSlug(normalizedSlug);

        existing.setFeaturedImage(
                updatedBlog.getFeaturedImage()
        );

        existing.setShortDescription(
                updatedBlog.getShortDescription()
        );

        existing.setContent(
                updatedBlog.getContent()
        );

        existing.setCategory(
                updatedBlog.getCategory()
        );

        existing.setAuthor(
                updatedBlog.getAuthor()
        );

        if (updatedBlog.getStatus() != null &&
                !updatedBlog.getStatus().trim().isEmpty()) {

            existing.setStatus(
                    updatedBlog.getStatus()
            );
        }

        return blogRepository.save(existing);
    }

    public void deleteBlog(String id) {
        blogRepository.deleteById(id);
    }

    private String createSlug(String value) {

        if (value == null) {
            return "";
        }

        return value
                .toLowerCase()
                .trim()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}