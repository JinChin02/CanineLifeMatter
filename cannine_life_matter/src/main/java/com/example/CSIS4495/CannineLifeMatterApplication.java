package com.example.CSIS4495;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.CSIS4495.model.Clinic;
import com.example.CSIS4495.model.ClinicRepository;
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
	ApplicationRunner init(DogRepository dogRepository, UserRepository userRepository, ClinicRepository clinicRepository) {
		return args->{
			
			bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
			
			userRepository.deleteAll();
			dogRepository.deleteAll();
			clinicRepository.deleteAll();

			// user input
			User user1= new User();
			user1.setUsername("Aria");
			user1.setPassword(bCryptPasswordEncoder.encode("123"));
			;
			userRepository.save(user1);	
			

			User user2= new User();
			user2.setUsername("Jack");
			user2.setPassword(bCryptPasswordEncoder.encode("123"));
			userRepository.save(user2);	
			userRepository.findAll().forEach(System.out::println);
			
			
			// dog input 
			Dog dog1= new Dog();
			dog1.setDogname("James");
			dog1.setBreed("Poodle");
			dog1.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747983%2FPoodle2_nvztuk.jpg");			
			dog1.setOwner(user2);
			dog1.setIsAdopted(0);
			dogRepository.save(dog1);
			
			Dog dog2= new Dog();
			dog2.setDogname("James2");
			dog2.setBreed("Poodle");
			dog2.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747978%2FPoodle1_fhnnpm.jpg");			
			dog2.setOwner(user1);
			dog2.setIsAdopted(0);
			dogRepository.save(dog2);
			
			Dog dog3= new Dog();
			dog3.setDogname("James3");
			dog3.setBreed("Golden Retriever");
			dog3.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747965%2Fgolden_retriever1_wlhy3a.png");	
			dog3.setOwner(user1);
			dog3.setIsAdopted(0);
			dogRepository.save(dog3);
			
			Dog dog4= new Dog();
			dog4.setDogname("James4");
			dog4.setBreed("American Bulldog");
			dog4.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog4.setOwner(user1);
			dog4.setIsAdopted(0);
			dogRepository.save(dog4);		
			
			Dog dog5= new Dog();
			dog5.setDogname("James5");
			dog5.setBreed("labrador");
			dog5.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085595%2Flabrador1_ullbg8.jpg");	
			dog5.setOwner(user1);
			dog5.setIsAdopted(0);
			dogRepository.save(dog5);	
			
			Dog dog6= new Dog();
			dog6.setDogname("James6");
			dog6.setBreed("chihuahua");
			dog6.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085594%2Fchihuahua3_vdmt6i.jpg");	
			dog6.setOwner(user1);
			dog6.setIsAdopted(0);
			dogRepository.save(dog6);	
			
			Dog dog7= new Dog();
			dog7.setDogname("James7");
			dog7.setBreed("chihuahua");
			dog7.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085566%2Fchihuahua1_muw0zu.jpg");	
			dog7.setOwner(user1);
			dog7.setIsAdopted(0);
			dogRepository.save(dog7);	
			
			Dog dog8= new Dog();
			dog8.setDogname("James8");
			dog8.setBreed("labrador");
			dog8.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085594%2Flabrador3_azpwsl.jpg");	
			dog8.setOwner(user1);
			dog8.setIsAdopted(0);
			dogRepository.save(dog8);	
			
			Dog dog9= new Dog();
			dog9.setDogname("James9");
			dog9.setBreed("chihuahua");
			dog9.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085576%2Fchihuahua2_jd8gv1.jpg");	
			dog9.setOwner(user1);
			dog9.setIsAdopted(0);
			dogRepository.save(dog9);	
			
			dogRepository.findAll().forEach(System.out::println);
			
			
			// Clinic input 
			Clinic clinic1 = new Clinic();
			clinic1.setName("Clinic1");
			clinic1.setLat(49.208153982254956);
			clinic1.setLng(-122.92310370703693);
			clinicRepository.save(clinic1);
			
			Clinic clinic2 = new Clinic();
			clinic2.setName("Clinic2");
			clinic2.setLat(49.21421018050347);
			clinic2.setLng(-122.90971061761758);
			clinicRepository.save(clinic2);
			
			Clinic clinic3 = new Clinic();
			clinic3.setName("Clinic3");
			clinic3.setLat(49.20905073530374);
			clinic3.setLng(-122.93409180673292);
			clinicRepository.save(clinic3);
			
			clinicRepository.findAll().forEach(System.out::println);
			
		};
	}
}
