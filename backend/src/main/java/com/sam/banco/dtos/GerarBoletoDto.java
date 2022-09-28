package com.sam.banco.dtos;

import java.math.BigDecimal;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GerarBoletoDto {

	@NotBlank
	private String descricao;
	@DecimalMin(value = "0.0", inclusive = false)
	private BigDecimal valor;
}
