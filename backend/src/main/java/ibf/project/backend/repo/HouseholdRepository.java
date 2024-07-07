package ibf.project.backend.repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf.project.backend.models.HouseholdDetails;

@Repository
public class HouseholdRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    String SQL_SAVE_HH = "INSERT INTO household (household_id, name, description, last_edited) VALUES (?, ?, ?, ?)";
    String SQL_FIND_BY_USERID = "SELECT * FROM household WHERE household_id = ?";

    public HouseholdDetails createHousehold(HouseholdDetails household) {

        jdbcTemplate.update(SQL_SAVE_HH, household.getHouseholdId(), household.getName(),
                household.getDescription(), household.getLastEdited());
        return household;
    }

    // public HouseholdDetails findByUserId(String userId) {

    // return jdbcTemplate.queryForObject(SQL_FIND_BY_USERID, new Object[] {
    // householdId }, this::mapRowToHousehold);
    // }
}
