package com.hospital.doctor.service;

import com.hospital.doctor.entity.Doctor;
import com.hospital.doctor.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository repository;

    public Doctor saveDoctor(Doctor doctor) {
        return repository.save(doctor);
    }

    public List<Doctor> getDoctors() {
        return repository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public String deleteDoctor(Long id) {
        repository.deleteById(id);
        return "Doctor removed !! " + id;
    }

    public Doctor updateDoctor(Doctor doctor) {
        Doctor existingDoctor = repository.findById(doctor.getId()).orElse(null);
        if (existingDoctor != null) {
            existingDoctor.setName(doctor.getName());
            existingDoctor.setSpecialization(doctor.getSpecialization());
            existingDoctor.setEmail(doctor.getEmail());
            return repository.save(existingDoctor);
        }
        return null;
    }
}
