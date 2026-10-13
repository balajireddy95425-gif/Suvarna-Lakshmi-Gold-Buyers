package com.srilakshmigoldbuyers.repository;


import com.srilakshmigoldbuyers.model.GoldRate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GoldRateRepository extends MongoRepository<GoldRate, String> {
    Optional<GoldRate> findTopByOrderByUpdatedAtDesc();
}
