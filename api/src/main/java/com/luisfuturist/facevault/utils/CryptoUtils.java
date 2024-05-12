package com.luisfuturist.facevault.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class CryptoUtils {
    private static final String HASH_ALGORITHM = "SHA-256";
    private static final int SALT_LENGTH = 16;

    public static String hashCpf(String cpf) throws NoSuchAlgorithmException {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[SALT_LENGTH];
        random.nextBytes(salt);

        byte[] cpfWithSalt = concatByteArrays(cpf.getBytes(), salt);

        MessageDigest digest = MessageDigest.getInstance(HASH_ALGORITHM);
        byte[] hashedBytes = digest.digest(cpfWithSalt);

        return bytesToHex(hashedBytes);
    }

    private static byte[] concatByteArrays(byte[] array1, byte[] array2) {
        byte[] result = new byte[array1.length + array2.length];
        System.arraycopy(array1, 0, result, 0, array1.length);
        System.arraycopy(array2, 0, result, array1.length, array2.length);
        return result;
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
