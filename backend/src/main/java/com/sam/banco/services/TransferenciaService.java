package com.sam.banco.services;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.sam.banco.dtos.TransferenciaRequestDto;
import com.sam.banco.entities.Conta;
import com.sam.banco.entities.Transferencia;
import com.sam.banco.repositories.ContaRepository;
import com.sam.banco.repositories.TransferenciaRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransferenciaService {

	private final ContaRepository contaRepository;
	private final ClienteService clienteService;
	private final TransferenciaRepository transferenciaRepository;
	
	public ResponseEntity<Object> transferirDinheiroEntreContas(TransferenciaRequestDto transferenciaDto) {
		
		UserDetails user = clienteService.getUsuarioLogado();
		/*Conta que enviou transferencia*/
		Optional<Conta> contaOptional = contaRepository.findContaByCliente(user.getUsername());
		
		BigDecimal contaOptionalSaldo = contaOptional.get().getSaldo().subtract(transferenciaDto.getValor());
		
		if(!(contaOptionalSaldo.compareTo(BigDecimal.ZERO) > 0)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("seu saldo atual é de " + contaOptional.get().getSaldo() 
					+  " e você tentou realizar uma transferencia de " + transferenciaDto.getValor());
		}
		
		/*Conta Destino*/
		Optional<Conta> beneficiarioOptional = contaRepository.findContaByNumero(transferenciaDto.getNumeroDaContaBeneficiario());
		
		if(beneficiarioOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Conta não existe");
		}
		
		var transferencia = new Transferencia();
		transferencia.setBeneficiario(beneficiarioOptional.get());
		transferencia.setValor(transferenciaDto.getValor());
		transferencia.setContaPagadora(contaOptional.get().getCliente());
		
		transferenciaRepository.save(transferencia);
		
		/*Subtrair no saldo da Conta que enviou transferencia*/
		BigDecimal saldo = contaOptional.get().getSaldo().subtract(transferenciaDto.getValor());
		contaOptional.get().setSaldo(saldo);
		contaRepository.save(contaOptional.get());
		
		/*Adicionar no saldo da Conta beneficiada o valor da transferencia*/
		BigDecimal beneficiarioSaldo = beneficiarioOptional.get().getSaldo().add(transferenciaDto.getValor());
		beneficiarioOptional.get().setSaldo(beneficiarioSaldo);
		contaRepository.save(beneficiarioOptional.get());
		return ResponseEntity.status(HttpStatus.CREATED).body("transferencia efetuada com sucesso");
		
		
		
	}
}
