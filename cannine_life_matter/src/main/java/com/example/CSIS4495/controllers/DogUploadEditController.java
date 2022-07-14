package com.example.CSIS4495.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSIS4495.model.Dog;
import com.example.CSIS4495.model.DogRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class DogUploadEditController {

	
	@Autowired
	DogRepository dogRepository;

	
	@PostMapping("/createDog")
	public ResponseEntity<Dog> searchDog(@RequestBody Dog dog) {
		try {
			Dog currentDog = new Dog();
			currentDog.setDogname(dog.getDogname());
			currentDog.setBreed(dog.getBreed());
			currentDog.setDogDescription(dog.getDogDescription());
			currentDog.setDogURL(dog.getDogURL());
			currentDog.setOwner(dog.getOwner());
			currentDog.setIsAdopted(0);
			currentDog.setLatitude(dog.getLatitude());
			currentDog.setLongitude(dog.getLongitude());
			currentDog.setVaccinationStatus(dog.getVaccinationStatus());
			dogRepository.save(currentDog);
			return new ResponseEntity<Dog>(currentDog,HttpStatus.OK);
			
		} catch (Exception e) {
			return new ResponseEntity<Dog>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// owner, dogId, isAdopted cannot be reset 
	@PutMapping("/editDog")
	public ResponseEntity<Dog> editDog(@RequestBody Dog dog) {
		try {
			Optional<Dog> currentDog = dogRepository.findById(dog.getId());
			if (currentDog.isPresent()) {
			
				currentDog.get().setDogname(dog.getDogname());
				currentDog.get().setBreed(dog.getBreed());
				currentDog.get().setDogDescription(dog.getDogDescription());
				currentDog.get().setDogURL(dog.getDogURL());
				currentDog.get().setLatitude(dog.getLatitude());
				currentDog.get().setLongitude(dog.getLongitude());
				currentDog.get().setVaccinationStatus(dog.getVaccinationStatus());
				dogRepository.save(currentDog.get());
				return new ResponseEntity<Dog>(currentDog.get(),HttpStatus.OK);
			}else {
				return new ResponseEntity<Dog>(HttpStatus.NOT_FOUND);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<Dog>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
