package com.sam.banco.dtos;



import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenDto {

	private String token;
	private String tipo;
	private String nome;
}
