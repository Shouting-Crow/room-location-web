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
    private Size3D location;

    @Embedded
    private Size3D size;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
