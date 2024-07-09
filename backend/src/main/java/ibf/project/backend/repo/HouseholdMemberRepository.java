package ibf.project.backend.repo;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf.project.backend.models.HouseholdMember;

@Repository
public class HouseholdMemberRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    String SQL_SAVE_MEMBER = "INSERT INTO household_members (record_id, user_id, household_id) VALUES (?, ?, ?)";

    public void saveHouseholdMember(HouseholdMember member) {
        String recordId = UUID.randomUUID().toString().substring(0, 8);
        jdbcTemplate.update(SQL_SAVE_MEMBER, recordId, member.getUserId(), member.getHouseholdId());
    }
}
