package ibf.project.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf.project.backend.models.HouseholdDetails;
import ibf.project.backend.services.HouseholdService;

@RestController
@RequestMapping("/api/household")
public class HouseholdController {

    @Autowired
    HouseholdService householdSvc;

    @PostMapping("/add")
    public ResponseEntity<HouseholdDetails> createHousehold(@RequestBody HouseholdDetails household) {

        System.out.println("Creating household for user ID: " + household.getUserId());
        HouseholdDetails createdHousehold = householdSvc.createHousehold(household);
        return new ResponseEntity<>(createdHousehold, HttpStatus.CREATED);
    }

    @GetMapping("/get/{userId}")
    public List<HouseholdDetails> getHouseholdsByUserId(@PathVariable String userId) {
        return householdSvc.getHouseholdsByUserId(userId);
    }

    @GetMapping("/{householdId}")
    public ResponseEntity<HouseholdDetails> getHouseholdById(@PathVariable String householdId) {
        HouseholdDetails household = householdSvc.getHouseholdById(householdId);
        return ResponseEntity.ok(household);
    }

    @PutMapping("/update/{householdId}")
    public ResponseEntity<HouseholdDetails> updateHousehold(@PathVariable String householdId,
            @RequestBody HouseholdDetails householdDetails) {
        householdDetails.setHouseholdId(householdId);

        System.out.println(householdId + " " + householdDetails);
        HouseholdDetails updatedHousehold = householdSvc.updateHousehold(householdDetails);
        return ResponseEntity.ok(updatedHousehold);
    }

}
