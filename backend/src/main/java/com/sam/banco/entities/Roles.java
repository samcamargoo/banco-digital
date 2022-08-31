package com.sam.banco.entities;

import java.io.Serializable;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;

import com.sam.banco.enums.RolesEnum;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_roles")
public class Roles implements GrantedAuthority, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue (strategy = GenerationType.AUTO)
	private UUID id;
	
	@Enumerated(EnumType.STRING)
	private RolesEnum rolesEnum;

	@Override
	public String getAuthority() {
		return this.rolesEnum.toString();
	}
}
