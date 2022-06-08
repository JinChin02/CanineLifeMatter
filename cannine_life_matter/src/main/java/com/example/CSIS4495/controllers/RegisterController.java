package com.example.CSIS4495.controllers;

import com.example.CSIS4495.model.User;
import com.example.CSIS4495.model.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class RegisterController {

	@Autowired
	UserRepository userRepository;

	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@PostMapping("/register")
	public ResponseEntity<User> registerNewUser(@RequestBody User user) {

		bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		System.out.println(user.getUsername());

		for (User userInRepo : userRepository.findAll()) {
			if (userInRepo.getUsername().equalsIgnoreCase(user.getUsername())) {
				System.out.println("in");
				return new ResponseEntity<User>(HttpStatus.NOT_ACCEPTABLE);
			}
		}

		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);

	}

}
