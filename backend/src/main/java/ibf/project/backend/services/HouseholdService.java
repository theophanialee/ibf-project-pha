package ibf.project.backend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibf.project.backend.models.HouseholdDetails;
import ibf.project.backend.models.HouseholdMember;
import ibf.project.backend.repo.HouseholdMemberRepository;
import ibf.project.backend.repo.HouseholdRepository;

@Service
public class HouseholdService {

    @Autowired
    HouseholdRepository householdRepo;

    @Autowired
    HouseholdMemberRepository householdMemberRepo;

    @Transactional
    public HouseholdDetails createHousehold(HouseholdDetails household) {

        String householdId = UUID.randomUUID().toString().substring(0, 8);

        household.setHouseholdId(householdId);
        household.setLastEdited(LocalDateTime.now());

        HouseholdMember member = new HouseholdMember();
        member.setHouseholdId(householdId);
        member.setUserId(household.getUserId());
        member.setRecordId(UUID.randomUUID().toString().substring(0, 8));

        householdRepo.createHousehold(household);
        householdMemberRepo.saveHouseholdMember(member);

        return household;
    }

    public List<HouseholdDetails> getHouseholdsByUserId(String userId) {
        return householdRepo.getHouseholdsByUserId(userId);
    }

    public HouseholdDetails getHouseholdById(String householdId) {
        return householdRepo.getHouseholdById(householdId);
    }

    public HouseholdDetails updateHousehold(HouseholdDetails household) {
        int rowsAffected = householdRepo.updateHousehold(household);
        if (rowsAffected > 0) {
            return householdRepo.getHouseholdById(household.getHouseholdId());
        } else {
            throw new RuntimeException("Failed to update household with id: " + household.getHouseholdId());
        }
    }
}
