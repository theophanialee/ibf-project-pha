package ibf.project.backend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ibf.project.backend.models.User;
import ibf.project.backend.services.HouseholdMemberService;
import jakarta.json.Json;
import jakarta.json.JsonObject;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/household/members")
public class HouseholdMemberController {

    @Autowired
    HouseholdMemberService householdMemberSvc;

    @GetMapping("/{username}")
    public ResponseEntity<Optional<User>> getExistingUsersByUsername(@PathVariable String username) {
        Optional<User> users = householdMemberSvc.findUserByUsername(username);

        return ResponseEntity.ok(users);
    }

    @PostMapping("/add/{householdId}")
    public ResponseEntity<?> addMemberToHousehold(@PathVariable String householdId, @RequestBody User user) {
        boolean isSaved = householdMemberSvc.addMemberToHousehold(householdId, user);

        return ResponseEntity.ok(isSaved);
    }

}
