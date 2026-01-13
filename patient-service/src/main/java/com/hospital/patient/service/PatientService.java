package com.hospital.patient.service;

import com.hospital.patient.entity.Patient;
import com.hospital.patient.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    public Patient savePatient(Patient patient) {
        return repository.save(patient);
    }

    public List<Patient> getPatients() {
        return repository.findAll();
    }

    public Patient getPatientById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public String deletePatient(Long id) {
        repository.deleteById(id);
        return "Patient removed !! " + id;
    }

    public Patient updatePatient(Patient patient) {
        Patient existingPatient = repository.findById(patient.getId()).orElse(null);
        if (existingPatient != null) {
            existingPatient.setName(patient.getName());
            existingPatient.setAge(patient.getAge());
            existingPatient.setGender(patient.getGender());
            existingPatient.setMobile(patient.getMobile());
            return repository.save(existingPatient);
        }
        return null;
    }
}
