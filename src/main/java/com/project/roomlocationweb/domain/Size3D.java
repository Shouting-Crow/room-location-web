package com.project.roomlocationweb.domain;

import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Embeddable
public class Size3D {

    private double x;
    private double y;
    private double z;
}
