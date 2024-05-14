package com.luisfuturist.facevault.utils;

import java.io.ByteArrayOutputStream;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

public class ImageUtils {

    public static String CONTENT_TYPE_IMAGE_STATIC = "^image/(jpeg|png)$";

    public static byte[] compressImage(byte[] data) {
        var deflater = new Deflater();
        deflater.setLevel(Deflater.BEST_COMPRESSION);
        deflater.setInput(data);
        deflater.finish();

        var outputStream = new ByteArrayOutputStream(data.length);
        byte[] tmp = new byte[4 * 1024];

        while (!deflater.finished()) {
            int size = deflater.deflate(tmp);
            outputStream.write(tmp, 0, size);
        }

        try {
            outputStream.close();
        } catch (Exception ignored) {
        }

        return outputStream.toByteArray();
    }

    public static byte[] decompressImage(byte[] data) {
        var inflater = new Inflater();
        inflater.setInput(data);
        var outputStream = new ByteArrayOutputStream(data.length);
        var tmp = new byte[4 * 1024];

        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(tmp);
                outputStream.write(tmp, 0, count);
            }
            outputStream.close();
        } catch (Exception ignored) {
        }

        return outputStream.toByteArray();
    }

    public static boolean isContentTypeStatic(String contentType) {
        Pattern pattern = Pattern.compile(CONTENT_TYPE_IMAGE_STATIC);
        Matcher matcher = pattern.matcher(contentType);
        return matcher.matches();
    }
}
