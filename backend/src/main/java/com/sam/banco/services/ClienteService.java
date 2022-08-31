package com.sam.banco.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sam.banco.dtos.ClienteDto;
import com.sam.banco.entities.Cliente;
import com.sam.banco.repositories.ClienteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClienteService {

	private final ClienteRepository clienteRepository;
	private final ContaService contaService;
	private final PasswordEncoder passwordEncoder;

	public ResponseEntity<Object> criarConta(Cliente cliente) {

		cliente.setPassword(passwordEncoder.encode(cliente.getPassword()));
		clienteRepository.save(cliente);
		contaService.criarContaAoRegistrarUsuario(cliente);

		return ResponseEntity.status(HttpStatus.CREATED).body(cliente);
	}

	public List<ClienteDto> listarClientes() {
		List<Cliente> clientes = clienteRepository.findAll();
		return clientes.stream().map(x -> new ClienteDto(x)).collect(Collectors.toList());
	}
	
	public UserDetails getUsuarioLogado() {
		
		UserDetails user = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return user;
	}
}
