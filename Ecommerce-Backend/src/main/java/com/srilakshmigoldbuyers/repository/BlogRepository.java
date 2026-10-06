package com.srilakshmigoldbuyers.repository;

import com.srilakshmigoldbuyers.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogRepository
        extends JpaRepository<Blog, Long> {

    List<Blog> findAllByOrderByCreatedAtDesc();

    List<Blog> findByStatusOrderByCreatedAtDesc(
            String status
    );

    Optional<Blog> findBySlug(String slug);
}