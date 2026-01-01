package jwt_ecommerce.Service;

import jwt_ecommerce.DTO.AddToCartRequest;
import jwt_ecommerce.DTO.CartItemResponse;
import jwt_ecommerce.DTO.CartResponse;
import jwt_ecommerce.DTO.UpdateCartItemRequest;
import jwt_ecommerce.Entity.Cart;
import jwt_ecommerce.Entity.CartItem;
import jwt_ecommerce.Entity.Product;
import jwt_ecommerce.Entity.User;
import jwt_ecommerce.Repository.CartItemRepository;
import jwt_ecommerce.Repository.CartRepository;
import jwt_ecommerce.Repository.ProductRepository;
import jwt_ecommerce.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private CartItemRepository cartItemRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private UserRepository userRepo;

//    public CartItemResponse addToCart(AddToCartRequest request) {
//
//        Cart cart = cartRepo.findById(request.getCartId()).orElseThrow();
//        Product product = productRepo.findById(request.getProductId()).orElseThrow();
//
//        CartItem item = new CartItem();
//        item.setCart(cart);
//        item.setProduct(product);
//        item.setQuantity(request.getQuantity());
//        item.setPrice(product.getPrice());
//
//        CartItem saved = cartItemRepo.save(item);
//
//        CartItemResponse res = new CartItemResponse();

    /// /        res.setId(saved.getId());
//        res.setItemId(saved.getId());
//        res.setQuantity(saved.getQuantity());
//        res.setPrice(saved.getPrice());
//        res.setProductId(product.getId());
//        res.setProductName(product.getName());
//
//        return res;
//    }
    public CartItemResponse addToCart(AddToCartRequest request) {

        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepo.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepo.save(newCart);
                });

        Product product = productRepo.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(request.getQuantity());
        item.setPrice(product.getPrice());

        CartItem saved = cartItemRepo.save(item);

        CartItemResponse res = new CartItemResponse();
        res.setItemId(saved.getId());
        res.setQuantity(saved.getQuantity());
        res.setPrice(saved.getPrice());
        res.setProductId(product.getId());
        res.setProductName(product.getName());

        return res;
    }


    public CartResponse viewCart(Long cartId) {

        Cart cart = cartRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        List<CartItemResponse> itemResponses = new ArrayList<>();
        double total = 0;

        for (CartItem item : cart.getItems()) {

            CartItemResponse dto = new CartItemResponse();
            dto.setItemId(item.getId());
            dto.setProductId(item.getProduct().getId());
            dto.setProductName(item.getProduct().getName());
            dto.setQuantity(item.getQuantity());
            dto.setPrice(item.getPrice());

            double subTotal = item.getPrice() * item.getQuantity();
            dto.setSubTotal(subTotal);

            total += subTotal;
            itemResponses.add(dto);
        }

        CartResponse response = new CartResponse();
        response.setCartId(cart.getId());
        response.setItems(itemResponses);
        response.setTotalAmount(total);

        return response;
    }

    public CartItem updateQuantity(UpdateCartItemRequest request) {

        CartItem item = cartItemRepo.findById(request.getCartItemId())
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        item.setQuantity(request.getQuantity());

        return cartItemRepo.save(item);
    }

    public void removeItem(Long cartItemId) {

        CartItem item = cartItemRepo.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        cartItemRepo.delete(item);
    }


}
