package com.example.PMS_Database.service;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.PMS_Database.Entity.Booking;

import com.example.PMS_Database.repo.BookingRepository;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;
    

  

    // Generate unique 7-digit booking ID
    private String generateBookingId() {
        Random random = new Random();
        String bookingId;
        do {
            bookingId = String.format("%07d", random.nextInt(10000000)); // Generate a 7-digit number
        } while (bookingRepository.existsByBookingId(bookingId)); // Ensure uniqueness
        return bookingId;
    }

    @Transactional
    public Booking createBooking(Booking booking) {
        // Generate a unique booking ID
        booking.setBookingId(generateBookingId());
        return bookingRepository.save(booking);
    }
    public Optional<Booking> getBookingById(String bookingId){
    	return bookingRepository.findByBookingId(bookingId);
    }
    
    public void deleteBookingById(String bookingId) {
    	Optional<Booking>booking = bookingRepository.findByBookingId(bookingId);
    	if(booking .isPresent()) {
    		bookingRepository.delete(booking.get());
    	}else {
    		throw new IllegalArgumentException("Booking not found with Id : "+bookingId);
    	}
    }
    // Save a new booking
    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getByUserId(String userId){
    	return this.bookingRepository.findByUserId(userId);
    }
    // Fetch a booking along with user details
    
    
}










