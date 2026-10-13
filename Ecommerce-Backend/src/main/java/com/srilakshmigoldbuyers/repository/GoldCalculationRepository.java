package com.srilakshmigoldbuyers.repository;

import com.srilakshmigoldbuyers.model.GoldCalculation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GoldCalculationRepository
        extends MongoRepository<GoldCalculation, String> {
}