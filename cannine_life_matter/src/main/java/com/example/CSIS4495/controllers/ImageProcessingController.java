package com.example.CSIS4495.controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.example.CSIS4495.model.Dog;
import com.example.CSIS4495.model.DogRepository;
import com.example.CSIS4495.model.User;
import com.example.CSIS4495.model.UserRepository;

import lombok.var;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class ImageProcessingController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	DogRepository dogRepository;
	
	
	@GetMapping("/getAllDogs")
	public ResponseEntity <List<Dog>> getAllDog(){
		List<Dog> dogList= dogRepository.findAll();
		List<Dog> dogNotAdopteDogs = new ArrayList<Dog>();
		for (Dog dog: dogList) {
			if (dog.getIsAdopted()==0) {
				dogNotAdopteDogs.add(dog);
			}
		}
		
		if (dogList.isEmpty()) {
			return new ResponseEntity<List<Dog>>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<List<Dog>>(dogNotAdopteDogs,HttpStatus.OK);
		}
	}	
	

	@PutMapping("/uploadImage/user/{id}")
	public ResponseEntity<User> uploadImage(@PathVariable("id") long id, @RequestBody String imageUrl)
			throws IOException {
		Optional<User> userList = userRepository.findById(id);
		if (userList.isPresent()) {
			User user = userList.get();
			user.setUserURL(imageUrl);
			userRepository.save(user);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} else
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/uploadDog/dog/{userid}")
	public ResponseEntity<Dog> uploadDogImage(@PathVariable("userid") long userid,@RequestBody Dog dog){
		Optional<User>currentUser = userRepository.findById(userid);
		if (currentUser.isPresent()) {
			Dog currentDog = new Dog();
			currentDog.setDogname(dog.getDogname());
			currentDog.setDogDescription(dog.getDogDescription());
			currentDog.setDogURL(dog.getDogURL());
			currentDog.setBreed(dog.getBreed());
			currentDog.setLatitude(dog.getLatitude());
			currentDog.setLongitude(dog.getLongitude());
			currentDog.setIsAdopted(dog.getIsAdopted());
			currentDog.setVaccinationStatus(dog.getVaccinationStatus());
			currentUser.get().addDog(currentDog);
			dogRepository.save(currentDog);
			userRepository.save(currentUser.get());
			return new ResponseEntity<Dog>(currentDog,HttpStatus.OK);
		}else {
			return new ResponseEntity<Dog>(HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping("/getDog/{id}")
	public ResponseEntity<Dog> uploadDogImage(@PathVariable("id") long id){
		Optional<Dog> dogList = dogRepository.findById(id);
		if (dogList.isPresent()) {
			return new ResponseEntity<Dog>(dogList.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Dog>(HttpStatus.NOT_FOUND);
		}
	}
	



	
}
