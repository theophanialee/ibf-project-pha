package ibf.project.backend.repo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import org.springframework.stereotype.Repository;

import ibf.project.backend.models.User;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final String SQL_SAVE_CREDS = "INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)";
    private final String SQL_FIND_BY_USERNAME = "SELECT * FROM users WHERE username = ?";

public boolean createUser(User createUser) {
    String userId = UUID.randomUUID().toString().substring(0, 8);
    int rowsAffected = jdbcTemplate.update(SQL_SAVE_CREDS, userId, createUser.getUsername(), createUser.getEmail(),
            createUser.getPassword());
    return rowsAffected > 0;
}

    public Optional<User> findUserByUsername(String username) {
        try {
            User user = jdbcTemplate.queryForObject(SQL_FIND_BY_USERNAME,
                    new BeanPropertyRowMapper<>(User.class), username);
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }


}
