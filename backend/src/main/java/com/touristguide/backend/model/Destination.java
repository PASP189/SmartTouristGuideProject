package com.touristguide.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double latitude;
    private double longitude;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SafetyGuideline getSafetyInfo() {
        return safetyInfo;
    }

    public void setSafetyInfo(SafetyGuideline safetyInfo) {
        this.safetyInfo = safetyInfo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public List<String> getThemeTags() {
        return themeTags;
    }

    public void setThemeTags(List<String> themeTags) {
        this.themeTags = themeTags;
    }

    @ElementCollection
    private List<String> themeTags = new ArrayList<>();

    @OneToOne(mappedBy = "destination", cascade = CascadeType.ALL)
    private SafetyGuideline safetyInfo;

    public boolean matchThemes(List<String> themes) {
        return themeTags.stream().anyMatch(themes::contains);
    }


}