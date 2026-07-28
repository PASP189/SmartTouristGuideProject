package com.touristguide.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class LocalPartner {

    private boolean isVerified;
    private float referralFee;
    private String businessName;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ElementCollection
    private List<String> coveredDestinations = new ArrayList<>();

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getCoveredDestinations() {
        return coveredDestinations;
    }

    public void setCoveredDestinations(List<String> coveredDestinations) {
        this.coveredDestinations = coveredDestinations;
    }

    public boolean isVerified() {
        return isVerified;
    }

    public void setVerified(boolean verified) {
        isVerified = verified;
    }

    public float getReferralFee() {
        return referralFee;
    }

    public void setReferralFee(float referralFee) {
        this.referralFee = referralFee;
    }


    public String getTrackedLink(Long touristId) {
        return "https://wa.me/94xxxxxxxxx?ref=" + touristId + "-" + this.id;
    }


}