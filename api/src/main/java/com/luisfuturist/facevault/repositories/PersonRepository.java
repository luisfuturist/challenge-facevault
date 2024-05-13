package com.luisfuturist.facevault.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.luisfuturist.facevault.entities.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByHashedCpf(String hashedCpf);
    List<Person> findByNameContainingIgnoreCase(String name);
}
