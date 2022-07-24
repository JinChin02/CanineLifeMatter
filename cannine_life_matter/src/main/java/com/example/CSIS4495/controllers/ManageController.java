package com.example.CSIS4495.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.websocket.server.PathParam;

import org.hibernate.engine.query.spi.sql.NativeSQLQueryCollectionReturn;
import org.hibernate.loader.plan.exec.process.spi.ReturnReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSIS4495.model.Dog;
import com.example.CSIS4495.model.DogRepository;
import com.example.CSIS4495.model.User;
import com.example.CSIS4495.model.UserRepository;

@RestController
@CrossOrigin(origins= "http://localhost:4200/")
public class ManageController {
	
	@Autowired
	UserRepository userRepository; 
	
	@Autowired
	DogRepository dogRepository;
	
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getOneUsers(@PathVariable("id") long id){
	 	User user =  userRepository.findById(id).get();
	 	return new ResponseEntity<User>(user,HttpStatus.OK);
	}
	
	
	@GetMapping("/user/adopt/{id}")
	public ResponseEntity<List<Dog>> getAllAdoptedDogsOfUser(@PathVariable("id") long id){
		List<Dog> dogList=getDogRealtiveToUser(id);
		List<Dog> adoptedDogs= new ArrayList<Dog>();
 		for(Dog dog:dogList) {
 			if (dog.getIsAdopted()==1) {
 				adoptedDogs.add(dog);
 			}
		}
		return new ResponseEntity<List<Dog>>(adoptedDogs,HttpStatus.OK);
	}
	
	@GetMapping("/user/find/{id}")
	public ResponseEntity<List<Dog>> getAllfindedDogsOfUser(@PathVariable("id") long id){
		List<Dog> dogList=getDogRealtiveToUser(id);
		List<Dog> adoptedDogs= new ArrayList<Dog>();
 		for(Dog dog:dogList) {
 			if (dog.getIsAdopted()==0) {
 				adoptedDogs.add(dog);
 			}
		}
		return new ResponseEntity<List<Dog>>(adoptedDogs,HttpStatus.OK);
	}
	
	private List<Dog> getDogRealtiveToUser(long userId) {
		List<Dog> dogList= new ArrayList<Dog>();
		try {
			Set<Dog> dogs =  userRepository.findById(userId).get().getDogs();
			Iterator<Dog> itr = dogs.iterator();
			while(itr.hasNext()){
				dogList.add(itr.next());
			}
			return dogList;	
		} catch (Exception e) {
			return dogList;
		}
	}
	@PostMapping("/deleteDog/{id}")
	public ResponseEntity<Dog> deleteOneDog(@PathVariable("id") long id) {
		try {
			dogRepository.deleteById(id);
			return new ResponseEntity(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
	}
}
