package com.example.CSIS4495;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.CSIS4495.model.Dog;
import com.example.CSIS4495.model.DogRepository;
import com.example.CSIS4495.model.User;
import com.example.CSIS4495.model.UserRepository;

@SpringBootApplication
public class CannineLifeMatterApplication {

	public static void main(String[] args) {
		SpringApplication.run(CannineLifeMatterApplication.class, args);
	}
	
	@Bean
	ApplicationRunner init(DogRepository dogRepository, UserRepository userRepository) {
		return args->{
			
			userRepository.deleteAll();
			dogRepository.deleteAll();

			
			
			User user1= new User();
			user1.setUsername("Aria");
			userRepository.save(user1);	
			userRepository.findAll().forEach(System.out::println);
			
			Dog dog1= new Dog();
			dog1.setDogname("James");
			dog1.setBreed("Poodle");
			dog1.setOwner(user1);
			dogRepository.save(dog1);
			
			Dog dog2= new Dog();
			dog2.setDogname("James2");
			dog2.setBreed("Poodle");
			dog2.setOwner(user1);
			dogRepository.save(dog2);
			
			Dog dog3= new Dog();
			dog3.setDogname("James3");
			dog3.setBreed("Golden Retriever");
			dog3.setOwner(user1);
			dogRepository.save(dog3);
			
			
			dogRepository.findAll().forEach(System.out::println);
			
			
			
		};
	}
}
