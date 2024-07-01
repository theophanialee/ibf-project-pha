package ibf.project.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import ibf.project.backend.models.User;
import ibf.project.backend.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RestController
@RequestMapping("/api")

public class LoginController {
    @Autowired
    UserService userSvc;

    // save login creds
    @PostMapping(path = "/createUser")
    public ResponseEntity<String> createUser(@RequestBody User createdUser) {
        boolean isSaved = userSvc.createUser(createdUser);
        JsonObject jsonObj = Json.createObjectBuilder().add("isSaved",
                isSaved).build();
        return ResponseEntity.ok().body(jsonObj.toString());
    }

    @PostMapping(path = "/authenticateUser")
    public ResponseEntity<String> authenticateUser(@RequestBody User loginUser) {
        System.out.println("controller:" + loginUser.getPassword());
        boolean isExist = userSvc.authenticateUser(loginUser);

        JsonObject jsonObj = Json.createObjectBuilder().add("isExist",
                isExist).build();
        return ResponseEntity.ok().body(jsonObj.toString());
    }
}
