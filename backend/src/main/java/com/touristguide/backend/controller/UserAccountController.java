package com.touristguide.backend.controller;

import jakarta.validation.Valid;

import com.touristguide.backend.model.UserAccount;
import com.touristguide.backend.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.touristguide.backend.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/api/users")
public class UserAccountController {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountController(UserAccountRepository userAccountRepository,
                                 PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public UserAccount register(@Valid@RequestBody UserAccount user) {
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userAccountRepository.save(user);
    }
    @PostMapping("/login")
    public String login(@RequestBody UserAccount loginRequest) {
        UserAccount existingUser = userAccountRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));

        boolean passwordMatches = passwordEncoder.matches(
                loginRequest.getPassword(),
                existingUser.getPassword()
        );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        return "Login successful for " + existingUser.getName();
    }

    @PutMapping("/{id}")
    public UserAccount updateUser(@PathVariable Long id, @RequestBody UserAccount updatedData) {
        UserAccount user = userAccountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setName(updatedData.getName());
        user.setEmail(updatedData.getEmail());

        return userAccountRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userAccountRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userAccountRepository.deleteById(id);
        return "User deleted successfully";
    }
}