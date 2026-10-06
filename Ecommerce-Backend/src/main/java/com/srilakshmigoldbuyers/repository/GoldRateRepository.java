package com.srilakshmigoldbuyers.repository;


import com.srilakshmigoldbuyers.model.GoldRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GoldRateRepository extends JpaRepository<GoldRate, Long> {
    Optional<GoldRate> findTopByOrderByUpdatedAtDesc();
}
