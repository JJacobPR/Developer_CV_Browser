package com.jj.backend.service.service;

import com.jj.backend.dto.TechnologyRequestDto;
import com.jj.backend.dto.TechnologyResponseDto;
import com.jj.backend.entity.Technology;

import java.util.List;

public interface TechnologyService {

    // Create, Update, Delete
    Technology buildTechnology(TechnologyRequestDto technologyRequestDto);
    Technology saveTechnology(Technology technology);
    Technology updateTechnology(Integer technologyId, TechnologyRequestDto dto);
    void deleteTechnology(Integer id);

    // Read / Find
    List<Technology> getTechnologies();
    List<Technology> getTechnologiesByUser(Integer userId);
    List<Technology> findAllById(List<Integer> technologies);

    // Mapping / DTO conversions
    TechnologyResponseDto toTechnologyDto(Technology technology);
    List<TechnologyResponseDto> toDtoList(List<Technology> technologies);
}

