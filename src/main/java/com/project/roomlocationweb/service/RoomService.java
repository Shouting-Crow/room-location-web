package com.project.roomlocationweb.service;

import com.project.roomlocationweb.domain.Room;
import com.project.roomlocationweb.dto.RoomCreateDto;

public interface RoomService {
    Room createRoom(RoomCreateDto roomCreateDto);
}
