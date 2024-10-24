package com.project.roomlocationweb.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "window_entity")
public class Window {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "size3d_x")),
            @AttributeOverride(name = "y", column = @Column(name = "size3d_y")),
            @AttributeOverride(name = "z", column = @Column(name = "size3d_z"))
    })
    private Size3D location;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "size2d_x")),
            @AttributeOverride(name = "y", column = @Column(name = "size2d_y"))
    })
    private Size2D size;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
