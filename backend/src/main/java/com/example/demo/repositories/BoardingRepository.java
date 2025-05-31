package com.example.demo.repositories;
import com.example.demo.models.Boarding;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardingRepository extends JpaRepository<Boarding, Long> {
	
	
	
	    @Query("SELECT b FROM Boarding b WHERE " +
	           "(:district IS NULL OR b.district = :district) AND " +
	           "(:type IS NULL OR b.type = :type) AND " +
	           "(:address IS NULL OR b.address LIKE %:address%)")
	    List<Boarding> findBoardingsByCriteria(@Param("district") String district,
	                                           @Param("type") String type,
	                                           @Param("address") String address);
	

}
