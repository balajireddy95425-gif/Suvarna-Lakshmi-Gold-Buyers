package com.srilakshmigoldbuyers.model;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.LastModifiedDate;

@Document(collection = "gold_rates")
public class GoldRate {

    @Id
    private String id;

    private double gold24k;

    private double gold22k;

    private double gold18k;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public GoldRate() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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