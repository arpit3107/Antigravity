package com.hospital.billing.service;

import com.hospital.billing.entity.Bill;
import com.hospital.billing.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillService {

    @Autowired
    private BillRepository repository;

    public Bill createBill(Bill bill) {
        bill.setStatus("PENDING");
        return repository.save(bill);
    }

    public List<Bill> getBills() {
        return repository.findAll();
    }

    public Bill getBillById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
