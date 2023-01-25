package com.example.CSIS4495.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.catalina.filters.AddDefaultCharsetFilter;
import org.springframework.core.annotation.MergedAnnotation.Adapt;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.OneToMany;

@Entity
@Table(name = "User")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "phoneNumber")
	private String phoneNumber;

	@Column(name = "email")
	private String email;

	@Column(name = "address")
	private String address;

	@Column(name = "userurl", length = 10000000)
	private String userURL;
	
	@Column(name = "Admin")
	private int isAdmin;

	@JsonIgnore
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Dog> dogs = new HashSet<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Bulletin> bullletin = new HashSet<>();
	
	@Column(name = "notification")
	private String notification; 
	
	@JsonIgnore
	@OneToMany(mappedBy = "message")
	private Set<Message> reveiveMessages = new HashSet<>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "message")
	private Set<Message> sentMessages = new HashSet<>();

	
	public User() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Set<Dog> getDogs() {
		return dogs;
	}

	public void setDogs(Set<Dog> dogs) {
		this.dogs = dogs;
	}

	public void addDog(Dog dog) {
		this.dogs.add(dog);
		dog.setOwner(this);
	}

	public String getUserURL() {
		return userURL;
	}

	public void setUserURL(String userURL) {
		this.userURL = userURL;
	}
	
	public void addBullletin(Bulletin bulletin) {
		this.bullletin.add(bulletin);
		bulletin.setOwner(this);
	}

	public int getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(int isAdmin) {
		this.isAdmin = isAdmin;
	}

	public Set<Bulletin> getBullletin() {
		return bullletin;
	}	

	public void setBullletin(Set<Bulletin> bullletin) {
		this.bullletin = bullletin;
	}

	public String getNotification() {
		return notification;
	}

	public void addNotification(String dogName) {
		if (this.notification==null||this.notification=="") {
			this.notification = dogName;
		} else {
			String currentString = this.notification;
			String newString = currentString+","+dogName;
			this.notification = newString;
		}
	}
	public void cleanNotification() {
		this.notification = null;
	}
	
	public void addReceiveMessages(Message message) {
		this.reveiveMessages.add(message);
		message.setReciever(this);
	}
	public void addSentMessage (Message message) {
		this.sentMessages.add(message);
		message.setSender(this);
	}
}
