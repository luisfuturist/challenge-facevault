package com.luisfuturist.facevault.dtos;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonUpdateDto {

    private Long id;

    @NotBlank(message = "Name is mandatory")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotNull(message = "Photo URL is mandatory")
    @NotBlank(message = "Photo URL is mandatory")
    @URL(message = "Invalid URL format for photo URL")
    private String photoUrl;

}
