package com.example.CSIS4495.controllers;

import java.io.BufferedReader;
import java.io.IOException;
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

	@PostMapping("/uploadImage/dog/{id}")
	public ResponseEntity<Dog> uploadDogImage(@PathVariable("id") long id, @RequestBody String imageUrl)
			throws IOException {
		Optional<Dog> dogList = dogRepository.findById(id);
		if (dogList.isPresent()) {
			Dog dog = dogList.get();
			dog.setDogURL(imageUrl);
			System.out.println(imageUrl);
			dogRepository.save(dog);
			return new ResponseEntity<Dog>(dog, HttpStatus.OK);
		} else {
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
	
	@PostMapping("/imageProcessing")
	public ResponseEntity<String> imageProcessing(@RequestBody String imageURL) throws UnsupportedEncodingException{
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
	
	
	private String execProcess(String cmdStr) {
		
		Process process = null;
        String result = "";
        try {
            process = Runtime.getRuntime().exec(cmdStr);
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream(), "utf-8"));
            String line;
            while ((line = in.readLine()) != null) {
                result = line;
            }
            in.close();
            process.waitFor();
            return result;

        } catch (Exception e) {
            e.printStackTrace();
            return result;
        } finally {
            process.destroy();
        }
	}
	
	private String getBreedByImage(String imgUrl) {
		
		StringBuffer command = new StringBuffer();
        command.append("cmd /c C:");
        command.append("&& cd C:\\Users\\nirdo\\OneDrive - Douglas College\\Desktop\\4495\\yolov5-master");
        command.append("&& activate");
        command.append("&& conda activate yolov5");
        command.append("&& python downloadImg.py " + imgUrl);
        command.append("&& python detect.py --source dog_breed\\images\\temp.jpg --weights best.pt");
        command.append("&& conda deactive");
        String arguments=command.toString();
        System.out.println(arguments);
        try {
            Process process = Runtime.getRuntime().exec(arguments);
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream(), "GBK"));
            String line = null;
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }
            in.close();
            int re = process.waitFor();
            System.out.println(process);
            System.out.println("Call result:");
            System.out.println(re);
            System.out.println(arguments);
   
            String cmdstr = arguments;
            String s = execProcess(cmdstr);
            System.out.println("##################"); 
            //System.out.println(s); 
            System.out.println("Dog Breed is: "); 
            String[] splitStr=s.split("\\s+");
            String breed=splitStr[splitStr.length-3];
            breed=breed.substring(0,breed.length()-1);
            System.out.println(breed); 
            return breed;
            
       
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
		
		
	}
}
