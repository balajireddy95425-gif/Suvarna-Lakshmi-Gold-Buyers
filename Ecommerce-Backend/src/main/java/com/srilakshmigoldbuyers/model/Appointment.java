package com.srilakshmigoldbuyers.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone;

    private String email;

    private String branch;

    private LocalDate appointmentDate;

    private String appointmentTime;

    @Column(length = 1000)
    private String message;

    private String status;

    private LocalDateTime createdAt;

    public Appointment() {
    }

    public Appointment(
            String name,
            String phone,
            String email,
            String branch,
            LocalDate appointmentDate,
            String appointmentTime,
            String message) {

        this.name = name;
        this.phone = phone;
        this.email = email;
        this.branch = branch;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
        this.message = message;
        this.status = "New";
    }

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();

        if (status == null || status.trim().isEmpty()) {
            status = "New";
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(String appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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
}