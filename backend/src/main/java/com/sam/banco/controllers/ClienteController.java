package com.sam.banco.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sam.banco.entities.Cliente;
import com.sam.banco.services.ClienteService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/clientes")
@AllArgsConstructor
public class ClienteController {

	private ClienteService clienteService;
	
	@PostMapping
	public ResponseEntity<Object> criarConta(@RequestBody Cliente cliente) {
		return clienteService.criarConta(cliente);
	}
	
	@GetMapping
	public ResponseEntity<Object> listarClientes() {
		return ResponseEntity.status(HttpStatus.OK).body(clienteService.listarClientes());
	}
	
	@GetMapping("/verificar-cpf")
	public boolean existsByCpf(@RequestParam(name = "cpf") String cpf) {
		return clienteService.existsByCpf(cpf);
	}
	
	@GetMapping("/verificar-email")
	public boolean existsByEmail(@RequestParam(name = "email") String email) {
		return clienteService.existsByEmail(email);
	}
}
