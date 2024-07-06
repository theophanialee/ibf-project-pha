package ibf.project.backend.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import ibf.project.backend.models.ProductDetails;

@Repository
public class ProductRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private MongoOperations mongoOperations;

    public boolean saveAllProducts(List<ProductDetails> products) {
        boolean anyChanges = false;

        for (ProductDetails product : products) {
            Query query = new Query(Criteria.where("foodId").is(product.getFoodId()));
            Update update = new Update()
                    .set("label", product.getLabel())
                    .set("brand", product.getBrand())
                    .set("image", product.getImage())
                    .set("servingSizeWeight", product.getServingSizeWeight());

            mongoOperations.upsert(query, update, ProductDetails.class);

            anyChanges = true;
        }

        return anyChanges;
    }

    public List<ProductDetails> findProductsByIngredient(String ingredient) {
        Query query = new Query();
        query.addCriteria(Criteria.where("label").regex(ingredient, "i"));
        return mongoTemplate.find(query, ProductDetails.class);
    }
}
