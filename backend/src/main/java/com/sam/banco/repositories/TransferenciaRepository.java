package com.sam.banco.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sam.banco.entities.Transferencia;

public interface TransferenciaRepository extends JpaRepository<Transferencia, UUID> {

}
