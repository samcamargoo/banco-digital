package com.sam.banco.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sam.banco.dtos.AtividadeResponseDto;
import com.sam.banco.services.AtividadeService;
import com.sam.banco.services.ClienteService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/atividades")
@AllArgsConstructor
public class AtividadeController {

	private final AtividadeService atividadeService;
	private final ClienteService clienteService;
	
	@GetMapping
	public ResponseEntity<List<AtividadeResponseDto>> listarAtividadesPorEmail(@RequestParam(name = "email") String email) {
		return atividadeService.listarAtividadesById(email);
	}
	

	
}
