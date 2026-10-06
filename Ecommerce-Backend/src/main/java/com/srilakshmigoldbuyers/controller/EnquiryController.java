package com.srilakshmigoldbuyers.controller;

import com.srilakshmigoldbuyers.model.Enquiry;
import com.srilakshmigoldbuyers.service.EnquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/enquiries")
public class EnquiryController {

    private final EnquiryService enquiryService;

    public EnquiryController(
            EnquiryService enquiryService) {

        this.enquiryService =
                enquiryService;
    }

    // CREATE ENQUIRY
    @PostMapping
    public ResponseEntity<Enquiry> createEnquiry(
            @RequestBody Enquiry enquiry) {

        Enquiry savedEnquiry =
                enquiryService.createEnquiry(
                        enquiry);

        return ResponseEntity.ok(savedEnquiry);
    }

    // GET ALL ENQUIRIES
    @GetMapping
    public ResponseEntity<List<Enquiry>>
    getAllEnquiries() {

        return ResponseEntity.ok(
                enquiryService.getAllEnquiries());
    }

    // GET ENQUIRY BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Enquiry>
    getEnquiryById(
            @PathVariable Long id) {

        return enquiryService
                .getEnquiryById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build());
    }

    // DELETE ENQUIRY
    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteEnquiry(
            @PathVariable Long id) {

        enquiryService.deleteEnquiry(id);

        return ResponseEntity
                .noContent()
                .build();
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public ResponseEntity<Enquiry>
    updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        Set<String> allowedStatuses = Set.of(
                "New",
                "Contacted",
                "Interested",
                "Appointment Booked",
                "Completed",
                "Not Interested"
        );

        if (status == null ||
                !allowedStatuses.contains(status)) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }

        try {

            Enquiry updated =
                    enquiryService.updateStatus(
                            id,
                            status);

            return ResponseEntity.ok(updated);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}