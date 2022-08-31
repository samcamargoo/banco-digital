package com.sam.banco.controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sam.banco.model.LoginForm;
import com.sam.banco.security.JWTTokenService;
import com.sam.banco.services.ClienteService;
import com.sam.banco.dtos.TokenDto;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/login")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class LoginController {

	private final AuthenticationManager authManager;
	private final JWTTokenService tokenService;
	private final ClienteService clienteService;
	@PostMapping
	public ResponseEntity<Object> autenticar(@RequestBody @Valid LoginForm form) {
		
		UsernamePasswordAuthenticationToken login = form.converter();
		
		
		try {
			
			final Authentication authentication = authManager.authenticate(login);
			String token = tokenService.gerarToken(authentication);
			return ResponseEntity.status(HttpStatus.OK).body(new TokenDto(token, "Bearer", "testando"));
		} catch(AuthenticationException e) {
			return ResponseEntity.notFound().build();
		}
	}
}
