package com.example.CSIS4495.model;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="Dog")
public class Dog {
		
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name="dogname")
	private String dogname;
	
	@Column(name="breed")
	private String breed;
	
	@Column(name="longitude")
	private double longitude;
	
	@Column(name="latitude")
	private double latitude;
	
	@Column(name="vaccinationStatus")
	private String vaccinationStatus;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name="User_id", nullable = false)
	private User owner;
	
	@Column(name="dogDescription")
	private String dogDescription;
	
	@Column(name = "dogurl",columnDefinition = "VARCHAR(500)")
	private String dogURL;
	
	@Column(name = "isAdopted")
	private int isAdopted;

	public Dog() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDogname() {
		return dogname;
	}

	public void setDogname(String dogname) {
		this.dogname = dogname;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public String getVaccinationStatus() {
		return vaccinationStatus;
	}

	public void setVaccinationStatus(String vaccinationStatus) {
		this.vaccinationStatus = vaccinationStatus;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public String getDogDescription() {
		return dogDescription;
	}

	public void setDogDescription(String dogDescription) {
		this.dogDescription = dogDescription;
	}

	public String getDogURL() {
		return dogURL;
	}

	public void setDogURL(String dogURL) {
		this.dogURL = dogURL;
	}

	public int getIsAdopted() {
		return isAdopted;
	}

	public void setIsAdopted(int isAdopted) {
		this.isAdopted = isAdopted;
	}

	
}
