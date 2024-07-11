package ibf.project.backend.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import ibf.project.backend.models.Listing;
import ibf.project.backend.services.ListingService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/inventory")
public class ListingController {

    @Autowired
    private ListingService listingSvc;

    @PostMapping("/add")
    public ResponseEntity<Listing> addListing(@RequestBody Listing listing) {
        listing.setLastEdited(LocalDateTime.now());
        System.out.println("listing controller to add: " + listing);
        listingSvc.saveListing(listing);
        // System.out.println(ResponseEntity.ok().body("Listing added successfully!"));
        return ResponseEntity.ok(listing);
    }

    @GetMapping("/listings/{householdId}")
    public ResponseEntity<List<Listing>> getListingByHHId(@PathVariable String householdId) {

        List<Listing> listings = listingSvc.getListingByHHId(householdId);
        return ResponseEntity.ok(listings);
    }

    @DeleteMapping("/delete/{listingId}")
    public ResponseEntity<Boolean> deleteListing(@PathVariable String listingId) {
        boolean isDeleted = listingSvc.deleteListing(listingId);
        if (isDeleted) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(404).body(false);
        }
    }

}
