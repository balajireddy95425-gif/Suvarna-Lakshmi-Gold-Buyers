package com.srilakshmigoldbuyers.service;

import com.srilakshmigoldbuyers.model.Branch;
import com.srilakshmigoldbuyers.repository.BranchRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchService {

    private final BranchRepository branchRepository;

    public BranchService(BranchRepository branchRepository) {
        this.branchRepository = branchRepository;
    }

    public List<Branch> getAllBranches() {
        return branchRepository.findAllByOrderByNameAsc();
    }

    public List<Branch> getActiveBranches() {
        return branchRepository.findByActiveTrueOrderByNameAsc();
    }

    public Optional<Branch> getBranchById(Long id) {
        return branchRepository.findById(id);
    }

    public Branch createBranch(Branch branch) {
        validate(branch);
        normalize(branch);
        return branchRepository.save(branch);
    }

    public Branch updateBranch(Long id, Branch details) {
        validate(details);

        Branch existing = branchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Branch not found with id: " + id));

        existing.setName(details.getName().trim());
        existing.setAddress(details.getAddress().trim());
        existing.setCity(clean(details.getCity()));
        existing.setState(clean(details.getState()));
        existing.setPincode(clean(details.getPincode()));
        existing.setPhone(clean(details.getPhone()));
        existing.setEmail(clean(details.getEmail()));
        existing.setMapUrl(clean(details.getMapUrl()));
        existing.setActive(details.isActive());

        return branchRepository.save(existing);
    }

    public Branch updateStatus(Long id, boolean active) {
        Branch existing = branchRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Branch not found with id: " + id));

        existing.setActive(active);
        return branchRepository.save(existing);
    }

    public void deleteBranch(Long id) {
        if (!branchRepository.existsById(id)) {
            throw new RuntimeException("Branch not found with id: " + id);
        }

        branchRepository.deleteById(id);
    }

    private void validate(Branch branch) {
        if (branch == null) {
            throw new IllegalArgumentException("Branch data is required");
        }

        if (branch.getName() == null || branch.getName().isBlank()) {
            throw new IllegalArgumentException("Branch name is required");
        }

        if (branch.getAddress() == null || branch.getAddress().isBlank()) {
            throw new IllegalArgumentException("Branch address is required");
        }
    }

    private void normalize(Branch branch) {
        branch.setName(branch.getName().trim());
        branch.setAddress(branch.getAddress().trim());
        branch.setCity(clean(branch.getCity()));
        branch.setState(clean(branch.getState()));
        branch.setPincode(clean(branch.getPincode()));
        branch.setPhone(clean(branch.getPhone()));
        branch.setEmail(clean(branch.getEmail()));
        branch.setMapUrl(clean(branch.getMapUrl()));
    }

    private String clean(String value) {
        return value == null ? null : value.trim();
    }
}
