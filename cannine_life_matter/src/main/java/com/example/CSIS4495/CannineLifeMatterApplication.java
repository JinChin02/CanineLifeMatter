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
			
			
			
			Dog dog1= new Dog();
			dog1.setDogname("Robert");
			dog1.setBreed("Poodle");
			dog1.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747983%2FPoodle2_nvztuk.jpg");			
			dog1.setOwner(user2);
			dog1.setIsAdopted(0);
			dog1.setLatitude(49.207843406821624);
			dog1.setLongitude(-122.90177540682008);
			dogRepository.save(dog1);
			
			Dog dog2= new Dog();
			dog2.setDogname("John");
			dog2.setBreed("Poodle");
			dog2.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747978%2FPoodle1_fhnnpm.jpg");			
			dog2.setOwner(user1);
			dog2.setIsAdopted(0);
			dog2.setLatitude(49.21060736956497);
			dog2.setLongitude(-122.92600328435951);
			dogRepository.save(dog2);
			
			Dog dog3= new Dog();
			dog3.setDogname("Michael");
			dog3.setBreed("Golden Retriever");
			dog3.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747965%2Fgolden_retriever1_wlhy3a.png");	
			dog3.setOwner(user1);
			dog3.setIsAdopted(0);
			dog3.setLatitude(49.21695421190464);
			dog3.setLongitude(-122.90961621434131);
			dogRepository.save(dog3);
			
			
			Dog dog4= new Dog();
			dog4.setDogname("David");
			dog4.setBreed("American Bulldog");
			dog4.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog4.setOwner(user1);
			dog4.setIsAdopted(0);
			dog4.setLatitude(49.21119827631807);
			dog4.setLongitude( -122.87386603610088);
			dogRepository.save(dog4);		
			
			Dog dog5= new Dog();
			dog5.setDogname("William");
			dog5.setBreed("labrador");
			dog5.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085595%2Flabrador1_ullbg8.jpg");	
			dog5.setOwner(user1);
			dog5.setIsAdopted(0);
			dog5.setLatitude(49.214335559806095);
			dog5.setLongitude( -122.94498446880101);
			dogRepository.save(dog5);	
			
			Dog dog6= new Dog();
			dog6.setDogname("Richard");
			dog6.setBreed("chihuahua");
			dog6.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085594%2Fchihuahua3_vdmt6i.jpg");	
			dog6.setOwner(user1);
			dog6.setIsAdopted(0);
			dog6.setLatitude(49.21598623201734);
			dog6.setLongitude(-122.93551712190988);
			dogRepository.save(dog6);	
			
			Dog dog7= new Dog();
			dog7.setDogname("Joseph");
			dog7.setBreed("chihuahua");
			dog7.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085566%2Fchihuahua1_muw0zu.jpg");	
			dog7.setOwner(user1);
			dog7.setIsAdopted(0);
			dog7.setLatitude(49.22176628510301);
			dog7.setLongitude(-122.92922628120704);
			dogRepository.save(dog7);	
			
			Dog dog8= new Dog();
			dog8.setDogname("Thomas");
			dog8.setBreed("labrador");
			dog8.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085594%2Flabrador3_azpwsl.jpg");	
			dog8.setOwner(user1);
			dog8.setIsAdopted(0);
			dog8.setLatitude(49.21689489840684);
			dog8.setLongitude(-122.92689110437357);
			dogRepository.save(dog8);	
			
			Dog dog9= new Dog();
			dog9.setDogname("Charles");
			dog9.setBreed("chihuahua");
			dog9.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085576%2Fchihuahua2_jd8gv1.jpg");	
			dog9.setOwner(user1);
			dog9.setIsAdopted(0);
			dog9.setLatitude(49.22227250710195);
			dog9.setLongitude( -122.89984175539256);
			dogRepository.save(dog9);	
			
			dogRepository.findAll().forEach(System.out::println);
			
			
			// 49.204248578758396, -122.90940678864632
			Clinic clinic1 = new Clinic();
			clinic1.setName("Royal City Paws Pet Centre");
			clinic1.setLat(49.204248578758396);
			clinic1.setLng( -122.90940678864632);
			clinic1.setAddress("660 Columbia St, New Westminster, BC V3M 1A9");
			clinic1.setDescription("Our Services:"
					+ "• PAWS Veterinary Clinic"
					+ "• In House Lab & Digital "
					+ "• Veterinary Dentistry & Dental X-Ray"
					+ "• Titer Testing and Vaccination"
					+ "• Full Service Grooming");
			clinicRepository.save(clinic1);
			
			Clinic clinic2 = new Clinic();
			clinic2.setName("Alpine Animal Hospital");
			clinic2.setLat(49.212002128754285);
			clinic2.setLng( -122.9161194839417);
			clinic2.setAddress("348 6th St, New Westminster, BC V3L 3B1");
			clinic2.setDescription("At Alpine Animal Hospital, we are a team of dedicated health care professionals passionate about providing your pets with comprehensive treatment and care.");
			clinicRepository.save(clinic2);
			
			Clinic clinic3 = new Clinic();
			clinic3.setName("Central City Animal Hospital");
			clinic3.setLat(49.222427787676445);
			clinic3.setLng(-122.92864034590828);
			clinic3.setAddress("1-7834 6th St, Burnaby, BC V3N 3N2");
			clinic3.setDescription("Dental disease is the most common disease affecting adult dogs and cats. Maintaining a regular tooth brushing regime is the easiest thing we can do for our pets to keep them in their best health.");
			clinicRepository.save(clinic3);
			
			

			Clinic clinic4 = new Clinic();
			clinic4.setName("South Burnaby Veterinary Hospital");
			clinic4.setLat(49.22523027761946);
			clinic4.setLng(-122.94194927881702);
			clinic4.setAddress("7665 Edmonds St, Burnaby, BC V3N 1B6");
			clinic4.setDescription("South Burnaby Veterinary Hospital was founded in 1987.");
			clinicRepository.save(clinic4);
			
			
			Clinic clinic5 = new Clinic();
			clinic5.setName("Burnaby New Westminster Animal Hospital");
			clinic5.setLat(49.21626595734754);
			clinic5.setLng(-122.93809452998171);
			clinic5.setAddress("7877 Kingsway Avenue, Burnaby, BC V3N 3E4");
			clinic5.setDescription("At Burnaby New Westminster Hospital CARE is first and foremost. You can be assured our love for pets and their people will be evident during all interactions with you and your pet. WE LOVE PETS!");
			clinicRepository.save(clinic5);
			
		
			Clinic clinic6 = new Clinic();
			clinic6.setName("Columbia Square Animal Hospital");
			clinic6.setLat(49.203619775096286);
			clinic6.setLng(-122.91748645960489);
			clinic6.setAddress("1015 Columbia St, New Westminster, BC V3M 6H6");
			clinic6.setDescription("You’re just going to sleep a little bit easier knowing that your pet is cared for by such an exceptionally skilled team.");
			clinicRepository.save(clinic6);
			
			
			
			clinicRepository.findAll().forEach(System.out::println);
			
		};
	}
}
