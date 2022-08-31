package com.sam.banco.model;

import javax.validation.constraints.NotBlank;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginForm {

	@NotBlank
	private String email;
	@NotBlank
	private String password;
	
	  public UsernamePasswordAuthenticationToken converter() {
	        return new UsernamePasswordAuthenticationToken(this.email, this.password);
	    }
}
