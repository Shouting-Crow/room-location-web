package com.project.roomlocationweb.repository;

import com.project.roomlocationweb.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
