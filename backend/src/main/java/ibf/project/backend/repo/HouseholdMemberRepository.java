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
    String SQL_CHECK_MEMBER_EXISTENCE = "SELECT COUNT(*) FROM household_members WHERE user_id = ? AND household_id = ?";

    public boolean saveHouseholdMember(HouseholdMember member) {
        System.out.println("Trying to save member: " + member);
        if (checkExistingMember(member)) {
            System.out.println("Member already exists for household: " + member.getHouseholdId());
            return false;
        }

        System.out.println("Adding member because it does not exist yet");
        String recordId = UUID.randomUUID().toString().substring(0, 8);
        int rowsAffected = jdbcTemplate.update(SQL_SAVE_MEMBER, recordId, member.getUserId(),
                member.getHouseholdId());
        return rowsAffected > 0;
    }

    public boolean checkExistingMember(HouseholdMember member) {
        int count = jdbcTemplate.queryForObject(SQL_CHECK_MEMBER_EXISTENCE, Integer.class, member.getUserId(),
                member.getHouseholdId());
        return count > 0;
    }
}

