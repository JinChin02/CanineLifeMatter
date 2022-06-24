package com.example.CSIS4495.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CSIS4495.model.Clinic;
import com.example.CSIS4495.model.ClinicRepository;

@RestController
@CrossOrigin(origins= "http://localhost:4200/")
public class MapController {
	
	@Autowired
	ClinicRepository clinicRepository;
	
	@GetMapping("/clinic")
	public ResponseEntity<List<Clinic>> getAllClinics(){
		try {
			if (clinicRepository.count()==0) {
				return new ResponseEntity<List<Clinic>>(HttpStatus.NOT_FOUND);
			} else {
				List<Clinic> clinicList= clinicRepository.findAll();
				return new ResponseEntity<List<Clinic>>(clinicList,HttpStatus.OK);
			}
			
		} catch (Exception e) {
			return new ResponseEntity<List<Clinic>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
