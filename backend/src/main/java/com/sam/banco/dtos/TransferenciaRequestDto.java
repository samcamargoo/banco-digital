package com.sam.banco.dtos;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransferenciaRequestDto {

	private String numeroDaContaBeneficiario;
	private BigDecimal valor;
}
