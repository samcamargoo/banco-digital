package com.sam.banco.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailBoletoGerado {

	private String valor;
	private String descricao;
	private String codigoDeBarras;
	private String email;
}
