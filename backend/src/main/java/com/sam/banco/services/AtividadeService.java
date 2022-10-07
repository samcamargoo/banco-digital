package com.sam.banco.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.sam.banco.dtos.AtividadeResponseDto;
import com.sam.banco.entities.Atividade;
import com.sam.banco.entities.Boleto;
import com.sam.banco.entities.Cliente;
import com.sam.banco.repositories.AtividadeRepository;
import com.sam.banco.repositories.ClienteRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AtividadeService {

	
	private final AtividadeRepository atividadeRepository;
	private final ClienteRepository clienteRepository;
	
	public void registrarAtividade(String tipo, String valor, Boleto boleto) {
		
		UserDetails pagador = ClienteService.getUsuarioLogado();
		Optional<Cliente> pagadorOptional = clienteRepository.findByEmail(pagador.getUsername());
		
		var atividadePagador = new Atividade();
		atividadePagador.setTipo(tipo);
		atividadePagador.setValor("-"+valor);
		atividadePagador.setData(LocalDate.now(ZoneId.of("America/Sao_Paulo")));
		atividadePagador.setCliente(pagadorOptional.get());
		atividadePagador.setDescricao(boleto.getDescricao());
		atividadeRepository.save(atividadePagador);
		
		var atividadeRecebedor = new Atividade();
		atividadeRecebedor.setTipo(tipo);
		atividadeRecebedor.setValor("+"+valor);
		atividadeRecebedor.setData(LocalDate.now(ZoneId.of("America/Sao_Paulo")));
		atividadeRecebedor.setCliente(boleto.getCliente());
		atividadePagador.setDescricao(boleto.getDescricao());
		atividadeRepository.save(atividadeRecebedor);
		
		
	}
	
	public ResponseEntity<List<AtividadeResponseDto>> listarAtividadesById(String email) {
		List<Atividade> atividades = atividadeRepository.listarAtividades(email);
		List<AtividadeResponseDto> atividadesDto  = atividades.stream().map(x -> new AtividadeResponseDto(x)).collect(Collectors.toList());
		return ResponseEntity.status(HttpStatus.OK).body(atividadesDto);
	}
}
