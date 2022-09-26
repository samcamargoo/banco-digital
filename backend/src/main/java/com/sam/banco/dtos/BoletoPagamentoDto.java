package com.sam.banco.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoletoPagamentoDto {

	private String password;
	private String codigoDeBarras;
}
