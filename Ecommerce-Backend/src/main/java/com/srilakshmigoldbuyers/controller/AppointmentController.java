package com.srilakshmigoldbuyers.controller;

import com.srilakshmigoldbuyers.model.Appointment;
import com.srilakshmigoldbuyers.service.AppointmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(
            AppointmentService appointmentService) {

        this.appointmentService =
                appointmentService;
    }

    // GET ALL APPOINTMENTS
    @GetMapping
    public ResponseEntity<List<Appointment>>
    getAllAppointments() {

        return ResponseEntity.ok(
                appointmentService
                        .getAllAppointments());
    }

    // GET APPOINTMENT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Appointment>
    getAppointmentById(
            @PathVariable Long id) {

        return appointmentService
                .getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .notFound()
                                .build());
    }

    // CREATE APPOINTMENT
    @PostMapping
    public ResponseEntity<Appointment>
    createAppointment(
            @RequestBody Appointment appointment) {

        Appointment savedAppointment =
                appointmentService
                        .createAppointment(
                                appointment);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedAppointment);
    }

    // UPDATE APPOINTMENT
    @PutMapping("/{id}")
    public ResponseEntity<Appointment>
    updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        try {

            Appointment updatedAppointment =
                    appointmentService
                            .updateAppointment(
                                    id,
                                    appointment);

            return ResponseEntity.ok(
                    updatedAppointment);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment>
    updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        Set<String> allowedStatuses = Set.of(
                "New",
                "Confirmed",
                "Completed",
                "Cancelled"
        );

        if (status == null ||
                !allowedStatuses.contains(status)) {

            return ResponseEntity
                    .badRequest()
                    .build();
        }

        try {

            Appointment updated =
                    appointmentService
                            .updateStatus(
                                    id,
                                    status);

            return ResponseEntity.ok(updated);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    // DELETE APPOINTMENT
    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteAppointment(
            @PathVariable Long id) {

        try {

            appointmentService
                    .deleteAppointment(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (RuntimeException e) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}