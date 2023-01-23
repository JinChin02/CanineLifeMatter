package com.example.CSIS4495.controllers;


import java.util.Properties;
import java.util.Set;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

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
@CrossOrigin(origins = "http://localhost:4200/")
public class DogAdoptController {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	DogRepository dogRepository;
	
	private User OriginUser; 
	private User newUser; 
	private Dog thisDog;
	
	@PostMapping("/adopt/{userid}/{dogId}")
	public ResponseEntity<Dog> searchDog(@PathVariable long userid, @PathVariable long dogId) {
		try {
			// 1. get dog obj and set it to adopt 
//			Dog thisDog= dogRepository.findById(dogId).get();
//			User OriginUser = dogRepository.findById(dogId).get().getOwner();
			thisDog = dogRepository.findById(dogId).get();
			OriginUser = thisDog.getOwner();
			thisDog.setIsAdopted(1);
			
			//edit here
			thisDog.setPreviosOwner(OriginUser.getId());
			dogRepository.save(thisDog);
			// 2. we need to cancel this dog from origin user 	
			Set<Dog> originUserDogList = OriginUser.getDogs();
			if (originUserDogList.contains(thisDog)) {
				originUserDogList.remove(thisDog);
			}
			OriginUser.setDogs(originUserDogList);	
			
			//edit here
			OriginUser.addNotification(thisDog.getDogname());
			userRepository.save(OriginUser);
			// 3. add this dog to new user 
			newUser = userRepository.findById(userid).get();
			newUser.addDog(thisDog);
			userRepository.save(newUser);
			return new ResponseEntity<Dog>(thisDog,HttpStatus.OK); 
			
			
		} catch (Exception e) {
			return new ResponseEntity<Dog>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	@GetMapping("/sendMail")
	public ResponseEntity<String> sendEmail(){
		try {
			sendMail();
			return new ResponseEntity<String> (HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<String> (HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	public void sendMail() {
		
		 // Recipient's email ID needs to be mentioned.
        String to = OriginUser.getEmail();
        String to2 = newUser.getEmail();

        // Sender's email ID needs to be mentioned
        String from = "dabianlaa@gmail.com";

        String host = "smtp.gmail.com";

        // Setup mail server
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "587");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true");

        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("dabianlaa@gmail.com", "wwlohwgutnexjjjy");
            }
        });

        // Used to debug SMTP issues
        session.setDebug(true);

        try {
        
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject("Canine Life Matter : Good Day "+OriginUser.getUsername()+", Your dog has been adopted!");
            message.setText(newUser.getUsername() +  " intend to adopt "+thisDog.getDogname() +"."
            		+ "\n\n"+newUser.getUsername()+"'s Details:"
            		+ "\nEmail : "+newUser.getEmail()
            		+ "\nContact Number : " + newUser.getPhoneNumber());
            Transport.send(message);
            System.out.println("Sent message to old owner successfully....");
            
            // send message to new owner 
            MimeMessage message2 = new MimeMessage(session);
            message2.setFrom(new InternetAddress(from));
            message2.addRecipient(Message.RecipientType.TO, new InternetAddress(to2));
            message2.setSubject("Canine Life Matter : Good Day " +newUser.getUsername()+", You adopted a new Canine");
            message2.setText("You have requested to adopt "+thisDog.getDogname() +"."
            		+ "\nContact details of original owner is provided below."
            		+ "\n\nDetails:"
            		+ "\nOriginal Owner :" + OriginUser.getUsername()
            		+ "\nEmail : "+OriginUser.getEmail()
            		+ "\nContact Number : " + OriginUser.getPhoneNumber());
            Transport.send(message2);
            System.out.println("Sent message to new owner successfully....");
            
          
            
        } catch (MessagingException mex) {
            mex.printStackTrace();
        }
		
	}
}