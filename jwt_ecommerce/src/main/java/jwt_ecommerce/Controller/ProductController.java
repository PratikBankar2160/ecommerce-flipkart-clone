package jwt_ecommerce.Controller;

import jwt_ecommerce.Entity.Product;
import jwt_ecommerce.Service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product saved = service.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable Long id) {
        Product product = service.getProductById(id);
        return product != null
                ? ResponseEntity.ok(product)
                : ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Product not found with id " + id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        Product updated = service.updateProduct(id, product);
        return updated != null
                ? ResponseEntity.ok(updated)
                : ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Product not found with id " + id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        return service.deleteProduct(id)
                ? ResponseEntity.ok("Deleted successfully")
                : ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Product not found with id " + id);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable Long categoryId) {
        List<Product> products = service.getProductsByCategory(categoryId);

        if (products.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No products found for category " + categoryId);
        }

        return ResponseEntity.ok(products);
    }

    @GetMapping("/brands/{categoryId}")
    public List<String> getBrandsByCategory(@PathVariable Long categoryId) {
        return service.getBrandsByCategory(categoryId);
    }

    @GetMapping("/category/{categoryId}/brand/{brand}")
    public List<Product> getProductsByCategoryAndBrand(
            @PathVariable Long categoryId,
            @PathVariable String brand) {

        return service.getProductsByCategoryAndBrand(categoryId, brand);
    }

}
