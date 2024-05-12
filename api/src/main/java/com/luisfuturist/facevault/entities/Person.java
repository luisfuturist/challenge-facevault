package com.luisfuturist.facevault.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Hashed CPF is mandatory")
    private String hashedCpf;
    @NotBlank(message = "Masked CPF is mandatory")
    private String maskedCpf;

    @NotNull(message = "Photo URL is required")
    private String photoUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
