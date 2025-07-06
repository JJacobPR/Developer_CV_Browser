package com.jj.backend.service.service;

import com.jj.backend.config.TechnologyType;
import com.jj.backend.dto.TechnologyRequestDto;
import com.jj.backend.dto.TechnologyResponseDto;
import com.jj.backend.entity.Technology;

import java.util.List;

public interface TechnologyService {
    List<Technology> getTechnologies();
    List<Technology> getTechnologiesByType(TechnologyType technologyType);
    List<Technology> getTechnologiesByUser(Integer userId);
    Technology getTechnology(Integer id);
    Technology saveTechnology(Technology technology);
    Technology buildTechnology(TechnologyRequestDto technologyRequestDto);
    Technology updateTechnology(Integer technologyId, TechnologyRequestDto dto);
    void deleteTechnology(Integer id);

    List<TechnologyResponseDto> toDtoList(List<Technology> technologies);

    TechnologyResponseDto toDto(Technology technology);
}
