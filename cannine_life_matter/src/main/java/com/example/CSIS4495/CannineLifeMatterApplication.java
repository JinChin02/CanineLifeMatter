package com.example.CSIS4495;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.CSIS4495.model.Dog;
import com.example.CSIS4495.model.DogRepository;
import com.example.CSIS4495.model.User;
import com.example.CSIS4495.model.UserRepository;

@SpringBootApplication
public class CannineLifeMatterApplication {
	
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(CannineLifeMatterApplication.class, args);
	}
	
	@Bean
	ApplicationRunner init(DogRepository dogRepository, UserRepository userRepository) {
		return args->{
			
			bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
			
			userRepository.deleteAll();
			dogRepository.deleteAll();

			
			
			User user1= new User();
			user1.setUsername("Aria");
			user1.setPassword(bCryptPasswordEncoder.encode("123"));
			;
			userRepository.save(user1);	
			userRepository.findAll().forEach(System.out::println);
			
			Dog dog1= new Dog();
			dog1.setDogname("James");
			dog1.setBreed("Poodle");
			dog1.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747983%2FPoodle2_nvztuk.jpg");			
			dog1.setOwner(user1);
			dogRepository.save(dog1);
			
			Dog dog2= new Dog();
			dog2.setDogname("James2");
			dog2.setBreed("Poodle");
			dog2.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747978%2FPoodle1_fhnnpm.jpg");			
			dog2.setOwner(user1);
			dogRepository.save(dog2);
			
			Dog dog3= new Dog();
			dog3.setDogname("James3");
			dog3.setBreed("Golden Retriever");
			dog3.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747965%2Fgolden_retriever1_wlhy3a.png");	
			dog3.setOwner(user1);
			dogRepository.save(dog3);
			
			Dog dog4= new Dog();
			dog4.setDogname("James4");
			dog4.setBreed("American Bulldog");
			dog4.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog4.setOwner(user1);
			dogRepository.save(dog4);		
			
			Dog dog5= new Dog();
			dog5.setDogname("James4");
			dog5.setBreed("American Bulldog");
			dog5.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog5.setOwner(user1);
			dogRepository.save(dog5);	
			
			Dog dog6= new Dog();
			dog6.setDogname("James4");
			dog6.setBreed("American Bulldog");
			dog6.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog6.setOwner(user1);
			dogRepository.save(dog6);	
			
			Dog dog7= new Dog();
			dog7.setDogname("James4");
			dog7.setBreed("American Bulldog");
			dog7.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog7.setOwner(user1);
			dogRepository.save(dog7);	
			
			Dog dog8= new Dog();
			dog8.setDogname("James4");
			dog8.setBreed("American Bulldog");
			dog8.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog8.setOwner(user1);
			dogRepository.save(dog8);	
			
			Dog dog9= new Dog();
			dog9.setDogname("James4");
			dog9.setBreed("American Bulldog");
			dog9.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog9.setOwner(user1);
			dogRepository.save(dog9);	
			
			dogRepository.findAll().forEach(System.out::println);
			
			
			
		};
	}
}
