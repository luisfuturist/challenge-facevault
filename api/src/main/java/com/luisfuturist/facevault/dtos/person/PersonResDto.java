package com.luisfuturist.facevault.dtos.person;

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
    private Long photoId;

}
