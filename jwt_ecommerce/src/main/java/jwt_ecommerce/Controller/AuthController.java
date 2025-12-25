package jwt_ecommerce.Controller;

import jwt_ecommerce.DTO.LoginRequest;
import jwt_ecommerce.DTO.RegisterRequest;
import jwt_ecommerce.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // allow Postman/React
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return service.login(request);
    }
}
