package com.example.demo.repositories;
import com.example.demo.models.Boarding;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardingRepository extends JpaRepository<Boarding, Long> {
}
