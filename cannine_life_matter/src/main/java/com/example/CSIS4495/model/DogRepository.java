package com.example.CSIS4495.model;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DogRepository extends JpaRepository<Dog, Long> {
	
	
	@Query(value = "SELECT D FROM Dog D WHERE D.latitude<=:Maxlat AND D.latitude>=:Minlat AND D.longitude <=:MaxLng AND D.longitude >=:MinLng")
	List<Dog> findDogsInRange( @Param("Maxlat") Double Maxlat,  @Param("Minlat") Double Minlat,@Param("MaxLng")
	Double MaxLng, @Param("MinLng")Double MinLng);
}
