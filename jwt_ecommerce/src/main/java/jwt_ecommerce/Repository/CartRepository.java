package jwt_ecommerce.Repository;

import jwt_ecommerce.Entity.Cart;
import jwt_ecommerce.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
