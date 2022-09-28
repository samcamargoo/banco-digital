package com.sam.banco.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sam.banco.model.EmailBoletoGerado;
import com.sam.banco.services.EmailSenderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/email")
@AllArgsConstructor
public class EmailController {
	
	private EmailSenderService emailService;
	
	@PostMapping
	public void sendMailBoletoGerado(@RequestBody EmailBoletoGerado boleto) {
		emailService.sendEmail(boleto);
	}

}
