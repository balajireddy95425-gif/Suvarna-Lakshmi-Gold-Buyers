package com.srilakshmigoldbuyers.service;

import com.srilakshmigoldbuyers.model.Enquiry;
import com.srilakshmigoldbuyers.repository.EnquiryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    public EnquiryService(
            EnquiryRepository enquiryRepository) {

        this.enquiryRepository =
                enquiryRepository;
    }

    // CREATE
    public Enquiry createEnquiry(
            Enquiry enquiry) {

        return enquiryRepository.save(enquiry);
    }

    // GET ALL
    public List<Enquiry> getAllEnquiries() {

        return enquiryRepository.findAll();
    }

    // GET BY ID
    public Optional<Enquiry> getEnquiryById(
            Long id) {

        return enquiryRepository.findById(id);
    }

    // DELETE
    public void deleteEnquiry(Long id) {

        enquiryRepository.deleteById(id);
    }

    // UPDATE STATUS
    public Enquiry updateStatus(
            Long id,
            String status) {

        Enquiry enquiry =
                enquiryRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Enquiry not found with id: "
                                                + id));

        enquiry.setStatus(status);

        return enquiryRepository.save(enquiry);
    }
}