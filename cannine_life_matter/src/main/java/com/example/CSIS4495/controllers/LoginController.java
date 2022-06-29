package com.example.CSIS4495.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.CSIS4495.model.User;
import com.example.CSIS4495.model.UserRepository;

@RestController
@CrossOrigin(origins= "http://localhost:4200/")
public class LoginController {
	
	@Autowired
	UserRepository userRepository; 
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@GetMapping("/login")
	public ResponseEntity<List<User>> getAllUsers(){
		List<User> userList= new ArrayList<User>();
		userRepository.findAll().forEach(userList::add);
		return new ResponseEntity<List<User>>(userList, HttpStatus.OK);
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<User> userLogin(@RequestBody User user){
		bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
		String userName= user.getUsername();
		String password = user.getPassword(); 
		for (User existedUser : userRepository.findAll()) {
			if (userName.equalsIgnoreCase(existedUser.getUsername())&& bCryptPasswordEncoder
					.matches(password, existedUser.getPassword())) {
				return new ResponseEntity<User>(existedUser,HttpStatus.OK);
			}
		}
		return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
	}
}
