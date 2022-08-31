package com.sam.banco.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sam.banco.entities.Boleto;

public interface BoletoRepository extends JpaRepository <Boleto, UUID>{

	boolean existsByCodigoDeBarras(String codigoDeBarras);
	
	@Query("SELECT b from Boleto b WHERE b.codigoDeBarras =:codigoDeBarras")
	Optional<Boleto> findByCodigoDeBarras(@Param("codigoDeBarras") String codigoDeBarras);
}
