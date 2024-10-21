package com.project.roomlocationweb.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "window")
public class Window {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Size3D location;

    @Embedded
    private Size2D size;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
