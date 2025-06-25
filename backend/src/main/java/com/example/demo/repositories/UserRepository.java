package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.models.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
   
	
	List<Users> findByRole(String role);
	
	 
    Optional<Users> findByEmailAndPassword(String email, String password);
	
}
