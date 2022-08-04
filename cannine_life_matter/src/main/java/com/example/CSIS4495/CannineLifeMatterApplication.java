package com.example.CSIS4495;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.CSIS4495.model.Bulletin;
import com.example.CSIS4495.model.BulletinRepository;
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
	ApplicationRunner init(DogRepository dogRepository, UserRepository userRepository, ClinicRepository clinicRepository,BulletinRepository bulletinRepository) {
		return args->{
			
			bCryptPasswordEncoder = new BCryptPasswordEncoder(10);
			
			userRepository.deleteAll();
			dogRepository.deleteAll();
			clinicRepository.deleteAll();
			

			// user input
			User user1= new User();
			user1.setUsername("Liangku");
			user1.setPassword(bCryptPasswordEncoder.encode("123"));
			user1.setEmail("jerry031785@gmail.com");
			user1.setIsAdmin(1);
			user1.setPhoneNumber("7781231234");
			user1.setAddress("12118 95a Ave, Surrey, BC V3V 1P8");
			userRepository.save(user1);	
			
			

			User user2= new User();
			user2.setUsername("Jin");
			user2.setPassword(bCryptPasswordEncoder.encode("123"));
			user2.setEmail("chinjinhung@gmail.com");
			user2.setIsAdmin(0);
			user2.setPhoneNumber("7781233456");
			user2.setAddress("6688 Southoaks Crescent, Burnaby, BC V5E 4M7");
			userRepository.save(user2);	
			
			
			
			User user3= new User();
			user3.setUsername("Lin");
			user3.setPassword(bCryptPasswordEncoder.encode("123"));
			user3.setIsAdmin(0);
			user3.setEmail("iamaguard3@gmail.com");
			user3.setAddress("755 Burrard St #202, Vancouver, BC V6Z 1X6");
			user3.setPhoneNumber("7784434565");
			userRepository.save(user3);
			userRepository.findAll().forEach(System.out::println);
			
			
			
			
			Dog dog1= new Dog();
			dog1.setDogname("Robert");
			dog1.setBreed("Poodle");
			dog1.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747983%2FPoodle2_nvztuk.jpg");			
			dog1.setOwner(user2);
			dog1.setIsAdopted(0);
			dog1.setLatitude(49.207843406821624);
			dog1.setLongitude(-122.90177540682008);
			dog1.setDogDescription("A lovely Poodle.");
			dog1.setVaccinationStatus("YES");			
			dogRepository.save(dog1);
			
			Dog dog2= new Dog();
			dog2.setDogname("John");
			dog2.setBreed("Poodle");
			dog2.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747978%2FPoodle1_fhnnpm.jpg");			
			dog2.setOwner(user1);
			dog2.setIsAdopted(0);
			dog2.setLatitude(49.21060736956497);
			dog2.setLongitude(-122.92600328435951);
			dog2.setDogDescription("A lovely Poodle.");
			dog2.setVaccinationStatus("YES");	
			dogRepository.save(dog2);
			
			Dog dog3= new Dog();
			dog3.setDogname("Michael");
			dog3.setBreed("Golden Retriever");
			dog3.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655747965%2Fgolden_retriever1_wlhy3a.png");	
			dog3.setOwner(user1);
			dog3.setIsAdopted(0);
			dog3.setLatitude(49.21695421190464);
			dog3.setLongitude(-122.90961621434131);
			dog3.setDogDescription("A lovely Golden Retriever.");
			dog3.setVaccinationStatus("NO");	
			dogRepository.save(dog3);
			
			
			Dog dog4= new Dog();
			dog4.setDogname("David");
			dog4.setBreed("American Bulldog");
			dog4.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1655763268%2FAmerican_Bully1_e1yykr.jpg");	
			dog4.setOwner(user1);
			dog4.setIsAdopted(1);
			dog4.setLatitude(49.21119827631807);
			dog4.setLongitude( -122.87386603610088);
			dog4.setDogDescription("A lovely American Bulldog.");
			dog4.setVaccinationStatus("YES");	
			dogRepository.save(dog4);		
			
			Dog dog5= new Dog();
			dog5.setDogname("William");
			dog5.setBreed("labrador");
			dog5.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085595%2Flabrador1_ullbg8.jpg");	
			dog5.setOwner(user1);
			dog5.setIsAdopted(0);
			dog5.setLatitude(49.214335559806095);
			dog5.setLongitude( -122.94498446880101);
			dog5.setDogDescription("A lovely labrador.");
			dog5.setVaccinationStatus("NO");	
			dogRepository.save(dog5);	
			
			Dog dog6= new Dog();
			dog6.setDogname("Richard");
			dog6.setBreed("chihuahua");
			dog6.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085594%2Fchihuahua3_vdmt6i.jpg");	
			dog6.setOwner(user1);
			dog6.setIsAdopted(0);
			dog6.setLatitude(49.21598623201734);
			dog6.setLongitude(-122.93551712190988);
			dog6.setDogDescription("A lovely chihuahua.");
			dog6.setVaccinationStatus("NO");	
			dogRepository.save(dog6);	
			
			Dog dog7= new Dog();
			dog7.setDogname("Joseph");
			dog7.setBreed("chihuahua");
			dog7.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085566%2Fchihuahua1_muw0zu.jpg");	
			dog7.setOwner(user1);
			dog7.setIsAdopted(0);
			dog7.setLatitude(49.22176628510301);
			dog7.setLongitude(-122.92922628120704);
			dog7.setDogDescription("A lovely chihuahua.");
			dog7.setVaccinationStatus("YES");	
			dogRepository.save(dog7);	
			
			Dog dog8= new Dog();
			dog8.setDogname("Thomas");
			dog8.setBreed("labrador");
			dog8.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085594%2Flabrador3_azpwsl.jpg");	
			dog8.setOwner(user1);
			dog8.setIsAdopted(0);
			dog8.setLatitude(49.21689489840684);
			dog8.setLongitude(-122.92689110437357);
			dog8.setDogDescription("A lovely labrador.");
			dog8.setVaccinationStatus("YES");	
			dogRepository.save(dog8);	
			
			Dog dog9= new Dog();
			dog9.setDogname("Charles");
			dog9.setBreed("chihuahua");
			dog9.setDogURL("https%3A%2F%2Fres.cloudinary.com%2Fdlbwhvhsg%2Fimage%2Fupload%2Fv1656085576%2Fchihuahua2_jd8gv1.jpg");	
			dog9.setOwner(user1);
			dog9.setIsAdopted(0);
			dog9.setLatitude(49.22227250710195);
			dog9.setLongitude( -122.89984175539256);
			dog9.setDogDescription("A lovely chihuahua.");
			dog9.setVaccinationStatus("YES");
			dogRepository.save(dog9);	
			
			dogRepository.findAll().forEach(System.out::println);
			
			
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
			
		
			Clinic clinic7 = new Clinic();
			clinic7.setName("Queensborough Veterinary Hospital");
			clinic7.setLat(49.189497643013446);
			clinic7.setLng(-122.94644104592878);
			clinic7.setAddress("#170 - 1110 Ewen Avenue Located Around Back of the Queens Hotel *ENTRANCE OFF JARDINE*, New Westminster, BC V3L 1X3");
			clinic7.setDescription("We’re proud to provide a wide variety of veterinary medical services for cats, dogs and small animals in New Westminster & surrounding areas!");
			clinicRepository.save(clinic7);
			
			
			Clinic clinic8 = new Clinic();
			clinic8.setName("Angel Animal Hospital");
			clinic8.setLat(49.1924871736445);
			clinic8.setLng(-122.84056084048926);
			clinic8.setAddress("10318 Whalley Blvd, Surrey, BC V3T 4H4");
			clinic8.setDescription("Our goal is to help your pet achieve optimal health from puppy or kitten hood through adult and senior years with quality medical and surgical care, and reasonable fees.");
			clinicRepository.save(clinic8);
			
			Clinic clinic9 = new Clinic();
			clinic9.setName("High Point Animal Hospital");
			clinic9.setLat(49.18104291310804);
			clinic9.setLng(-122.8440049298494);
			clinic9.setAddress("9666 King George Blvd, Surrey, BC V3T 2V4");
			clinic9.setDescription("The team of caring professionals at High Point Animal Hospital in Surrey provide excellent veterinary expertise to pets and their owners every day.");
			clinicRepository.save(clinic9);

		
			Clinic clinic10 = new Clinic();
			clinic10.setName("Cedar Hills Animal Hospital");
			clinic10.setLat(49.18015341426373);
			clinic10.setLng(-122.86614601449608);
			clinic10.setAddress("12863 96 Avenue, Surrey, BC V3V 6V9");
			clinic10.setDescription("Whether your pet is in need of routine veterinary care or needs treatment, our highly qualified staff provides all types of veterinary services in order to effectively treat your pet and maintain their health.");
			clinicRepository.save(clinic10);
			
			clinicRepository.findAll().forEach(System.out::println);
			
			Bulletin bulletin1 = new Bulletin();
			bulletin1.setDate("Jul 21 2022");
			bulletin1.setTime("10:59:16");
			bulletin1.setDescription("Test Comment 1.");
			bulletin1.setOwner(user1);
			bulletinRepository.save(bulletin1);
			
			
			Bulletin bulletin2 = new Bulletin();
			bulletin2.setDate("Jul 22 2022");
			bulletin2.setTime("11:55:16");
			bulletin2.setDescription("Test Comment 2.");
			bulletin2.setOwner(user2);
			bulletinRepository.save(bulletin2);
			
			Bulletin bulletin3 = new Bulletin();
			bulletin3.setDate("Jul 24 2022");
			bulletin3.setTime("11:59:16");
			bulletin3.setDescription("Test Comment 3 .Test Comment 3 .Test Comment 3 .Test Comment 3.Test Comment 3.Test Comment 3.Test Comment 3 .Test Comment 3 .Test Comment 3 .");
			bulletin3.setOwner(user3);
			bulletinRepository.save(bulletin3);
			
			bulletinRepository.findAll().forEach(System.out::println);
		};
	}
}