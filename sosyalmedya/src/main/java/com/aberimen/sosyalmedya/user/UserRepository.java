package com.aberimen.sosyalmedya.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Long>{
	
	User findByUsername(String username);

	Page<User> findByUsernameNot(String username , Pageable pageable);

	@Transactional // transaction başlatmak için
	void deleteByUsername(String username);
	

}
