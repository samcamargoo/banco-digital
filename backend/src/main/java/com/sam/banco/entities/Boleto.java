package com.sam.banco.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Boleto {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;
	private BigDecimal valor;
	
	private String codigoDeBarras;
	
	private LocalDateTime geradoEm;
	private LocalDateTime pagoEm;
	@ManyToOne
	@JoinColumn(name = "cliente_id")
	private Cliente cliente;
	
	@OneToOne
	@JoinColumn(name = "conta_pagadora_id")
	private Conta conta;
	
	private boolean pago;
}
