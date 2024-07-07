package ibf.project.backend.models;

import java.time.LocalDateTime;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "household")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HouseholdDetails {

    private String householdId;
    private String name;
    private String description;
    private LocalDateTime lastEdited;

}
