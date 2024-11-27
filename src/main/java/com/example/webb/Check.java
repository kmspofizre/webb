package com.example.webb;

public class Check {
    public static boolean checkCoordinates(float x, float y, int r){
        return checkCircle(x, y, r) || checkRect(x, y, r) || checkTriangle(x, y, r);
    }

    public static boolean checkTriangle(float x, float y, int r){
        return (x <= 0) && (y >= 0) && (x >= (-r / 2)) && (y <= r) && (((2 * Math.abs(x) + Math.abs(y))) <= r);
    }

    public static boolean checkRect(float x, float y, int r){
        return (x >= 0) && (y >= 0) && (x <= r) && (y <= r);
    }

    public static boolean checkCircle(float x, float y, int r){
        return (x >= 0) && (y <= 0) && (Math.sqrt(x * x + y * y) <= r);
    }

    public static boolean checkValues(float x, float y, int r){
        return (-4 <= x) && (x <= 4) && (-3 <= y) && (y <= 3) && (1 <= r) && (r <= 5);
    }
}
