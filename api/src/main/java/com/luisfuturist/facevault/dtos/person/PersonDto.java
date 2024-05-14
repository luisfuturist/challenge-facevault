package com.luisfuturist.facevault.dtos.person;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonDto {

    @NotBlank(message = "Name is mandatory")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "CPF is mandatory")
    @Pattern(regexp = "\\d{11}", message = "Invalid CPF format. CPF must have 11 digits.")
    private String cpf;

    @NotNull(message = "Photo id is mandatory")
    private Long photoId;

}
