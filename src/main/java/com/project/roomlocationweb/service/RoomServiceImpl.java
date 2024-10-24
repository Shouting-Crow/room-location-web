package com.project.roomlocationweb.service;

import com.project.roomlocationweb.domain.Room;
import com.project.roomlocationweb.domain.RoomShape;
import com.project.roomlocationweb.domain.Size3D;
import com.project.roomlocationweb.dto.RoomCreateDto;
import com.project.roomlocationweb.repository.RoomRepository;
import com.project.roomlocationweb.repository.RoomShapeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;
    private final RoomShapeRepository roomShapeRepository;

    @Override
    public Room createRoom(RoomCreateDto roomCreateDto) {
        Room room = new Room();
        RoomShape roomShape = roomShapeRepository.findById(roomCreateDto.getRoomShapeId())
                .orElseThrow(() -> new RuntimeException("유효하지 않은 방 타입 ID 입니다."));

        Size3D size = new Size3D();
        size.setX(roomCreateDto.getX());
        size.setY(roomCreateDto.getY());
        size.setZ(roomCreateDto.getZ());

        room.setRoomShape(roomShape);
        room.setRoomSize(size);

        return roomRepository.save(room);
    }
}
