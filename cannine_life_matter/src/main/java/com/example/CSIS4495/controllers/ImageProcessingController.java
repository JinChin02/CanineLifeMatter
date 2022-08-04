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
	

//	@PostMapping("/uploadImage/dog/{id}")
//	public ResponseEntity<Dog> uploadDogImage(@PathVariable("id") long id, @RequestBody String imageUrl)
//			throws IOException {
//		Optional<Dog> dogList = dogRepository.findById(id);
//		if (dogList.isPresent()) {
//			Dog dog = dogList.get();
//			dog.setDogURL(imageUrl);
//			System.out.println(imageUrl);
//			dogRepository.save(dog);
//			return new ResponseEntity<Dog>(dog, HttpStatus.OK);
//		} else {
//			return new ResponseEntity<Dog>(HttpStatus.NOT_FOUND);
//		}
//	}
	
	@GetMapping("/getDog/{id}")
	public ResponseEntity<Dog> uploadDogImage(@PathVariable("id") long id){
		Optional<Dog> dogList = dogRepository.findById(id);
		if (dogList.isPresent()) {
			return new ResponseEntity<Dog>(dogList.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Dog>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/imageProcessing")
	public ResponseEntity<String> imageProcessing(@RequestBody String imageURL) throws IOException {

		 	System.out.println(imageURL);
		    String decodeImageURlWithEqual =URLDecoder.decode(imageURL, StandardCharsets.UTF_8.toString());
		 	String decodeImageURl=decodeImageURlWithEqual.substring(0,decodeImageURlWithEqual.length()-1);
		 	System.out.println(decodeImageURl);
			String result = getBreedByImage(decodeImageURl);
			if(result == null) {
				return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
			}
			else {
				return new ResponseEntity<String>( result ,HttpStatus.OK); 
			}
			
			

	}
	


	
	private String getBreedByImage(String imgUrl) throws IOException {
		StringBuffer command = new StringBuffer();
		command.append("cmd /c C:");
		command.append("&& cd C:\\Users\\jerry\\Desktop\\4495\\yolov5-master");
		command.append("&& activate");
		command.append("&& conda activate yolov5");
		command.append("&& python downloadImg.py " + imgUrl);
		command.append("&& python detect.py --source dog_breed\\images\\temp.jpg --weights best.pt");

		command.append("&& conda deactivate");
		String arguments = command.toString();

		Process p = Runtime.getRuntime().exec(arguments);
		final InputStream is1 = p.getInputStream();
		new Thread(new Runnable() {
			public void run() {
				BufferedReader br = new BufferedReader(new InputStreamReader(is1));
				try {
					String outputLine = null;
					while ((outputLine = br.readLine()) != null) {
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}).start();
		InputStream is2 = p.getErrorStream();
		BufferedReader br2 = new BufferedReader(new InputStreamReader(is2));
		StringBuilder buf = new StringBuilder();
		String line = null;

		while ((line = br2.readLine()) != null) {
			System.out.println(line);
			String[] temp = line.split("\\s+");
			
			if (temp[0].equals("image")) {
				buf.append(temp[temp.length - 3] + "\n");
				//System.out.println(temp.length);
			}
			if (temp.length==9) {
				
				buf.setLength(0);
				buf.append("Not detected  ");
			}
			
			
		}
		
		//System.out.println(buf);
		String result = buf.substring(0, buf.length() - 2);
		
		while (br2.readLine() != null)
			;
		try {
			p.waitFor();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		return result;
			
			
	}
}