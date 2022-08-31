package com.sam.banco.dtos;

import java.math.BigDecimal;

import com.sam.banco.entities.Conta;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContaDto {


	private String numero;
	private BigDecimal saldo;

	
	public ContaDto(Conta conta) {
		this.numero = conta.getNumero();
		this.saldo = conta.getSaldo();
	
	}
}
