package com.sam.banco.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sam.banco.entities.Conta;

public interface ContaRepository extends JpaRepository <Conta, UUID>{

	
	boolean existsByNumero(String numero);
	
	@Query("SELECT c from Conta c join c.cliente WHERE email =:email")
	Optional<Conta> findContaByCliente(@Param("email") String email);
	
	@Query("SELECT c from Conta c WHERE c.numero =:numero")
	Optional<Conta> findContaByNumero(@Param("numero") String numero);
}
