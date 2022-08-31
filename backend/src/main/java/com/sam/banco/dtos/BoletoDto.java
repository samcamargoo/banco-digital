package com.sam.banco.dtos;

import java.math.BigDecimal;
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

	
	private BigDecimal valor;
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime geradoEm;
	private ClienteDto clienteDto;
	
	public BoletoDto(Boleto boleto) {
		this.valor = boleto.getValor();
		this.geradoEm = boleto.getGeradoEm();
		this.clienteDto = new ClienteDto(boleto.getCliente());
	}
}

