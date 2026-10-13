package com.srilakshmigoldbuyers.service;

import com.srilakshmigoldbuyers.model.Admin;
import com.srilakshmigoldbuyers.repository.AdminRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getAdminById(String id) {
        return adminRepository.findById(id);
    }

    public Admin createAdmin(Admin admin) {
        validate(admin);

        String username = admin.getUsername().trim().toLowerCase(java.util.Locale.ROOT);

        if (adminRepository.existsByUsernameIgnoreCase(username)) {
            throw new IllegalArgumentException("Username already exists");
        }

        admin.setUsername(username);
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole(normalizeRole(admin.getRole()));
        admin.setActive(true);

        return adminRepository.save(admin);
    }

    public Admin updateAdmin(String id, Admin details) {
        Admin existing = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));

        if (details.getUsername() == null || details.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username is required");
        }

        String username = details.getUsername().trim().toLowerCase(java.util.Locale.ROOT);

        adminRepository.findByUsernameIgnoreCase(username).ifPresent(found -> {
            if (!found.getId().equals(id)) {
                throw new IllegalArgumentException("Username already exists");
            }
        });

        existing.setUsername(username);
        existing.setRole(normalizeRole(details.getRole()));

        if (details.getPassword() != null && !details.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(details.getPassword()));
        }

        return adminRepository.save(existing);
    }

    public Admin updateStatus(String id, boolean active) {
        Admin existing = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found with id: " + id));

        existing.setActive(active);
        return adminRepository.save(existing);
    }

    public void deleteAdmin(String id) {
        if (!adminRepository.existsById(id)) {
            throw new RuntimeException("Admin not found with id: " + id);
        }

        adminRepository.deleteById(id);
    }

    public Admin authenticate(String username, String password) {
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            return null;
        }

        return adminRepository.findByUsernameIgnoreCase(username.trim())
                .filter(Admin::isActive)
                .filter(admin -> passwordMatchesAndUpgrade(admin, password))
                .orElse(null);
    }

    private boolean passwordMatchesAndUpgrade(Admin admin, String rawPassword) {
        String stored = admin.getPassword();
        if (stored != null && (stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$"))) {
            return passwordEncoder.matches(rawPassword, stored);
        }
        // One-time migration for existing H2/plaintext installations.
        if (stored != null && stored.equals(rawPassword)) {
            admin.setPassword(passwordEncoder.encode(rawPassword));
            adminRepository.save(admin);
            return true;
        }
        return false;
    }

    private void validate(Admin admin) {
        if (admin == null) {
            throw new IllegalArgumentException("Admin data is required");
        }

        if (admin.getUsername() == null || admin.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username is required");
        }

        if (admin.getPassword() == null || admin.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
    }

    private String normalizeRole(String role) {
        if (role == null || role.isBlank()) {
            return "ADMIN";
        }

        return role.trim().toUpperCase();
    }
}
