package com.sam.banco.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sam.banco.entities.Roles;
import com.sam.banco.enums.RolesEnum;

public interface RoleRepository extends JpaRepository<Roles, UUID> {

	@Query("SELECT r from Roles r WHERE r.rolesEnum =:role")
	Roles findRole(@Param("role")RolesEnum role);

}
