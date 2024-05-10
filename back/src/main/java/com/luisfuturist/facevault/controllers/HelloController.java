package com.luisfuturist.facevault.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins="*")
public class HelloController {
    
    @GetMapping("/")
    public JsonNode hello() {
        var mapper = new ObjectMapper();
        var node = mapper.createObjectNode()
            .put("message", "Hello World");

        return node;
    }
}
