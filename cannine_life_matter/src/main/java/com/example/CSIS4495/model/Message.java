package com.example.CSIS4495.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "message")
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name="sender_id", nullable = true)
	private User sender;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name="reciever_id", nullable = true)
	private User reciever;

	@Column(name = "message")
	private String message;

	@Column(name = "localDateTime")
	private LocalDateTime localDateTime;

	public Message() {
		super();
	}

	public User getSender() {
		return sender;
	}

	public void setSender(User sender) {
		this.sender = sender;
	}

	public User getReciever() {
		return reciever;
	}

	public void setReciever(User recieverID) {
		this.reciever = recieverID;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getLocalDateTime() {
		return localDateTime;
	}

	public void setLocalDateTime(LocalDateTime localDateTime) {
		this.localDateTime = localDateTime;
	}

}