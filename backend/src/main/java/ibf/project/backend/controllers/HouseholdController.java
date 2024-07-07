package ibf.project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import ibf.project.backend.models.HouseholdDetails;
import ibf.project.backend.services.HouseholdService;

@Controller
@RequestMapping("/api/household")
public class HouseholdController {

    @Autowired
    HouseholdService householdSvc;

    @PostMapping("/add")
    public ResponseEntity<HouseholdDetails> createHousehold(@RequestBody HouseholdDetails household) {
        HouseholdDetails createdHousehold = householdSvc.createHousehold(household);
        return new ResponseEntity<>(createdHousehold, HttpStatus.CREATED);
    }

}
