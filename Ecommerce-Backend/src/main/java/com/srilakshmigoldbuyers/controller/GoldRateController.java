package com.srilakshmigoldbuyers.controller;

import com.srilakshmigoldbuyers.model.GoldRate;
import com.srilakshmigoldbuyers.service.GoldRateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gold-rates")
public class GoldRateController {

    private final GoldRateService goldRateService;

    public GoldRateController(GoldRateService goldRateService) {
        this.goldRateService = goldRateService;
    }

    // GET all gold rates
    @GetMapping
    public ResponseEntity<List<GoldRate>> getAllGoldRates() {
        return ResponseEntity.ok(
                goldRateService.getAllGoldRates()
        );
    }

    // GET gold rate by ID
    @GetMapping("/{id}")
    public ResponseEntity<GoldRate> getGoldRateById(
            @PathVariable Long id
    ) {
        try {
            GoldRate goldRate =
                    goldRateService.getGoldRateById(id);

            return ResponseEntity.ok(goldRate);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // CREATE gold rate
    @PostMapping
    public ResponseEntity<GoldRate> createGoldRate(
            @RequestBody GoldRate goldRate
    ) {
        GoldRate savedRate =
                goldRateService.createGoldRate(goldRate);

        return ResponseEntity.ok(savedRate);
    }

    // UPDATE gold rate
    @PutMapping("/{id}")
    public ResponseEntity<GoldRate> updateGoldRate(
            @PathVariable Long id,
            @RequestBody GoldRate goldRate
    ) {
        try {
            GoldRate updatedRate =
                    goldRateService.updateGoldRate(
                            id,
                            goldRate
                    );

            return ResponseEntity.ok(updatedRate);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE gold rate
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoldRate(
            @PathVariable Long id
    ) {
        try {
            goldRateService.deleteGoldRate(id);

            return ResponseEntity.noContent().build();

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}