package com.project.roomlocationweb.repository;

import com.project.roomlocationweb.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
