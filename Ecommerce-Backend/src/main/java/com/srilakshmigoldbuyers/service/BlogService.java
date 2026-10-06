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

    public Blog getBlogById(Long id) {
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

        if (blog.getSlug() == null ||
                blog.getSlug().trim().isEmpty()) {

            blog.setSlug(createSlug(blog.getTitle()));
        } else {
            blog.setSlug(createSlug(blog.getSlug()));
        }

        return blogRepository.save(blog);
    }

    public Blog updateBlog(Long id, Blog updatedBlog) {

        Blog existing = getBlogById(id);

        existing.setTitle(updatedBlog.getTitle());

        String slug = updatedBlog.getSlug();

        if (slug == null || slug.trim().isEmpty()) {
            slug = updatedBlog.getTitle();
        }

        existing.setSlug(createSlug(slug));

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

    public void deleteBlog(Long id) {
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