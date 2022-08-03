package com.example.CSIS4495.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSIS4495.model.Clinic;
import com.example.CSIS4495.model.ClinicRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class HospitalController {
	
	@Autowired
	ClinicRepository clinicRepository;
	
	@PostMapping("/uploadClinic")
	public ResponseEntity<Clinic> uploadClinic(@RequestBody Clinic clinic){
		try {
			clinicRepository.save(clinic);
			return new ResponseEntity<Clinic>(clinic,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Clinic>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
