package com.jj.backend.dto;

import com.jj.backend.config.TechnologyType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TechnologyRequestDto {
    private String name;
    private TechnologyType type;
}
