package com.example.User.controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.User.Entity.User;
import com.example.User.Entity.UserDTO;
import com.example.User.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
 
    //List<User>users=new ArrayList<User>();
    // Register a new user
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
    	///users=(List<User>) userService.registerUser(user);
        return ResponseEntity.ok(userService.registerUser(user));
    }

    // Login user
//    @PostMapping("/login")
//    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
//        if (userService.validateUser(username, password)) {
//            return ResponseEntity.ok("Login successful"+users);
//        } else {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String userId, @RequestParam String password) {
        // Validate user
        Optional<User> user = userService.validateUser(userId, password);

        if (user.isPresent()) {
            // If login is successful, return user details
            User loggedInUser = user.get();
            return ResponseEntity.ok(loggedInUser);
        } else {
            // If login fails, return 401 Unauthorized
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
//    @GetMapping("/user/")
//	public List<User> get() {
//	return this.userService.getAll();
//	}
    
    @GetMapping("user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) throws NotFoundException{
    	User user=userService.getUserById(userId);
		return ResponseEntity.ok(user);
    }
//    @GetMapping("bookings/{userId}")
//    public ResponseEntity<UserDTO> getBooking(@PathVariable String userId) {
//       // User user = userService.getUserById(userId);
//        
//        // Map User entity to UserDTO (manually or via a mapper library like MapStruct)
////        UserDTO userDTO = new UserDTO();
////        userDTO.setUserId(user.getUserId());
////        userDTO.setCustomerName(user.getCustomerName());
////        userDTO.setEmail(user.getEmail());
////        userDTO.setMobileNumber(user.getMobileNumber());
////        userDTO.setPreferences(user.getPreferences());
////        userDTO.setPreferredDeliveryTime(user.getPreferredDeliveryTime());
//
//        return ResponseEntity.ok(this.userService.getByuserId(userId));
//    }
//    
    
    @GetMapping("/user/bookings/{id}")
    public UserDTO getBookings(@PathVariable ("id") String id) {
    	return this.userService.getBooking(id);
    }
    
    
}