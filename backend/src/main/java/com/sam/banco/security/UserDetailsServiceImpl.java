package com.sam.banco.security;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sam.banco.entities.Cliente;
import com.sam.banco.repositories.ClienteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService{

	private final ClienteRepository clienteRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Cliente cliente = clienteRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
		return new User(cliente.getEmail(), cliente.getPassword(), true, true, true, true, cliente.getAuthorities());
	}

}