package com.srilakshmigoldbuyers.repository;

import com.srilakshmigoldbuyers.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {

    Optional<Admin> findByUsernameIgnoreCase(String username);

    boolean existsByUsernameIgnoreCase(String username);
}
