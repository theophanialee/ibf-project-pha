package ibf.project.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Table("listings")
public class Listing {
    @Id
    private String listingId;
    private String userId;
    private String householdId;
    private String label;
    private String brand;
    private Integer servingSizeWeight;
    private Integer servings;
    private LocalDate expiryDate;
    private LocalDateTime lastEdited;
}
