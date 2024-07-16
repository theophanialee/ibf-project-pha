package ibf.project.backend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.messaging.MessagingException;
import org.springframework.web.bind.annotation.RestController;

    import ibf.project.backend.models.User;
    import ibf.project.backend.services.EmailService;
    import ibf.project.backend.services.HouseholdMemberService;

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

        @Autowired
        private EmailService emailSvc;

        @GetMapping("/{username}")
        public ResponseEntity<Optional<User>> getExistingUsersByUsername(@PathVariable String username) {
            Optional<User> users = householdMemberSvc.findUserByUsername(username);

            return ResponseEntity.ok(users);
        }

        @PostMapping("/add/{householdId}")
        public ResponseEntity<?> addMemberToHousehold(@PathVariable String householdId, @RequestBody User user) {

            boolean isSaved = householdMemberSvc.addMemberToHousehold(householdId, user);

            if (isSaved) {
                try {

            String recipientEmail = user.getEmail();
            String householdName = householdId;
            emailSvc.sendMemberAddedEmail(recipientEmail, householdName);
        } catch (MessagingException e) {
            // Handle email sending failure
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email to user");
        }
    }

            return ResponseEntity.ok(isSaved);

        }
    }
