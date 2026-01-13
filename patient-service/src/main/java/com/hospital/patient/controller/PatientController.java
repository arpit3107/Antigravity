package com.hospital.patient.controller;

import com.hospital.patient.entity.Patient;
import com.hospital.patient.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService service;

    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return service.savePatient(patient);
    }

    @GetMapping
    public List<Patient> findAllPatients() {
        return service.getPatients();
    }

    @GetMapping("/{id}")
    public Patient findPatientById(@PathVariable Long id) {
        return service.getPatientById(id);
    }

    @PutMapping
    public Patient updatePatient(@RequestBody Patient patient) {
        return service.updatePatient(patient);
    }

    @DeleteMapping("/{id}")
    public String deletePatient(@PathVariable Long id) {
        return service.deletePatient(id);
    }
}
