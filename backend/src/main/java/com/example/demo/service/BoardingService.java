package com.example.demo.service;

import com.example.demo.models.Boarding;
import com.example.demo.repositories.BoardingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardingService {

    @Autowired
    private BoardingRepository boardingRepository;

    // Method to create a new Boarding
    public Boarding createBoarding(String address, String phone, String price, String type, 
                                   Integer maxPersons, Integer roomCapacity, String district, 
                                   List<MultipartFile> images) {
        // Saving image paths to a list
        List<String> imagePaths = new ArrayList<>();
        try {
            for (MultipartFile image : images) {
                String imagePath = saveImage(image); // Save image and return its path
                imagePaths.add(imagePath);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Create a new Boarding object
        Boarding boarding = new Boarding();
        boarding.setAddress(address);
        boarding.setPhone(phone);
        boarding.setPrice(price);
        boarding.setType(type);
        boarding.setMaxPersons(maxPersons);
        boarding.setRoomCapacity(roomCapacity);
        boarding.setDistrict(district);  // Set the district
        boarding.setImagePaths(imagePaths);

        // Save to database
        return boardingRepository.save(boarding);
    }

    // Method to get all Boardings
    public List<Boarding> getAllBoardings() {
        return boardingRepository.findAll();
    }

    // Helper method to save image and return the file path
    private String saveImage(MultipartFile image) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        File file = new File("uploads/" + fileName);
        image.transferTo(file);  // Save the image to disk
        return file.getAbsolutePath();  // Return the file path
    }
}
