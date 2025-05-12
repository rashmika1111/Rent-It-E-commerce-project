package com.example.demo.controller;

import com.example.demo.models.Boarding;
import com.example.demo.service.BoardingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/boardings")
public class BoardingController {

    @Autowired
    private BoardingService boardingService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Boarding> createBoarding(
            @RequestParam String address,
            @RequestParam String phone,
            @RequestParam String price,
            @RequestParam String type,
            @RequestParam(required = false) Integer maxPersons,
            @RequestParam(required = false) Integer roomCapacity,
            @RequestParam String district,
            @RequestParam("images") List<MultipartFile> images
    ) {
        Boarding boarding = boardingService.createBoarding(address, phone, price, type, maxPersons, roomCapacity, district, images);
        return ResponseEntity.ok(boarding);
    }

    @GetMapping
    public ResponseEntity<List<Boarding>> getAllBoardings() {
        return ResponseEntity.ok(boardingService.getAllBoardings());
    }
}
