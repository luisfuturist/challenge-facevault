package com.luisfuturist.facevault;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class Application {

    public static Dotenv env;

    static {
        env = Dotenv.configure().directory("../").ignoreIfMissing().load();
    }

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
