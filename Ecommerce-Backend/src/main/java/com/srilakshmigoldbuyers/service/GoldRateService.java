package com.srilakshmigoldbuyers.service;

import com.srilakshmigoldbuyers.model.GoldRate;
import com.srilakshmigoldbuyers.repository.GoldRateRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Comparator;

@Service
public class GoldRateService {

    private final GoldRateRepository goldRateRepository;

    public GoldRateService(GoldRateRepository goldRateRepository) {
        this.goldRateRepository = goldRateRepository;
    }

    public List<GoldRate> getAllGoldRates() {
        return goldRateRepository.findAll().stream()
                .sorted(Comparator.comparing(
                        GoldRate::getUpdatedAt,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .toList();
    }

    public GoldRate getLatestGoldRate() {
        return goldRateRepository.findTopByOrderByUpdatedAtDesc()
                .orElseThrow(() -> new RuntimeException("No gold rate configured"));
    }

    public GoldRate getGoldRateById(String id) {
        return goldRateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gold rate not found with id: " + id));
    }

    public GoldRate createGoldRate(GoldRate goldRate) {
        return goldRateRepository.save(goldRate);
    }

    public GoldRate updateGoldRate(String id, GoldRate updatedRate) {
        GoldRate existing = getGoldRateById(id);

        existing.setGold24k(updatedRate.getGold24k());
        existing.setGold22k(updatedRate.getGold22k());
        existing.setGold18k(updatedRate.getGold18k());

        return goldRateRepository.save(existing);
    }

    public void deleteGoldRate(String id) {
        if (!goldRateRepository.existsById(id)) {
            throw new RuntimeException("Gold rate not found with id: " + id);
        }

        goldRateRepository.deleteById(id);
    }
}