package com.sam.banco.services;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sam.banco.dtos.ClienteDto;
import com.sam.banco.entities.Cliente;
import com.sam.banco.enums.RolesEnum;
import com.sam.banco.repositories.ClienteRepository;
import com.sam.banco.repositories.RoleRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClienteService {

	private final ClienteRepository clienteRepository;
	private final ContaService contaService;
	private final PasswordEncoder passwordEncoder;
	private final RoleRepository roleRepository;
	@Transactional
	public ResponseEntity<Object> criarConta(Cliente cliente) {
		
		if(cliente.getDataNascimento().isAfter(LocalDate.now())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Data de nascimento inválida");
		}
		
		cliente.setRoles(Arrays.asList(roleRepository.findRole(RolesEnum.ROLE_USER)));
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
	
	public boolean existsByCpf(String cpf) {
		return clienteRepository.existsByCpf(cpf);
	}
	
	public boolean existsByEmail(String email) {
		return clienteRepository.existsByEmail(email);
	}
}
