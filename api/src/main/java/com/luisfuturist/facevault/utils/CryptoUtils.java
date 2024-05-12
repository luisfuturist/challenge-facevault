package com.luisfuturist.facevault.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CryptoUtils {
    private static final String HASH_ALGORITHM = "SHA-256";

    public static String hashCpf(String cpf) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
        byte[] hashedBytes = digest.digest(cpf.getBytes());

        return bytesToHex(hashedBytes);
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public static String maskCpf(String cpf) {
        return "*********" + cpf.charAt(9) + cpf.charAt(10);
    }
}
