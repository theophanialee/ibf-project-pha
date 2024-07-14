package ibf.project.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ibf.project.backend.models.ExistingUser;
import ibf.project.backend.services.HouseholdMemberService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/household/members")
public class HouseholdMemberController {

    @Autowired
    HouseholdMemberService householdMemberSvc;

    @GetMapping("/users")
    public ResponseEntity<List<ExistingUser>> getExistingUsersByUsername(@PathVariable String username) {

        return null;
    }

}
