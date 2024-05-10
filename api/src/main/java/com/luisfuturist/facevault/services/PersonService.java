package com.luisfuturist.facevault.services;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;

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

    public Person savePerson(Person person) throws NoSuchAlgorithmException {
        var hashedCPF = CryptoUtils.hashCPF(person.getCpf());
        person.setCpf(hashedCPF);

        person.setCreatedAt(LocalDateTime.now());
        person.setUpdatedAt(LocalDateTime.now());
        return personRepo.save(person);
    }

    public Person getPersonById(Long id) {
        var optionalPerson = personRepo.findById(id);
        return optionalPerson.orElse(null);
    }

    public Person updatePerson(Long id, Person updatedPerson) throws NoSuchAlgorithmException {
        var existingPerson = personRepo.findById(id).orElse(null);

        if (existingPerson != null) {
            existingPerson.setCreatedAt(existingPerson.getCreatedAt());
            existingPerson.setUpdatedAt(LocalDateTime.now());

            existingPerson.setName(updatedPerson.getName());
            
            var hashedCPF = CryptoUtils.hashCPF(updatedPerson.getCpf());
            existingPerson.setCpf(hashedCPF);
            existingPerson.setPhoto(updatedPerson.getPhoto());
            
            return personRepo.save(existingPerson);
        }

        return null;
    }

    public void deletePerson(Long id) {
        personRepo.deleteById(id);
    }
}
