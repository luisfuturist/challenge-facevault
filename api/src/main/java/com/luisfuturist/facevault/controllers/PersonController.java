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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.luisfuturist.facevault.dtos.PersonDto;
import com.luisfuturist.facevault.dtos.PersonResDto;
import com.luisfuturist.facevault.dtos.PersonUpdateDto;
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
                .map(this::convertEntityToPersonResDto).collect(Collectors.toList());
    }

    @GetMapping("/search-by-cpf/{cpf}")
    @ResponseBody
    public PersonResDto searchPersonByCpf(@PathVariable String cpf) throws NoSuchAlgorithmException {
        var person = personService.searchPersonByCpf(cpf);

        if (person == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return convertEntityToPersonResDto(person);
    }

    @GetMapping("/search-by-name/{name}")
    @ResponseBody
    public List<PersonResDto> searchPersonsByName(@PathVariable String name) {
        var persons = personService.searchPersonByName(name);

        return persons.stream()
                .map(this::convertEntityToPersonResDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public PersonResDto getPersonById(@PathVariable Long id) {
        var person = personService.getPersonById(id);

        if (person == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return convertEntityToPersonResDto(person);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public ResponseEntity<PersonResDto> createPerson(@Valid @RequestBody PersonDto personDto)
            throws NoSuchAlgorithmException {
        if (personService.existsByCpf(personDto.getCpf())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "CPF already used");
        }

        var person = convertDtoToEntity(personDto);

        var createdPerson = personService.savePerson(person);

        return ResponseEntity.ok(convertEntityToPersonResDto(createdPerson));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PersonResDto updatePerson(@PathVariable Long id, @Valid @RequestBody PersonUpdateDto personDto)
            throws NoSuchAlgorithmException {
        if (!Objects.equals(id, personDto.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "IDs don't match");
        }

        var existingPerson = personService.getPersonById(id);

        if(existingPerson == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Person not found");
        }

        var person = convertUpdateDtoToEntity(personDto);
        person.setCreatedAt(existingPerson.getCreatedAt());
        person.setHashedCpf(existingPerson.getHashedCpf());
        person.setMaskedCpf(existingPerson.getMaskedCpf());

        var updatedPerson = personService.updatePerson(id, person);

        if (updatedPerson == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return convertEntityToPersonResDto(updatedPerson);
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public void deletePerson(@PathVariable Long id) {
        personService.deletePerson(id);
    }

    private Person convertDtoToEntity(PersonDto personDto) throws NoSuchAlgorithmException {
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

    private Person convertUpdateDtoToEntity(PersonUpdateDto personDto) {
        var person = new Person();
        person.setId(personDto.getId());
        person.setName(personDto.getName());

        person.setPhotoUrl(personDto.getPhotoUrl());

        person.setUpdatedAt(LocalDateTime.now());

        return person;
    }

    private PersonResDto convertEntityToPersonResDto(Person person) {
        var updatedPersonDto = new PersonResDto();
        updatedPersonDto.setId(person.getId());
        updatedPersonDto.setName(person.getName());
        updatedPersonDto.setMaskedCpf(person.getMaskedCpf());
        updatedPersonDto.setPhotoUrl(person.getPhotoUrl());

        return updatedPersonDto;
    }

    @GetMapping("/exists-by-cpf")
    @ResponseBody
    public boolean existsByCpf(@RequestParam String cpf) throws NoSuchAlgorithmException {
        return personService.existsByCpf(cpf);
    }
}
