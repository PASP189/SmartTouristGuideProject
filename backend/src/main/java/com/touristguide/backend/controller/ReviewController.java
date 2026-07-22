package com.touristguide.backend.controller;

import jakarta.validation.Valid;
import com.touristguide.backend.model.*;
import com.touristguide.backend.repository.*;
import org.springframework.web.bind.annotation.*;
import com.touristguide.backend.exception.ResourceNotFoundException;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final UserAccountRepository userAccountRepository;
    private final LocalPartnerRepository localPartnerRepository;

    public ReviewController(ReviewRepository reviewRepository,
                            UserAccountRepository userAccountRepository,
                            LocalPartnerRepository localPartnerRepository) {
        this.reviewRepository = reviewRepository;
        this.userAccountRepository = userAccountRepository;
        this.localPartnerRepository = localPartnerRepository;
    }

    // Submit a review for a partner
    @PostMapping("/{authorId}/partner/{partnerId}")
    public Review createReview(@PathVariable Long authorId,
                               @PathVariable Long partnerId,
                               @Valid @RequestBody Review reviewData) {
        UserAccount author = userAccountRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        LocalPartner partner = localPartnerRepository.findById(partnerId)
                .orElseThrow(() -> new ResourceNotFoundException("Partner not found"));

        reviewData.setAuthor(author);
        reviewData.setPartner(partner);
        return reviewRepository.save(reviewData);
    }

    // Get all reviews for a specific partner
    @GetMapping("/partner/{partnerId}")
    public List<Review> getReviewsForPartner(@PathVariable Long partnerId) {
        return reviewRepository.findByPartnerId(partnerId);
    }
}