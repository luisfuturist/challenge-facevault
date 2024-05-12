package com.luisfuturist.facevault.controllers;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.luisfuturist.facevault.dtos.PersonDto;
import com.luisfuturist.facevault.dtos.PersonResDto;
import com.luisfuturist.facevault.entities.Person;
import com.luisfuturist.facevault.services.PersonService;
import com.luisfuturist.facevault.utils.CryptoUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/persons")
@Validated
@CrossOrigin(origins = "*")
public class PersonController {
    @Autowired
    private PersonService personService;

    @GetMapping
    @ResponseBody
    public List<PersonResDto> getPersons() {
        var persons = personService.getAllPersons();
        return persons.stream()
                .map(this::convertToPersonResDto).collect(Collectors.toList());
    }

    @GetMapping("/search/{cpf}")
    @ResponseBody
    public PersonResDto getPersonByCpf(@PathVariable String cpf) throws NoSuchAlgorithmException {
        var person = personService.getPersonByCpf(cpf);

        if (person == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return convertToPersonResDto(person);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public PersonResDto getPersonById(@PathVariable Long id) {
        var person = personService.getPersonById(id);

        if (person == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return convertToPersonResDto(person);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ResponseEntity<PersonResDto> createPerson(@Valid @RequestBody PersonDto personDto)
            throws NoSuchAlgorithmException {
        var person = convertToEntity(personDto);
        var createdPerson = personService.savePerson(person);

        return ResponseEntity.ok(convertToPersonResDto(createdPerson));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PersonResDto updatePerson(@PathVariable Long id, @Valid @RequestBody PersonDto personDto)
            throws NoSuchAlgorithmException {
        if (!Objects.equals(id, personDto.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "IDs don't match");
        }

        var person = convertToEntity(personDto);
        var updatedPerson = personService.updatePerson(id, person);

        if (updatedPerson == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return convertToPersonResDto(updatedPerson);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public void deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
    }

    private Person convertToEntity(PersonDto personDto) throws NoSuchAlgorithmException {
        var person = new Person();
        person.setId(personDto.getId());
        person.setName(personDto.getName());

        var hashedCpf = CryptoUtils.hashCpf(personDto.getCpf());
        person.setHashedCpf(hashedCpf);
        var maskedCpf = CryptoUtils.maskCpf(personDto.getCpf());
        person.setMaskedCpf(maskedCpf);

        person.setPhotoUrl(personDto.getPhotoUrl());

        person.setCreatedAt(LocalDateTime.now());
        person.setUpdatedAt(null);

        return person;
    }

    private PersonResDto convertToPersonResDto(Person person) {
        var updatedPersonDto = new PersonResDto();
        updatedPersonDto.setId(person.getId());
        updatedPersonDto.setName(person.getName());
        updatedPersonDto.setMaskedCpf(person.getMaskedCpf());
        updatedPersonDto.setPhotoUrl(person.getPhotoUrl());

        return updatedPersonDto;
    }
}
