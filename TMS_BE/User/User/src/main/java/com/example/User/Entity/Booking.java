package com.example.User.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

public class Booking {

  
    private Long id;

  //  @Column(nullable = false, unique = true)
    private String bookingId; // 7-digit unique booking ID

    //@NotBlank(message = "Sender name is required")
    private String senderName;

    //@NotBlank(message = "Sender contact is required")
    //@Pattern(regexp = "^\\d{10}$", message = "Sender contact must be 10 digits")
    private String senderContact;

    //@NotBlank(message = "Sender address is required")
    private String senderAddress;

   // @NotBlank(message = "Receiver name is required")
    private String receiverName;

   // @NotBlank(message = "Receiver contact is required")
    //@Pattern(regexp = "^\\d{10}$", message = "Receiver contact must be 10 digits")
    private String receiverContact;

    //@NotBlank(message = "Receiver address is required")
    private String receiverAddress;

    //@NotBlank(message = "Receiver PIN is required")
    //@Pattern(regexp = "^\\d{6}$", message = "Receiver PIN must be 6 digits")
    private String receiverPin;

    //@NotNull(message = "Weight is required")
    private Double weight;

    //@NotBlank(message = "Description is required")
    private String description;

    //@NotBlank(message = "Packaging type is required")
    private String packaging;

    //@NotBlank(message = "Delivery speed is required")
    private String deliverySpeed;

    ///@NotNull(message = "Pickup date is required")
    private LocalDate pickupDate;

    //@NotBlank(message = "Pickup time is required")
    private String pickupTime;
    private String userId;
    
    
    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}

	private String Status;
    
    

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBookingId() {
		return bookingId;
	}

	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getSenderContact() {
		return senderContact;
	}

	public void setSenderContact(String senderContact) {
		this.senderContact = senderContact;
	}

	public String getSenderAddress() {
		return senderAddress;
	}

	public void setSenderAddress(String senderAddress) {
		this.senderAddress = senderAddress;
	}

	public String getReceiverName() {
		return receiverName;
	}

	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}

	public String getReceiverContact() {
		return receiverContact;
	}

	public void setReceiverContact(String receiverContact) {
		this.receiverContact = receiverContact;
	}

	public String getReceiverAddress() {
		return receiverAddress;
	}

	public void setReceiverAddress(String receiverAddress) {
		this.receiverAddress = receiverAddress;
	}

	public String getReceiverPin() {
		return receiverPin;
	}

	public void setReceiverPin(String receiverPin) {
		this.receiverPin = receiverPin;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPackaging() {
		return packaging;
	}

	public void setPackaging(String packaging) {
		this.packaging = packaging;
	}

	public String getDeliverySpeed() {
		return deliverySpeed;
	}

	public void setDeliverySpeed(String deliverySpeed) {
		this.deliverySpeed = deliverySpeed;
	}

	public LocalDate getPickupDate() {
		return pickupDate;
	}

	public void setPickupDate(LocalDate pickupDate) {
		this.pickupDate = pickupDate;
	}

	public String getPickupTime() {
		return pickupTime;
	}

	public void setPickupTime(String pickupTime) {
		this.pickupTime = pickupTime;
	}

    // Getters and Setters
    
}