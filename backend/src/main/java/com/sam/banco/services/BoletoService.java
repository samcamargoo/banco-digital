package com.sam.banco.services;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.sam.banco.dtos.BoletoDto;
import com.sam.banco.entities.Boleto;
import com.sam.banco.entities.Cliente;
import com.sam.banco.repositories.BoletoRepository;
import com.sam.banco.repositories.ClienteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoletoService {

	private final BoletoRepository boletoRepository;
	private final ClienteService clienteService;
	private final ClienteRepository clienteRepository;

	@Transactional
	public ResponseEntity<Object> gerarBoleto(Boleto boleto) {
		
		UserDetails usuario = clienteService.getUsuarioLogado();
		Optional<Cliente> cliente = clienteRepository.findByEmail(usuario.getUsername());
		
		boleto.setCliente(cliente.get());
		boleto.setGeradoEm(LocalDateTime.now());
		boleto.setCodigoDeBarras(gerarCodigoDeBarras());
		boleto.setValidade(LocalDate.now().plusDays(7));
		
		/*Se o boleto vencer num domingo, adicione mais um dia*/
		if(boleto.getValidade().getDayOfWeek() == DayOfWeek.SUNDAY) {
			boleto.setValidade(boleto.getValidade().plusDays(1));
		}
		
		var boletoDto = new BoletoDto();
		BeanUtils.copyProperties(boleto, boletoDto);
		boletoRepository.save(boleto);
		return ResponseEntity.status(HttpStatus.CREATED).body(boletoDto);
	}
	
	public String gerarCodigoDeBarras() {
		
		String codigoDeBarras = RandomStringUtils.randomNumeric(48);
		
		while(boletoRepository.existsByCodigoDeBarras(codigoDeBarras)) {
			codigoDeBarras = RandomStringUtils.randomNumeric(48);
		}
		return codigoDeBarras;
	}
	
	@Transactional
	public ResponseEntity<Object> pagarBoleto(String codigoDeBarras) {
		
		/*Procurando o boleto no banco de dados*/
		Optional<Boleto> boletoOptional = boletoRepository.findByCodigoDeBarras(codigoDeBarras);
		
		if(boletoOptional.get().getValidade().isBefore(LocalDate.now())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("boleto vencido");
		}
		
		/*Obtendo usuario logado no sistema*/
		UserDetails usuario = clienteService.getUsuarioLogado();
		
		/*Usuário que esta pagando o boleto*/
		Optional<Cliente> clienteOptional = clienteRepository.findByEmail(usuario.getUsername());
		
	
		
		if(boletoOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("boleto não encontrado");
		}
		
		if(boletoOptional.get().isPago()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("boleto já foi pago");
		}
		/*subtraindo o saldo atual da conta - valor do boleto para saber se o resultado é maior que ZERO*/
		BigDecimal saldo = clienteOptional.get().getConta().getSaldo().subtract(boletoOptional.get().getValor()); 
		
		/*Se o resultado da subtraçao acima for menor que ZERO, retornamos saldo insuficiente*/
		if(!((saldo.compareTo(BigDecimal.ZERO)) >= 0)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("saldo insuficiente");
		}
		
		
		
		/*Atualizando o valor do saldo da conta pagadora após pagar o boleto*/
		clienteOptional.get().getConta().setSaldo(clienteOptional.get().getConta().getSaldo().subtract(boletoOptional.get().getValor()));
		
		/*Informando qual conta bancaria pagou o boleto*/
		boletoOptional.get().setConta(clienteOptional.get().getConta());
		
		/*setando o boleto como pago*/
		boletoOptional.get().setPago(true);
		/*Data e hora que o boleto foi pago*/
		boletoOptional.get().setPagoEm(LocalDateTime.now());
		
		/*Adicionams na conta que gerou o boleto o valor do mesmo */
		boletoOptional.get().getCliente().getConta().setSaldo(boletoOptional.get().getCliente().getConta().getSaldo().add(boletoOptional.get().getValor()));
		
		/*Prosseguimos para salvar o boleto*/
		boletoRepository.save(boletoOptional.get());
		/*Prosseguimos para salvar o saldo da conta*/
		clienteRepository.save(clienteOptional.get());
		
		return ResponseEntity.status(HttpStatus.OK).body("boleto pago");
	}
}
