package ibf.project.backend.models;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "household_members")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class HouseholdMember {

    private String recordId;
    private String userId;
    private String householdId;

}
