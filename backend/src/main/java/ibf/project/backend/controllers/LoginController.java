package ibf.project.backend.controllers;

import org.springframework.web.bind.annotation.RestController;

import ibf.project.backend.models.User;
import ibf.project.backend.services.JwtService;
import ibf.project.backend.services.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginController {
    @Autowired
    UserService userSvc;

    @Autowired
    JwtService jwtService;

    // save login creds
    @PostMapping(path = "/createUser")
    public ResponseEntity<String> createUser(@RequestBody User createdUser) {
        boolean isSaved = userSvc.createUser(createdUser);
        JsonObject jsonObj = Json.createObjectBuilder().add("isSaved",
                isSaved).build();
        return ResponseEntity.ok().body(jsonObj.toString());
    }

    @PostMapping(path = "/authenticateUser")
    public ResponseEntity<String> authenticateUser(@RequestBody User loginUser, HttpServletResponse response) {
        String userId = userSvc.authenticateUser(loginUser);

        if (userId != null && !userId.isEmpty()) {

            System.out.println("user exists");
            // Generate JWT cookie
            String jwt = jwtService.generateJwtCookie(loginUser, response);

            // Return response with JWT cookie
            JsonObject jsonObj = Json.createObjectBuilder()
                    .add("isExist", true)
                    .add("userId", userId)
                    .add("kitchenkakisJWT", jwt)
                    .build();

            return ResponseEntity.ok()
                    .body(jsonObj.toString());
        } else {
            JsonObject jsonObj = Json.createObjectBuilder()
                    .add("isExist", false)
                    .build();

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonObj.toString());
        }
    }

    @PostMapping("/signout")
    public ResponseEntity<String> signout(HttpServletRequest request, HttpServletResponse response) {

        // Remove JWT cookie from the client
        ResponseCookie cleanCookie = jwtService.signout(request, response);

        // Optionally, you may invalidate the session or perform additional cleanup
        JsonObject jsonObj = Json.createObjectBuilder()
                .add("isSignedOut", true)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cleanCookie.toString())
                .body(jsonObj.toString());
    }
}
