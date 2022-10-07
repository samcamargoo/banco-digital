package com.sam.banco.services;

import java.math.BigDecimal;
import java.text.NumberFormat;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sam.banco.dtos.BoletoDto;
import com.sam.banco.dtos.BoletoPagamentoDto;
import com.sam.banco.dtos.BoletoPagoInformacoes;
import com.sam.banco.dtos.GerarBoletoDto;
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
	private final PasswordEncoder passwordEncoder;
	private final AtividadeService atividadeService;
	
	@Transactional
	public ResponseEntity<Object> gerarBoleto(GerarBoletoDto boletoDto) {

		UserDetails usuario = ClienteService.getUsuarioLogado();
		Optional<Cliente> cliente = clienteRepository.findByEmail(usuario.getUsername());

		var boleto = new Boleto();
		boleto.setValor(boletoDto.getValor());
		boleto.setCliente(cliente.get());
		boleto.setGeradoEm(LocalDateTime.now());
		boleto.setCodigoDeBarras(gerarCodigoDeBarras());
		boleto.setValidade(LocalDate.now().plusDays(7));
		boleto.setDescricao(boletoDto.getDescricao());
		/* Se o boleto vencer num domingo, adicione mais um dia */
		if (boleto.getValidade().getDayOfWeek() == DayOfWeek.SUNDAY) {
			boleto.setValidade(boleto.getValidade().plusDays(1));
		}

		var retornoDto = new BoletoDto();
		BeanUtils.copyProperties(boleto, retornoDto);
		retornoDto.setValor(formatarValor(boleto.getValor()));
		retornoDto.setDescricao(boletoDto.getDescricao());
		boletoRepository.save(boleto);
		return ResponseEntity.status(HttpStatus.CREATED).body(retornoDto);
	}

	public String gerarCodigoDeBarras() {

		String codigoDeBarras = RandomStringUtils.randomNumeric(48);

		while (boletoRepository.existsByCodigoDeBarras(codigoDeBarras)) {
			codigoDeBarras = RandomStringUtils.randomNumeric(48);
		}
		return codigoDeBarras;
	}

	@Transactional
	public ResponseEntity<Object> pagarBoleto(BoletoPagamentoDto boletoPagamentoDto) {
		
		/* Obtendo usuario logado no sistema */
		UserDetails usuario = ClienteService.getUsuarioLogado();

		/* Usuário que esta pagando o boleto */
		Optional<Cliente> clienteOptional = clienteRepository.findByEmail(usuario.getUsername());
		
		if(!passwordEncoder.matches(boletoPagamentoDto.getPassword(), clienteOptional.get().getPassword())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Senha inválida");
		}
		
		/* Procurando o boleto no banco de dados */
		Optional<Boleto> boletoOptional = boletoRepository.findByCodigoDeBarras(boletoPagamentoDto.getCodigoDeBarras());
		
		if (boletoOptional.get().getValidade().isBefore(LocalDate.now())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("boleto vencido");
		}



		if (boletoOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("boleto não encontrado");
		}

		if (boletoOptional.get().isPago()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("boleto pago, insira outro código de barras");
		}
		/*
		 * subtraindo o saldo atual da conta - valor do boleto para saber se o resultado
		 * é maior que ZERO
		 */
		BigDecimal saldo = clienteOptional.get().getConta().getSaldo().subtract(boletoOptional.get().getValor());

		/*
		 * Se o resultado da subtraçao acima for menor que ZERO, retornamos saldo
		 * insuficiente
		 */
		if (!((saldo.compareTo(BigDecimal.ZERO)) >= 0)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("saldo insuficiente");
		}

		/* Atualizando o valor do saldo da conta pagadora após pagar o boleto */
		clienteOptional.get().getConta()
				.setSaldo(clienteOptional.get().getConta().getSaldo().subtract(boletoOptional.get().getValor()));

		/* Informando qual conta bancaria pagou o boleto */
		boletoOptional.get().setConta(clienteOptional.get().getConta());

		/* setando o boleto como pago */
		boletoOptional.get().setPago(true);
		/* Data e hora que o boleto foi pago */
		boletoOptional.get().setPagoEm(LocalDateTime.now());

		/* Adicionams na conta que gerou o boleto o valor do mesmo */
		boletoOptional.get().getCliente().getConta()
				.setSaldo(boletoOptional.get().getCliente().getConta().getSaldo().add(boletoOptional.get().getValor()));

		/* Prosseguimos para salvar o boleto */
		boletoRepository.save(boletoOptional.get());
		/* Prosseguimos para salvar o saldo da conta */
		clienteRepository.save(clienteOptional.get());
		/*Salvando atividade para usar no extrato*/
		atividadeService.registrarAtividade("boleto", formatarValor(boletoOptional.get().getValor()), boletoOptional.get());
		
		/*Aqui montaremos o objeto de retorno*/
		var boletoPagoInformacoes = new BoletoPagoInformacoes();
		boletoPagoInformacoes.setValor(formatarValor(boletoOptional.get().getValor()));
		boletoPagoInformacoes.setBeneficiario(boletoOptional.get().getCliente().getNome());
		boletoPagoInformacoes.setPagoEm(boletoOptional.get().getPagoEm());
		boletoPagoInformacoes.setPagador(clienteOptional.get().getNome());
		boletoPagoInformacoes.setMensagem("pagamento realizado com sucesso");
		return ResponseEntity.status(HttpStatus.OK).body(boletoPagoInformacoes);
	}

	public ResponseEntity<Object> acharBoletoPorCodigoDeBarras(String codigoDeBarras) {
		Optional<Boleto> boletoOptional = boletoRepository.findByCodigoDeBarras(codigoDeBarras);

		if (boletoOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("boleto não existe");
		}
		
		if(boletoOptional.get().isPago()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("boleto pago, insira outro código de barras");
		}

		var boletoDto = new BoletoDto();
		BeanUtils.copyProperties(boletoOptional.get(), boletoDto);
		boletoDto.setValor(formatarValor(boletoOptional.get().getValor()));
		return ResponseEntity.status(HttpStatus.OK).body(boletoDto);
	}
	
	public static String formatarValor(BigDecimal valor) {
		return NumberFormat.getCurrencyInstance().format(valor);
		
	}
	
}
