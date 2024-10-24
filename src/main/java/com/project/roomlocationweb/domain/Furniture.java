package com.project.roomlocationweb.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "furniture")
public class Furniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "location3d_x")),
            @AttributeOverride(name = "y", column = @Column(name = "location3d_y")),
            @AttributeOverride(name = "z", column = @Column(name = "location3d_z"))
    })
    private Size3D location;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(name = "size3d_x")),
            @AttributeOverride(name = "y", column = @Column(name = "size3d_y")),
            @AttributeOverride(name = "z", column = @Column(name = "size3d_z"))
    })
    private Size3D size;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
