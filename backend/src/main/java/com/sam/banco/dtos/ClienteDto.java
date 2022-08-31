package com.sam.banco.dtos;

import com.sam.banco.entities.Cliente;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClienteDto {


	

	private String nome;
	private String email;
	private String dataNascimento;
	private String cpf;
	private ContaDto conta;
	

	
	public ClienteDto(Cliente cliente) {
		this.nome = cliente.getNome();
		this.email = cliente.getEmail();
		this.dataNascimento = cliente.getDataNascimento();
		this.cpf = cliente.getCpf();
		this.conta = new ContaDto(cliente.getConta());
	}
	
}
