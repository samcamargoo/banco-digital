package com.sam.banco.dtos;

import java.util.UUID;

import com.sam.banco.entities.Conta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContaDto {


	private String numero;
	private String saldo;

	
	public ContaDto(Conta conta) {
		this.numero = conta.getNumero();
		this.saldo = conta.getSaldo().toString();
	
	
	}
}
