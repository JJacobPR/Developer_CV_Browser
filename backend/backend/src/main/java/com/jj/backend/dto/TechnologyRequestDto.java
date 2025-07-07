package com.jj.backend.dto;

import com.jj.backend.config.TechnologyType;
import lombok.Getter;


@Getter
public class TechnologyRequestDto {
    private String name;
    private TechnologyType type;
}
