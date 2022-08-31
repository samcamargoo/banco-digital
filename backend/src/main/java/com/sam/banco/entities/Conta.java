package com.sam.banco.entities;

import java.math.BigDecimal;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Conta {

	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	private UUID id;
	
	@Column(nullable = false)
	private String numero;
	private BigDecimal saldo;
	
	@OneToOne
	@JoinColumn(name = "cliente_id", referencedColumnName = "id")
	private Cliente cliente;
	

}
