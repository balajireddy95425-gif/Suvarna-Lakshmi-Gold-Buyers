package com.srilakshmigoldbuyers.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gold_rates")
public class GoldRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double gold24k;

    private double gold22k;

    private double gold18k;

    private LocalDateTime updatedAt;

    public GoldRate() {
    }

    @PrePersist
    protected void onCreate() {
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getGold24k() {
        return gold24k;
    }

    public void setGold24k(double gold24k) {
        this.gold24k = gold24k;
    }

    public double getGold22k() {
        return gold22k;
    }

    public void setGold22k(double gold22k) {
        this.gold22k = gold22k;
    }

    public double getGold18k() {
        return gold18k;
    }

    public void setGold18k(double gold18k) {
        this.gold18k = gold18k;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}