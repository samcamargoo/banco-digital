package com.sam.banco.services;

import java.math.BigDecimal;

import javax.transaction.Transactional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import com.sam.banco.entities.Cliente;
import com.sam.banco.entities.Conta;
import com.sam.banco.repositories.ContaRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ContaService {

	private final ContaRepository contaRepository;
	
	@Transactional
	public Conta criarContaAoRegistrarUsuario(Cliente cliente) {

		var conta = new Conta();
		conta.setNumero(gerarNumeroDaConta());
		conta.setSaldo(BigDecimal.ZERO);
		conta.setCliente(cliente);
		contaRepository.save(conta);
		return conta;

	}


	
	public String gerarNumeroDaConta() {
		String numeroDaConta = RandomStringUtils.randomNumeric(6);

		if (contaRepository.existsByNumero(numeroDaConta)) {
			numeroDaConta = RandomStringUtils.randomAlphanumeric(6);
			return numeroDaConta;
		}
		return numeroDaConta;
	}
}
