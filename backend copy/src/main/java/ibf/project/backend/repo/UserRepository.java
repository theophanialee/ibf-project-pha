package ibf.project.backend.repo;

import java.util.Optional;
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

    private final String SQL_SAVE_CREDS = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    private static final String SQL_FIND_BY_USERNAME = "SELECT * FROM user WHERE username = ?";

    public boolean createUser(User createUser) {
        int rowsAffected = jdbcTemplate.update(SQL_SAVE_CREDS, createUser.getUsername(), createUser.getEmail(),
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
