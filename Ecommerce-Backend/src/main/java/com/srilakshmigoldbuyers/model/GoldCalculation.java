package com.srilakshmigoldbuyers.model;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;

@Document(collection = "gold_calculations")
public class GoldCalculation {

    @Id
    private String id;

    private String name;

    private String phone;

    private String goldType;

    private double weight;

    private double goldRate;

    private double estimatedValue;

    private String status;

    @CreatedDate
    private LocalDateTime createdAt;

    // =========================================
    // GOOGLE ADS TRACKING
    // =========================================
    private String campaignId;
    private String adGroupId;
    private String keyword;
    private String gclid;

    // =========================================
    // DEFAULT CONSTRUCTOR
    // =========================================

    public GoldCalculation() {
    }

    // =========================================
    // CREATE TIME
    // =========================================

    // =========================================
    // BASIC GETTERS / SETTERS
    // =========================================

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGoldType() {
        return goldType;
    }

    public void setGoldType(String goldType) {
        this.goldType = goldType;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getGoldRate() {
        return goldRate;
    }

    public void setGoldRate(double goldRate) {
        this.goldRate = goldRate;
    }

    public double getEstimatedValue() {
        return estimatedValue;
    }

    public void setEstimatedValue(double estimatedValue) {
        this.estimatedValue = estimatedValue;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // =========================================
    // GOOGLE ADS GETTERS / SETTERS
    // =========================================

    public String getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(String campaignId) {
        this.campaignId = campaignId;
    }

    public String getAdGroupId() {
        return adGroupId;
    }

    public void setAdGroupId(String adGroupId) {
        this.adGroupId = adGroupId;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getGclid() {
        return gclid;
    }

    public void setGclid(String gclid) {
        this.gclid = gclid;
    }
}