package com.example.CSIS4495.controllers;


import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSIS4495.model.Dog;
import com.example.CSIS4495.model.DogRepository;
import com.example.CSIS4495.model.User;
import com.example.CSIS4495.model.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class DogAdoptController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	DogRepository dogRepository;
	
	@PostMapping("/adopt/{userid}/{dogId}")
	public ResponseEntity<Dog> searchDog(@PathVariable long userid, @PathVariable long dogId) {
		try {
			// 1. get dog obj and set it to adopt 
			Dog thisDog= dogRepository.findById(dogId).get();
			thisDog.setIsAdopted(1);
			dogRepository.save(thisDog);
			// 2. we need to cancel this dog from origin user 
			User OriginUser = dogRepository.findById(dogId).get().getOwner();
			Set<Dog> originUserDogList = OriginUser.getDogs();
			if (originUserDogList.contains(thisDog)) {
				originUserDogList.remove(thisDog);
			}
			OriginUser.setDogs(originUserDogList);	
			userRepository.save(OriginUser);
			// 3. add this dog to new user 
			User newUser = userRepository.findById(userid).get();
			newUser.addDog(thisDog);
			userRepository.save(newUser);
			return new ResponseEntity<Dog>(thisDog,HttpStatus.OK); 
			
			
		} catch (Exception e) {
			return new ResponseEntity<Dog>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
