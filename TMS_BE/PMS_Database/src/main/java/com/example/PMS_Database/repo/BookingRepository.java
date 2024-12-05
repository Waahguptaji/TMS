package com.example.PMS_Database.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.PMS_Database.Entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    boolean existsByBookingId(String bookingId);
    Optional<Booking> findByBookingId(String bookingId);
    List<Booking> findByUserId(String userId);
}

