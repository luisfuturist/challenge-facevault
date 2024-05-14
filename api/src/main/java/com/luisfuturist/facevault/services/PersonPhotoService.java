package com.luisfuturist.facevault.services;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.luisfuturist.facevault.entities.PersonPhoto;
import com.luisfuturist.facevault.repositories.PersonPhotoRepository;
import com.luisfuturist.facevault.utils.ImageUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PersonPhotoService {
    private final PersonPhotoRepository photoRepo;

    public PersonPhoto getPersonPhotoById(Long id) {
        var photo = photoRepo.findById(id).orElse(null);
        return photo;
    }

    public PersonPhoto createPersonPhoto(MultipartFile file) throws IOException {
        var photo = new PersonPhoto();
        photo.setPerson(null);
        photo.setData(ImageUtils.compressImage(file.getBytes()));
        photo.setType(file.getContentType());
        
        var createdPhoto = photoRepo.save(photo);

        return createdPhoto;
    }

    public PersonPhoto updatePersonPhoto(Long id, MultipartFile file) throws IOException {
        var photo = getPersonPhotoById(id);

        if(photo == null) {
            return null;
        }

        photo.setData(ImageUtils.compressImage(file.getBytes()));
        photo.setType(file.getContentType());
        
        var updatedPhoto = photoRepo.save(photo);
        
        return updatedPhoto;
    }

    public void deletePersonPhoto(Long id) {
        photoRepo.deleteById(id);
    }
}
