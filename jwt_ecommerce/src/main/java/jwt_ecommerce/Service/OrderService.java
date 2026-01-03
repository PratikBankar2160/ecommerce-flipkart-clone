package jwt_ecommerce.Service;

import jakarta.transaction.Transactional;
import jwt_ecommerce.Entity.*;
import jwt_ecommerce.Repository.CartItemRepository;
import jwt_ecommerce.Repository.CartRepository;
import jwt_ecommerce.Repository.OrderRepository;
import jwt_ecommerce.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartItemRepository cartItemRepo;

    @Transactional
    public Order checkout(Long cartId, Long userId) {

        Cart cart = cartRepo.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Cart does not belong to user");
        }

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PLACED);

        double total = 0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItem cartItem : cart.getItems()) {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(cartItem.getProduct());
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(cartItem.getPrice());

            total += cartItem.getQuantity() * cartItem.getPrice();
            orderItems.add(item);
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);

        Order savedOrder = orderRepo.save(order);

        // ✅ THIS IS ENOUGH
        cart.getItems().clear();
        cartRepo.save(cart);

        return savedOrder;
    }




    public Order updateOrderStatus(Long orderId, OrderStatus status) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepo.save(order);
    }

    public List<Order> getOrdersByUser(Long userId) {
        return orderRepo.findByUserId(userId);
    }

    public Order updateStatus(Long orderId, OrderStatus status) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);
        return orderRepo.save(order);
    }

    // ADMIN – get all orders
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    //Cancel order
    public void cancelOrder(Long orderId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Business rule
        if (order.getStatus() == OrderStatus.SHIPPED ||
                order.getStatus() == OrderStatus.OUT_FOR_DELIVERY ||
                order.getStatus() == OrderStatus.DELIVERED) {

            throw new IllegalStateException(
                    "Order cannot be cancelled at this stage"
            );
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepo.save(order);
    }

}
