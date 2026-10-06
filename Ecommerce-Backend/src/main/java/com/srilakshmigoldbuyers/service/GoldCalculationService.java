package com.srilakshmigoldbuyers.service;

import com.srilakshmigoldbuyers.model.GoldCalculation;
import com.srilakshmigoldbuyers.repository.GoldCalculationRepository;
import com.srilakshmigoldbuyers.model.GoldRate;
import com.srilakshmigoldbuyers.service.GoldRateService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class GoldCalculationService {

    private final GoldCalculationRepository repository;
    private final GoldRateService goldRateService;

    public GoldCalculationService(
            GoldCalculationRepository repository, GoldRateService goldRateService) {
        this.repository = repository;
        this.goldRateService = goldRateService;
    }

    public GoldCalculation saveCalculation(
            GoldCalculation calculation) {

        GoldRate current = goldRateService.getLatestGoldRate();
        double rate = rateForGoldType(current, calculation.getGoldType());
        calculation.setGoldRate(rate);
        double estimatedValue = calculation.getWeight() * rate;

        calculation.setEstimatedValue(
                estimatedValue);

        calculation.setCreatedAt(
                LocalDateTime.now());

        return repository.save(calculation);
    }

    private double rateForGoldType(GoldRate rate, String goldType) {
        if (goldType == null) throw new IllegalArgumentException("Gold type is required");
        return switch (goldType.trim().toUpperCase()) {
            case "24K GOLD", "24K" -> rate.getGold24k();
            case "22K GOLD", "22K" -> rate.getGold22k();
            case "18K GOLD", "18K" -> rate.getGold18k();
            default -> throw new IllegalArgumentException("Unsupported gold type");
        };
    }

    public List<GoldCalculation> getAllCalculations() {
        return repository.findAll();
    }

    public GoldCalculation getCalculationById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Gold calculation not found with id: "
                                        + id));
    }

    /* UPDATE LEAD STATUS */

    public GoldCalculation updateStatus(
            Long id,
            String status) {

        GoldCalculation calculation =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Gold calculation not found with id: "
                                                + id));

        calculation.setStatus(status);

        return repository.save(calculation);
    }
}