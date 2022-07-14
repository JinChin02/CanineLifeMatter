package com.example.CSIS4495.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSIS4495.model.Dog;
import com.example.CSIS4495.model.DogRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class DogSearchController {

	@Autowired
	DogRepository dogRepository;

	@PostMapping("/searchDog")
	public ResponseEntity<List<Dog>> searchDog(@RequestBody String dogBreed) {
		String currentDogBreed =  dogBreed.substring(0,dogBreed.length()-1);
		List<Dog> dogList = dogRepository.findAll();
		List<Dog> tmp_arrayDogs = serialSearchDog(dogList, currentDogBreed);
		if (tmp_arrayDogs.isEmpty()) {
			return new ResponseEntity<List<Dog>>(HttpStatus.NOT_FOUND);
		} else
			return new ResponseEntity<List<Dog>>(tmp_arrayDogs, HttpStatus.OK);
	}
	
	private static List<Dog> serialSearchDog(List<Dog> array, String inputDogBreed) {
		List<Dog> tempArray = new ArrayList<Dog>();
		for (int i = 0; i < array.size(); i++) {
			if (array.get(i).getBreed().toLowerCase().contains(inputDogBreed.toLowerCase())&&array.get(i).getIsAdopted()==0) {
				tempArray.add(array.get(i));
			}
		}
		return tempArray;
	}

}