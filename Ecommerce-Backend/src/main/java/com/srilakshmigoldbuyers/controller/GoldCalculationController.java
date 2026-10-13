package com.srilakshmigoldbuyers.controller;

import com.srilakshmigoldbuyers.model.GoldCalculation;
import com.srilakshmigoldbuyers.service.GoldCalculationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/gold-calculations")
public class GoldCalculationController {

    private final GoldCalculationService goldCalculationService;

    public GoldCalculationController(
            GoldCalculationService goldCalculationService) {

        this.goldCalculationService =
                goldCalculationService;
    }

    // SAVE CUSTOMER CALCULATOR DETAILS
    @PostMapping
    public ResponseEntity<GoldCalculation> saveCalculation(
            @RequestBody GoldCalculation calculation) {

        if (calculation.getName() == null ||
                calculation.getName().trim().isEmpty()) {

            return ResponseEntity.badRequest().build();
        }

        if (calculation.getPhone() == null ||
                calculation.getPhone().trim().isEmpty()) {

            return ResponseEntity.badRequest().build();
        }

        if (calculation.getWeight() <= 0 || calculation.getWeight() > 100000 ||
                calculation.getGoldType() == null || calculation.getGoldType().isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        try {
            GoldCalculation saved =
                    goldCalculationService
                            .saveCalculation(calculation);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // GET ALL CALCULATIONS
    @GetMapping
    public ResponseEntity<List<GoldCalculation>>
    getAllCalculations() {

        return ResponseEntity.ok(
                goldCalculationService
                        .getAllCalculations());
    }

    // GET ONE CALCULATION
    @GetMapping("/{id}")
    public ResponseEntity<GoldCalculation>
    getCalculationById(
            @PathVariable String id) {

        try {

            GoldCalculation calculation =
                    goldCalculationService
                            .getCalculationById(id);

            return ResponseEntity.ok(calculation);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public ResponseEntity<GoldCalculation>
    updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        Set<String> allowedStatuses = Set.of(
                "New",
                "Contacted",
                "Interested",
                "Appointment Booked",
                "Completed",
                "Not Interested"
        );

        if (status == null ||
                !allowedStatuses.contains(status)) {

            return ResponseEntity.badRequest().build();
        }

        try {

            GoldCalculation updated =
                    goldCalculationService
                            .updateStatus(id, status);

            return ResponseEntity.ok(updated);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}