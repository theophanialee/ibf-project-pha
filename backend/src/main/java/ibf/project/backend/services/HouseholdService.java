package ibf.project.backend.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf.project.backend.models.HouseholdDetails;
import ibf.project.backend.repo.HouseholdRepository;

@Service
public class HouseholdService {

    @Autowired
    HouseholdRepository householdRepository;

    public HouseholdDetails createHousehold(HouseholdDetails household) {

        String uuid = UUID.randomUUID().toString().substring(0, 8);

        household.setHouseholdId(uuid);
        household.setLastEdited(LocalDateTime.now());
        return householdRepository.createHousehold(household);
    }
}
