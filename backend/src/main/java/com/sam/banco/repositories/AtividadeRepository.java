package com.sam.banco.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sam.banco.entities.Atividade;

public interface AtividadeRepository extends JpaRepository<Atividade, UUID> {

	@Query("SELECT a from Atividade a join a.cliente u WHERE u.email =:email ORDER BY a.data desc")
	List<Atividade> listarAtividades(@Param("email") String email);
}
