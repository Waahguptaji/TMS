package com.example.User.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.User.Entity.Booking;
import com.example.User.Entity.User;
import com.example.User.Entity.UserDTO;
import com.example.User.config.NotFoundException;
import com.example.User.repo.UserRepository;



@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

   @Autowired
   private BookingService bookingservice;
    	  // Register a new user
        public User registerUser(User user) {
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                throw new RuntimeException("Username already exists");
            }
            
            String userId;
            do {
            	userId=generateId();
            }while(userRepository.existsById(userId));
            user.setUserId(userId);
            return userRepository.save(user);
            
        }
        private String generateId() {
        	Random random = new Random();
        	return String.valueOf(100000 + random.nextInt(900000));
        }

        // Validate user credentials
//        public boolean validateUser(String username, String password) {
//            return userRepository.findByUsername(username)
//                    .map(user -> user.getPassword().equals(password))
//                    .orElse(false);
//        }
        public Optional<User> validateUser(String userId, String password) {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent() && user.get().getPassword().equals(password)) {
                return user; // Valid user
            }
            return Optional.empty(); // Invalid user
        }
        
        public User getUserById(String userId) {
        	return userRepository.findByUserId(userId);
        }
        
//        public UserDTO getBooking(String id) {
//        	User user = this.userRepository.findByUserId(id);
//        	
//        	List<Booking> booking =this.bookingservice.getBookingWithUserDetails(id);
//        	UserDTO userDTO = new UserDTO(user.getUserId(),user.getUsername(),user.getPassword());
//        	
//        	//UserDTO userDTO= new UserDTO(user.getUserId(),user.getuserName(),user.getPassword());
//        	userDTO.setBooking(booking);
//        	return userDTO;
//        }
        public UserDTO getBooking(String userId) {
    		User user=this.userRepository.findById(userId).orElseThrow(()-> new NotFoundException("Cheak ID again"));
    		List<Booking> bookings=bookingservice.getBookingWithUserDetails(userId);
    		
    		UserDTO userDTO = new UserDTO();
    		//UserDTO userDTO= new UserDTO(user.getUserId(),user.getUsername(),user.getPassword(),user.getCustomerName(),
    				//user.getEmail(),user.getMobileNumber(),user.getMailingAddress(),user.getPreferences(), id, bookings);
    		userDTO.setBooking(bookings);
    		return userDTO;
    	}
        
        
        	
}
