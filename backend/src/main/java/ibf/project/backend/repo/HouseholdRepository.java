package ibf.project.backend.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf.project.backend.models.HouseholdDetails;

@Repository
public class HouseholdRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    String SQL_SAVE_HH = "INSERT INTO households (household_id, name, description, last_edited) VALUES (?, ?, ?, ?)";
    String SQL_GET_HH_BY_USERID = "SELECT h.household_id, h.name, h.description, m.user_id " +
            "FROM households h " +
            "JOIN household_members m ON h.household_id = m.household_id " +
            "WHERE m.user_id = ?";

    public HouseholdDetails createHousehold(HouseholdDetails household) {

        jdbcTemplate.update(SQL_SAVE_HH, household.getHouseholdId(), household.getName(),
                household.getDescription(), household.getLastEdited());
        return household;
    }

    public List<HouseholdDetails> getHouseholdsByUserId(String userId) {
        return jdbcTemplate.query(SQL_GET_HH_BY_USERID, new BeanPropertyRowMapper<>(HouseholdDetails.class), userId);
    }

}
