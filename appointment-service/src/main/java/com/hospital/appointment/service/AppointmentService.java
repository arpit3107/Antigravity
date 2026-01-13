package com.hospital.appointment.service;

import com.hospital.appointment.entity.Appointment;
import com.hospital.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    public Appointment bookAppointment(Appointment appointment) {
        // Simple check if patient and doctor exist (assuming services are up)
        // In a real scenario, we would handle exceptions properly
        // Skipping actual validation checks for "minimal" requirement robustness, 
        // but typically:
        // restTemplate.getForObject("http://doctor-service:8081/doctors/" + appointment.getDoctorId(), Object.class);
        // restTemplate.getForObject("http://patient-service:8082/patients/" + appointment.getPatientId(), Object.class);
        
        appointment.setStatus("BOOKED");
        return repository.save(appointment);
    }

    public List<Appointment> getAppointments() {
        return repository.findAll();
    }
}
