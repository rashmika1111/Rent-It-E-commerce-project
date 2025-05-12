package com.example.demo.service;

import com.example.demo.models.Users;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users createUser(Users user) {
        return userRepository.save(user);
    }

    public List<Users> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }
    
    // Login user by email and password
    public Users loginUser(String email, String password) {
        Optional<Users> user = userRepository.findByEmailAndPassword(email, password);
        return user.orElse(null);
    }
}
