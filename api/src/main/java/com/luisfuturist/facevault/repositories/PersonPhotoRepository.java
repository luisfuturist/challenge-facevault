package com.luisfuturist.facevault.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.luisfuturist.facevault.entities.PersonPhoto;

@Repository
public interface PersonPhotoRepository extends JpaRepository<PersonPhoto, Long> {

}
