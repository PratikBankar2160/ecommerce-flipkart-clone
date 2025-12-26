package jwt_ecommerce.Service;

import jwt_ecommerce.Entity.Product;
import jwt_ecommerce.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public Product addProduct(Product product) {
        return repo.save(product);
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product getProductById(Long id) {
        return repo.findById(id).orElse(null);
    }


    public Product updateProduct(Long id, Product updated) {
        Product p = getProductById(id);

        p.setName(updated.getName());
        p.setDescription(updated.getDescription());
        p.setPrice(updated.getPrice());
        p.setQuantity(updated.getQuantity());
        p.setOldPrice(updated.getOldPrice());
        p.setBrand(updated.getBrand());
        p.setCategory(updated.getCategory());

        return repo.save(p);
    }

    public boolean deleteProduct(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}
