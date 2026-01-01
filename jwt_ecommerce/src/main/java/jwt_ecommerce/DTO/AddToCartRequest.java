package jwt_ecommerce.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AddToCartRequest {
    private Long userId;
    private Long productId;
    private int quantity;
}
