package com.example.User.Entity;

import java.util.List;
import java.util.Random;

import jakarta.persistence.Column;
import jakarta.persistence.PrePersist;

public class UserDTO {
	
	private String userId;

   // @Column(nullable = false)
    private String customerName;

    //@Column(nullable = false, unique = true)
    private String email;

    //@Column(nullable = false)
    private String mobileNumber;

    //@Column(nullable = false)
    private String mailingAddress;

    //@Column(nullable = false, unique = true)
    private String username;

    //@Column(nullable = false)
    private String password;

    private String preferences; // Notification preference: Email/SMS
    private String preferredDeliveryTime;
    
    private List<Booking> booking;

    public UserDTO(String userId2, String username2, String password2) {
		// TODO Auto-generated constructor stub
    	this.userId=userId2;
    	this.username=username2;
    	this.password=password2;
	}
    
	public UserDTO() {
		super();
	}

	

	public UserDTO(String userId, String customerName, String email, String mobileNumber, String mailingAddress,
			String username, String password, String preferences, String preferredDeliveryTime, List<Booking> booking) {
		super();
		this.userId = userId;
		this.customerName = customerName;
		this.email = email;
		this.mobileNumber = mobileNumber;
		this.mailingAddress = mailingAddress;
		this.username = username;
		this.password = password;
		this.preferences = preferences;
		this.preferredDeliveryTime = preferredDeliveryTime;
		this.booking = booking;
	}

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
	public List<Booking> getBooking() {
		return booking;
	}
	public void setBooking(List<Booking> booking2) {
		this.booking = booking2;
	}
	
	
	
}
