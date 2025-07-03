package com.jj.backend.service.service;

import com.jj.backend.config.TechnologyType;
import com.jj.backend.entity.Technology;

import java.util.List;

public interface TechnologyService {
    List<Technology> getTechnologies();
    List<Technology> getTechnologiesByType(TechnologyType technologyType);
    Technology getTechnology(int id);
    Technology createTechnology(Technology technology);
    Technology updateTechnology(Technology technology);
    void deleteTechnology(int id);
}
