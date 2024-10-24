package com.project.roomlocationweb.controller;

import com.project.roomlocationweb.domain.Room;
import com.project.roomlocationweb.dto.RoomCreateDto;
import com.project.roomlocationweb.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<Room> createRoom(@RequestBody RoomCreateDto roomCreateDto){
        Room room = roomService.createRoom(roomCreateDto);
        return ResponseEntity.ok(room);
    }
}
