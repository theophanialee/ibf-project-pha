package ibf.project.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ibf.project.backend.models.User;
import ibf.project.backend.repo.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean createUser(User createUser) {
        String hashedPassword = passwordEncoder.encode(createUser.getPassword());
        createUser.setPassword(hashedPassword);
        return userRepo.createUser(createUser);
    }

    public String authenticateUser(User loginUser) {
        User existingUser = userRepo.findUserByUsername(loginUser.getUsername()).orElse(null);
        if (existingUser != null) {
            passwordEncoder.matches(loginUser.getPassword(), existingUser.getPassword());
            return existingUser.getUserId();
        }
        return null;
    }

}
