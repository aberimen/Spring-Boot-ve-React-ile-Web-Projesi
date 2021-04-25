package com.aberimen.sosyalmedya.post;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.aberimen.sosyalmedya.user.User;

@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
	
	Page<Post> findByUser(User user, Pageable page);
	
}
