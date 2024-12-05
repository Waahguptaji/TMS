package com.example.Tracking.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Tracking.model.Tracking;

public interface TrackingRepository extends JpaRepository<Tracking,Long> {
	Optional<Tracking> findByBookingId(String bookingId);
}
