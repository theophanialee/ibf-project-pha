package ibf.project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ibf.project.backend.models.ProductDetails;
import ibf.project.backend.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productSvc;

    @PostMapping("/cache")
    public void saveProducts(@RequestBody List<ProductDetails> products) {
        productSvc.saveAllProducts(products);
    }

    @GetMapping("/check")
    public List<ProductDetails> getProductsByIngredient(@RequestParam("ingr") String ingredient) {
        return productSvc.findProductsByIngredient(ingredient);
    }

}
