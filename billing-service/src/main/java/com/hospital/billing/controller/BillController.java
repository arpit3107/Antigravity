package com.hospital.billing.controller;

import com.hospital.billing.entity.Bill;
import com.hospital.billing.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/bills")
public class BillController {

    @Autowired
    private BillService service;

    @PostMapping
    public Bill createBill(@RequestBody Bill bill) {
        return service.createBill(bill);
    }

    @GetMapping
    public List<Bill> findAllBills() {
        return service.getBills();
    }

    @GetMapping("/{id}")
    public Bill findBillById(@PathVariable Long id) {
        return service.getBillById(id);
    }
}
