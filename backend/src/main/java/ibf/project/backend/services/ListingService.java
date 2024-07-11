package ibf.project.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf.project.backend.models.Listing;
import ibf.project.backend.repo.ListingRepository;

@Service
public class ListingService {

    @Autowired
    private ListingRepository listingRepo;

    public int saveListing(Listing listing) {
        return listingRepo.saveListing(listing);
    }

    public List<Listing> getListingByHHId(String householdId) {
        return listingRepo.getListingByHHId(householdId);
    }

}
