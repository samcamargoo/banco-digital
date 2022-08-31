package com.sam.banco.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sam.banco.dtos.TransferenciaRequestDto;
import com.sam.banco.services.TransferenciaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/transferencias")
@AllArgsConstructor
public class TransferenciaController {

	private final TransferenciaService transferenciaService;
	@PostMapping
	public ResponseEntity<Object> transferirDinheiroEntreContas(@RequestBody TransferenciaRequestDto transferenciaDto) {
		return transferenciaService.transferirDinheiroEntreContas(transferenciaDto);
	}
}
