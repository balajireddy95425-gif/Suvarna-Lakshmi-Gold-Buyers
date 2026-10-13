package com.srilakshmigoldbuyers.config;

import com.srilakshmigoldbuyers.model.Admin;
import com.srilakshmigoldbuyers.model.Branch;
import com.srilakshmigoldbuyers.repository.AdminRepository;
import com.srilakshmigoldbuyers.repository.BranchRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataIntilizer implements CommandLineRunner {

    private final AdminRepository adminRepository;
    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;

    public DataIntilizer(
            AdminRepository adminRepository,
            BranchRepository branchRepository,
            PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.branchRepository = branchRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        createDefaultAdmin();
        createDefaultBranch();
    }

    private void createDefaultAdmin() {
        String username = System.getenv("ADMIN_USERNAME");
        String password = System.getenv("ADMIN_PASSWORD");
        if (username == null || username.isBlank() || password == null || password.length() < 10) {
            return;
        }
        if (adminRepository.findByUsernameIgnoreCase(username.trim()).isEmpty()) {
            Admin admin = new Admin();
            admin.setUsername(username.trim().toLowerCase(java.util.Locale.ROOT));
            admin.setPassword(passwordEncoder.encode(password));
            admin.setRole("ADMIN");
            admin.setActive(true);
            adminRepository.save(admin);
        }
    }

    private void createDefaultBranch() {
        if (branchRepository.count() == 0) {
            Branch branch = new Branch();
            branch.setName("Suvarna Lakshmi Gold Buyers - Bengaluru");
            branch.setAddress(
                    "11, 1st Cross, Lingadhiranahalli, Andrahalli Main Road, Near Royal Mart"
            );
            branch.setCity("Bengaluru");
            branch.setState("Karnataka");
            branch.setPincode("560091");
            branch.setPhone("9542568978");
            branch.setActive(true);

            branchRepository.save(branch);
        }
    }
}
