package ibf.project.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "products")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDetails {
    @Id
    private String id;
    private String foodId;
    private String label;
    private String image;
    private String brand;
    private Double servingSizeWeight;
}
