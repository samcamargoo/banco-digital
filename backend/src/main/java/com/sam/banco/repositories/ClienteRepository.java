package com.sam.banco.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sam.banco.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, UUID> {

	Optional<Cliente> findByEmail(String emailUsuario);

}
