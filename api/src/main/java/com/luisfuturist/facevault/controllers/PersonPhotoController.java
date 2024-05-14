package com.luisfuturist.facevault.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.luisfuturist.facevault.dtos.person_photo.PersonPhotoResDto;
import com.luisfuturist.facevault.services.PersonPhotoService;
import com.luisfuturist.facevault.utils.ImageUtils;

@RestController
@RequestMapping("/person-photos")
@CrossOrigin(origins = "*")
public class PersonPhotoController {
    @Autowired
    private PersonPhotoService photoService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getPersonPhotoById(@PathVariable Long id) {
        var photo = photoService.getPersonPhotoById(id);

        if(photo == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        var photoData = ImageUtils.decompressImage(photo.getData());

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf(photo.getType()))
                .body(photoData);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public PersonPhotoResDto createPersonPhoto(@RequestParam("file") MultipartFile file)
            throws IOException {
        if(!ImageUtils.isContentTypeStatic(file.getContentType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ContentType");
        }

        var photo = photoService.createPersonPhoto(file);

        if (photo == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        var personCreateDto = new PersonPhotoResDto();
        personCreateDto.setId(photo.getId());

        return personCreateDto;
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public PersonPhotoResDto updatePersonPhoto(@PathVariable Long id, @RequestParam("file") MultipartFile file)
            throws IOException {
        if(!ImageUtils.isContentTypeStatic(file.getContentType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid ContentType");
        }

        var photo = photoService.updatePersonPhoto(id, file);

        if (photo == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        var personUpdateDto = new PersonPhotoResDto();
        personUpdateDto.setId(id);

        return personUpdateDto;
    }

    @DeleteMapping("/{id}")
    @ResponseBody
    public void deletePersonPhoto(@PathVariable Long id) {
        var photo = photoService.getPersonPhotoById(id);

        if(photo == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        if(photo.getPerson() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        photoService.deletePersonPhoto(id);
    }
}
