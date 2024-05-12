package com.luisfuturist.facevault.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonResDto {

    private Long id;
    private String name;
    private String maskedCpf;
    private String photoUrl;

}
