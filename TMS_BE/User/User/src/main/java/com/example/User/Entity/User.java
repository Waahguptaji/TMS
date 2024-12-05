package com.example.User.Entity;

import jakarta.persistence.*;

import java.util.Random;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(nullable=false ,unique=true)
    private String userId;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String mobileNumber;

    @Column(nullable = false)
    private String mailingAddress;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String preferences; // Notification preference: Email/SMS
    private String preferredDeliveryTime;

    @PrePersist
    public void generateUserId() {
        this.userId = generateId(); // Generate unique user ID
    }
    private String generateId() {
    	Random random=new Random();
    	int id = 100000 +random.nextInt(900000);
    	return String.valueOf(id);
    }

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getMailingAddress() {
		return mailingAddress;
	}

	public void setMailingAddress(String mailingAddress) {
		this.mailingAddress = mailingAddress;
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

	public String getPreferences() {
		return preferences;
	}

	public void setPreferences(String preferences) {
		this.preferences = preferences;
	}

	public String getPreferredDeliveryTime() {
		return preferredDeliveryTime;
	}

	public void setPreferredDeliveryTime(String preferredDeliveryTime) {
		this.preferredDeliveryTime = preferredDeliveryTime;
	}

	

    // Getters and Setters
    
}