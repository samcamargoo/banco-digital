package com.sam.banco.entities;

import java.math.BigDecimal;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transferencia {

	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	private UUID id;
	private BigDecimal valor;
	@ManyToOne
	@JoinColumn(name = "beneficiario_id")
	private Conta beneficiario;
	
	@ManyToOne
	@JoinColumn(name = "conta_pagadora_id")
	private Cliente contaPagadora;
}
