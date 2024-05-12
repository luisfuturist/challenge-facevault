package com.luisfuturist.facevault.services;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.luisfuturist.facevault.entities.Person;
import com.luisfuturist.facevault.repositories.PersonRepository;
import com.luisfuturist.facevault.utils.CryptoUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository personRepo;

    public List<Person> getAllPersons() {
        return personRepo.findAll();
    }

    public Person getPersonById(Long id) {
        var optionalPerson = personRepo.findById(id);
        return optionalPerson.orElse(null);
    }

    public Person getPersonByCpf(String cpf) throws NoSuchAlgorithmException {
        var hashedCpf = CryptoUtils.hashCpf(cpf);

        return personRepo.findByHashedCpf(hashedCpf).orElse(null);
    }

    public Person savePerson(Person person) {
        return personRepo.save(person);
    }

    public Person updatePerson(Long id, Person person) throws NoSuchAlgorithmException {
        var existingPerson = personRepo.findById(id).orElse(null);

        if (existingPerson == null) {
            return null;
        }

        existingPerson.setName(person.getName());

        existingPerson.setHashedCpf(person.getHashedCpf());
        existingPerson.setMaskedCpf(person.getMaskedCpf());

        existingPerson.setPhotoUrl(person.getPhotoUrl());

        existingPerson.setCreatedAt(existingPerson.getCreatedAt());
        existingPerson.setUpdatedAt(LocalDateTime.now());

        var updatedPerson = personRepo.save(existingPerson);

        return updatedPerson;
    }

    public void deletePerson(Long id) {
        personRepo.deleteById(id);
    }

    public boolean existsByCpf(String cpf) throws NoSuchAlgorithmException {
        var hashedCpf = CryptoUtils.hashCpf(cpf);
        var person = personRepo.findByHashedCpf(hashedCpf).orElse(null);
        
        return person != null;
    }
}
