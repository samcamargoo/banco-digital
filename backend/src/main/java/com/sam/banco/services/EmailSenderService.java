package com.sam.banco.services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.sam.banco.model.EmailBoletoGerado;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class EmailSenderService {

	@Autowired
	private JavaMailSender javaMailSender;;

	@Async
	public void sendEmail(EmailBoletoGerado boleto) {

		MimeMessage mailMessage = javaMailSender.createMimeMessage();
		try {
			mailMessage.setSubject("Boleto de Cobrança", "UTF-8");
			MimeMessageHelper helper = new MimeMessageHelper(mailMessage, true, "UTF-8");
			helper.setFrom("mockbancodigital@gmail.com");
			helper.setTo(boleto.getEmail());
			helper.setText(buildBoletoEmail(boleto), true);

			javaMailSender.send(mailMessage);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	private String buildBoletoEmail(EmailBoletoGerado boleto) {
		return "<p>Você recebeu uma cobrança no valor de " + boleto.getValor() + " referente ao produto/serviço "+ boleto.getDescricao()+ "</p>";
	}
}
