package com.srilakshmigoldbuyers.repository;

import com.srilakshmigoldbuyers.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {

    List<Branch> findAllByOrderByNameAsc();

    List<Branch> findByActiveTrueOrderByNameAsc();
}
