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

   
    public Boarding createBoarding(String address, String phone, String price, String type, 
                                   Integer maxPersons, Integer roomCapacity, String district, 
                                   List<MultipartFile> images) {
        List<String> imagePaths = new ArrayList<>();
        try {
            for (MultipartFile image : images) {
                String imagePath = saveImage(image);
                imagePaths.add(imagePath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error while saving images: " + e.getMessage(), e);
        }

        Boarding boarding = new Boarding();
        boarding.setAddress(address);
        boarding.setPhone(phone);
        boarding.setPrice(price);
        boarding.setType(type);
        boarding.setMaxPersons(maxPersons);
        boarding.setRoomCapacity(roomCapacity);
        boarding.setDistrict(district);
        boarding.setImagePaths(imagePaths);

        return boardingRepository.save(boarding);
    }

   
    public List<Boarding> getAllBoardings() {
        return boardingRepository.findAll();
    }

   
    public List<Boarding> searchBoardings(String district, String type, String address) {
        return boardingRepository.findBoardingsByCriteria(district, type, address);
    }

   
    private String saveImage(MultipartFile image) throws IOException {
        String uploadDir = "C:\\Users\\NMC\\OneDrive\\Documents\\GitHub\\Rent-It-E-commerce-project\\uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        File file = new File(uploadDir + fileName);
        image.transferTo(file);

        // Return the URL path to the image
        return "http://localhost:8080/" + fileName;
    }


}
