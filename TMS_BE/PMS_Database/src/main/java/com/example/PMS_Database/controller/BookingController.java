package com.example.PMS_Database.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.PMS_Database.Entity.Booking;
import com.example.PMS_Database.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create Booking
    @PostMapping("/register")
    public String registerBooking(@RequestBody Booking booking) {
        try {
            Booking savedBooking = bookingService.createBooking(booking);
            return "Booking registered successfully! Your Booking ID is: " + savedBooking.getBookingId();
        } catch (IllegalArgumentException e) {
            return "Error: " + e.getMessage();
        }
    }
    
    @GetMapping("/{bookingId}")
    public Booking getBookingId(@PathVariable String bookingId) {
    	Optional<Booking> booking = bookingService.getBookingById(bookingId);
    	if(booking.isPresent()) {
    		return booking.get();
    		
    	}else {
    		throw new IllegalArgumentException("Booking not found with ID: "+bookingId);
    	}
    }
    
    @DeleteMapping("/{bookingId}")
    public String deleteBookingById(@PathVariable String bookingId) {
    	try {
    		bookingService.deleteBookingById(bookingId);
    		return "Booking with ID " +bookingId + " has been successfully deleted";
    	}catch(IllegalArgumentException e) {
    		return "Error: " +e.getMessage();
    	}
    }
    
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingWithUserDetails(@PathVariable String userId) {
    	return bookingService.getByUserId(userId);
    }
    
    
}
