package com.example.CSIS4495.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSIS4495.model.Bulletin;
import com.example.CSIS4495.model.BulletinRepository;
import com.example.CSIS4495.model.User;
import com.example.CSIS4495.model.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class BulletinController {

	@Autowired
	BulletinRepository bulletinRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/bulletins")
	public ResponseEntity<List<Bulletin>> getAllBulletins(){
		try {
			List<Bulletin> bulletins = new ArrayList<Bulletin>();
			bulletinRepository.findAll().forEach(bulletins::add);
			Collections.reverse(bulletins);
			return new ResponseEntity<List<Bulletin>>(bulletins,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<List<Bulletin>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/bulletins/{userID}")
	public ResponseEntity<Bulletin> createBulletin(@PathVariable("userID") long userid,@RequestBody Bulletin bulletin){
		try {
			Optional<User>currentUser = userRepository.findById(userid);
			Bulletin currentBulletin = new Bulletin();
			currentBulletin.setDate(bulletin.getDate());
			currentBulletin.setDescription(bulletin.getDescription());
			currentBulletin.setTime(bulletin.getTime());
			currentUser.get().addBullletin(currentBulletin);
			System.out.print(currentUser.get().getUsername());
			bulletinRepository.save(currentBulletin);
			userRepository.save(currentUser.get());
			return new ResponseEntity<Bulletin>(currentBulletin,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Bulletin>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	@DeleteMapping("/bulletins/{bulltineID}")
	public ResponseEntity<Bulletin> deleteComment(@PathVariable("bulltineID") long bulltineID){
		
		Optional<Bulletin> comment = bulletinRepository.findById(bulltineID);
		if ( comment.isPresent()) {
			bulletinRepository.deleteById(bulltineID);
			return new ResponseEntity<Bulletin>(comment.get(),HttpStatus.OK);
		} else {
			return new ResponseEntity<Bulletin>(HttpStatus.NOT_FOUND);
		}
	}
	
}