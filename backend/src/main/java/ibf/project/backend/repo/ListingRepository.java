package ibf.project.backend.repo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import ibf.project.backend.models.Listing;

import java.util.List;
import java.util.UUID;

@Repository
public class ListingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // SQL queries
    private static final String SQL_INSERT_LISTING = "INSERT INTO listings (listing_id, posted_by, household_id, label, brand, servingSize, servings, expiry, last_edited) "
            +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    private static final String SQL_FIND_BY_HOUSEHOLD_ID = "SELECT * FROM listings WHERE household_id = ?";

    public int saveListing(Listing listing) {

        String listingId = UUID.randomUUID().toString().substring(0, 8);
        listing.setListingId(listingId);

        return jdbcTemplate.update(SQL_INSERT_LISTING, listing.getListingId(), listing.getUserId(),
                listing.getHouseholdId(), listing.getLabel(), listing.getBrand(),
                listing.getServingSizeWeight(), listing.getServings(), listing.getExpiryDate(),
                listing.getLastEdited());
    }

    public List<Listing> getListingByHHId(String householdId) {
        return jdbcTemplate.query(SQL_FIND_BY_HOUSEHOLD_ID, new ListingRowMapper(), householdId);
    }

    private static final class ListingRowMapper implements RowMapper<Listing> {
        @Override
        public Listing mapRow(ResultSet rs, int rowNum) throws SQLException {
            String listingId = rs.getString("listing_id");
            String postedBy = rs.getString("posted_by");
            String householdId = rs.getString("household_id");
            String label = rs.getString("label");
            String brand = rs.getString("brand");
            Integer servingSize = rs.getInt("servingSize");
            Integer servings = rs.getInt("servings");
            LocalDate expiry = rs.getDate("expiry").toLocalDate();
            LocalDateTime lastEdited = rs.getTimestamp("last_edited").toLocalDateTime();

            Listing listing = new Listing();
            listing.setListingId(listingId);
            listing.setUserId(postedBy);
            listing.setHouseholdId(householdId);
            listing.setLabel(label);
            listing.setBrand(brand);
            listing.setServingSizeWeight(servingSize);
            listing.setServings(servings);
            listing.setExpiryDate(expiry);
            listing.setLastEdited(lastEdited);

            return listing;
        }
    }
}