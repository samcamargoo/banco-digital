package com.sam.banco.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sam.banco.dtos.BoletoPagamentoDto;
import com.sam.banco.dtos.GerarBoletoDto;
import com.sam.banco.services.BoletoService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/boletos")
@AllArgsConstructor
public class BoletoController {

	private final BoletoService boletoService;

	@PostMapping
	public ResponseEntity<Object> gerarBoleto(@RequestBody GerarBoletoDto boleto) {
		return boletoService.gerarBoleto(boleto);
	}

	@PostMapping("/pagar-boleto")
	public ResponseEntity<Object> pagarBoleto(@RequestBody BoletoPagamentoDto boletoPagamentoDto) {
		return boletoService.pagarBoleto(boletoPagamentoDto);
	}
	
	@GetMapping
	public ResponseEntity<Object> acharBoletoPorCodigoDeBarras(@RequestParam("codigoDeBarras") String codigoDeBarras) {
		return boletoService.acharBoletoPorCodigoDeBarras(codigoDeBarras);
	}
	
	
}
