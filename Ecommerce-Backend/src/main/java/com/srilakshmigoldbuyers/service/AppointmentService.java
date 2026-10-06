package com.srilakshmigoldbuyers.service;

import com.srilakshmigoldbuyers.model.Appointment;
import com.srilakshmigoldbuyers.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository) {

        this.appointmentRepository =
                appointmentRepository;
    }

    // GET ALL APPOINTMENTS
    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();
    }

    // GET APPOINTMENT BY ID
    public Optional<Appointment> getAppointmentById(
            Long id) {

        return appointmentRepository.findById(id);
    }

    // CREATE APPOINTMENT
    public Appointment createAppointment(
            Appointment appointment) {

        return appointmentRepository.save(
                appointment);
    }

    // UPDATE APPOINTMENT
    public Appointment updateAppointment(
            Long id,
            Appointment appointmentDetails) {

        return appointmentRepository.findById(id)
                .map(appointment -> {

                    appointment.setName(
                            appointmentDetails.getName());

                    appointment.setPhone(
                            appointmentDetails.getPhone());

                    appointment.setEmail(
                            appointmentDetails.getEmail());

                    appointment.setBranch(
                            appointmentDetails.getBranch());

                    appointment.setAppointmentDate(
                            appointmentDetails
                                    .getAppointmentDate());

                    appointment.setAppointmentTime(
                            appointmentDetails
                                    .getAppointmentTime());

                    appointment.setMessage(
                            appointmentDetails.getMessage());

                    if (appointmentDetails.getStatus()
                            != null) {

                        appointment.setStatus(
                                appointmentDetails
                                        .getStatus());
                    }

                    return appointmentRepository
                            .save(appointment);
                })
                .orElseThrow(() ->
                        new RuntimeException(
                                "Appointment not found with id: "
                                        + id));
    }

    // UPDATE STATUS
    public Appointment updateStatus(
            Long id,
            String status) {

        Appointment appointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found with id: "
                                                + id));

        appointment.setStatus(status);

        return appointmentRepository.save(
                appointment);
    }

    // DELETE
    public void deleteAppointment(Long id) {

        if (!appointmentRepository
                .existsById(id)) {

            throw new RuntimeException(
                    "Appointment not found with id: "
                            + id);
        }

        appointmentRepository.deleteById(id);
    }
}