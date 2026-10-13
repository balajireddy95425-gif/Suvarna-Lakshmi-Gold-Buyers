package com.srilakshmigoldbuyers.controller;

import com.srilakshmigoldbuyers.model.Blog;
import com.srilakshmigoldbuyers.service.BlogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // Admin - get all blogs
    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(
                blogService.getAllBlogs()
        );
    }

    // Website - only published blogs
    @GetMapping("/published")
    public ResponseEntity<List<Blog>> getPublishedBlogs() {
        return ResponseEntity.ok(
                blogService.getPublishedBlogs()
        );
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(
            @PathVariable String id) {

        try {
            return ResponseEntity.ok(
                    blogService.getBlogById(id)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get by slug
    @GetMapping("/slug/{slug}")
    public ResponseEntity<Blog> getBlogBySlug(
            @PathVariable String slug) {

        try {
            return ResponseEntity.ok(
                    blogService.getBlogBySlug(slug)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Create
    @PostMapping
    public ResponseEntity<Blog> createBlog(
            @RequestBody Blog blog) {

        try {
            return ResponseEntity.status(201).body(blogService.createBlog(blog));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(
            @PathVariable String id,
            @RequestBody Blog blog) {

        try {
            return ResponseEntity.ok(
                    blogService.updateBlog(id, blog)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(
            @PathVariable String id) {

        try {
            blogService.deleteBlog(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}