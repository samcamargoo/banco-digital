package com.sam.banco.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sam.banco.entities.Boleto;
import com.sam.banco.services.BoletoService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/boletos")
@AllArgsConstructor
public class BoletoController {

	private final BoletoService boletoService;

	@PostMapping
	public ResponseEntity<Object> gerarBoleto(@RequestBody Boleto boleto) {
		return boletoService.gerarBoleto(boleto);
	}

	@PostMapping("/{codigoDeBarras}")
	public ResponseEntity<Object> pagarBoleto(@PathVariable(value = "codigoDeBarras") String codigoDeBarras) {
		return boletoService.pagarBoleto(codigoDeBarras);
	}
}
