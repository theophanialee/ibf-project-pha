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

    public User authenticateUser(User loginUser) {
        // Get user by username then match the passwords
        User user = userRepo.findUserByUsername(loginUser.getUsername()).orElse(null);
        if (user != null) {
            passwordEncoder.matches(loginUser.getPassword(), user.getPassword());
            return user;
        }
        return null;
    }

}
