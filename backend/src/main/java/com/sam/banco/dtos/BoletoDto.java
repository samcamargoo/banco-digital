package com.sam.banco.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sam.banco.entities.Boleto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoletoDto {

	
	private String valor;
	private String codigoDeBarras;
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime geradoEm;
	private ClienteDto clienteDto;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate validade;
	private String descricao;
	
	public BoletoDto(Boleto boleto) {
		this.valor = boleto.getValor().toString();
		this.geradoEm = boleto.getGeradoEm();
		this.clienteDto = new ClienteDto(boleto.getCliente());
		this.validade = boleto.getValidade();
		this.codigoDeBarras = boleto.getCodigoDeBarras();
		this.descricao = boleto.getDescricao();
		
	}
}

