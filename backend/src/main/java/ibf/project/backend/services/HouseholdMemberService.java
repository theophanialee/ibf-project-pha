package ibf.project.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf.project.backend.models.HouseholdMember;
import ibf.project.backend.models.User;
import ibf.project.backend.repo.HouseholdMemberRepository;
import ibf.project.backend.repo.UserRepository;

@Service
public class HouseholdMemberService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    HouseholdMemberRepository householdMemberRepo;

    public Optional<User> findUserByUsername(String username) {
        return userRepo.findUserByUsername(username);
    }

    public void addUser(HouseholdMember member) {
        householdMemberRepo.saveHouseholdMember(member);
        ;
    }

    public boolean addMemberToHousehold(String householdId, User user) {
        HouseholdMember newMember = new HouseholdMember();
        newMember.setHouseholdId(householdId);
        newMember.setUserId(user.getUserId());
        return householdMemberRepo.saveHouseholdMember(newMember);
    }

}
