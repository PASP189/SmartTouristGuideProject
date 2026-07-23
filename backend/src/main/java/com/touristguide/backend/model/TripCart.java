package com.touristguide.backend.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class TripCart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private UserAccount owner;

    @ManyToMany
    @JoinTable(
            name = "trip_cart_stops",
            joinColumns = @JoinColumn(name = "cart_id"),
            inverseJoinColumns = @JoinColumn(name = "destination_id")
    )
    @OrderColumn(name = "stop_order")
    private List<Destination> stops = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "route_id")
    private TripRoute route;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserAccount getOwner() {
        return owner;
    }

    public void setOwner(UserAccount owner) {
        this.owner = owner;
    }

    public List<Destination> getStops() {
        return stops;
    }

    public void setStops(List<Destination> stops) {
        this.stops = stops;
    }

    public TripRoute getRoute() {
        return route;
    }

    public void setRoute(TripRoute route) {
        this.route = route;
    }

    public BudgetTracker getBudget() {
        return budget;
    }

    public void setBudget(BudgetTracker budget) {
        this.budget = budget;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "budget_id")
    private BudgetTracker budget;

    public void addDestination(Destination dest) {
        stops.add(dest);
    }

    public void removeDestination(Destination dest) {
        stops.remove(dest);
    }


}