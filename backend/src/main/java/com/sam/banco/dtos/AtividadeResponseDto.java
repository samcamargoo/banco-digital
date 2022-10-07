package com.sam.banco.dtos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sam.banco.entities.Atividade;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AtividadeResponseDto {

	private String tipo;
	private String valor;
	@JsonFormat(pattern = "dd MMMM")
	private LocalDate data;
	private String descricao;
	
	public AtividadeResponseDto(Atividade atividade) {
		this.tipo = atividade.getTipo();
		this.valor = atividade.getValor();
		this.data = atividade.getData();
		this.descricao = atividade.getDescricao();

	}
}
