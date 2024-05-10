package com.luisfuturist.facevault.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.luisfuturist.facevault.entities.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    
}
