package com.srilakshmigoldbuyers.repository;

import com.srilakshmigoldbuyers.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BlogRepository
        extends MongoRepository<Blog, String> {

    List<Blog> findAllByOrderByCreatedAtDesc();

    List<Blog> findByStatusOrderByCreatedAtDesc(
            String status
    );

    Optional<Blog> findBySlug(String slug);

    boolean existsBySlug(String slug);
}