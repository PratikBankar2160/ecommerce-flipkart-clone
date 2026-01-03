package jwt_ecommerce.Controller;

import jwt_ecommerce.Entity.Order;
import jwt_ecommerce.Entity.OrderStatus;
import jwt_ecommerce.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/checkout/{cartId}/{userId}")
    public Order checkout(@PathVariable Long cartId, @PathVariable Long userId) {
        return orderService.checkout(cartId, userId);
    }

    @PutMapping("/status/{orderId}")
    public Order updateStatus(
            @PathVariable Long orderId,
            @RequestParam OrderStatus status) {

        return orderService.updateOrderStatus(orderId, status);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderService.getOrdersByUser(userId);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {

        orderService.cancelOrder(orderId);

        return ResponseEntity.ok("Order cancelled successfully");
    }


    // ADMIN
    @GetMapping("/admin")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
