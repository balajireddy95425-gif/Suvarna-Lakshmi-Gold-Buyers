package com.srilakshmigoldbuyers.repository;

import com.srilakshmigoldbuyers.model.GoldCalculation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoldCalculationRepository
        extends JpaRepository<GoldCalculation, Long> {
}