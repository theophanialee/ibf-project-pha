package ibf.project.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibf.project.backend.models.ProductDetails;
import ibf.project.backend.repo.ProductRepository;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepo;

    public void saveAllProducts(List<ProductDetails> products) {
        productRepo.saveAllProducts(products);
    }

    public List<ProductDetails> findProductsByIngredient(String ingredient) {
        return productRepo.findProductsByIngredient(ingredient);
    }
}
