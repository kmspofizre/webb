package com.example.webb;


public class Point {
    private boolean isHit;
    private int x;
    private int y;
    private int r;

    public Point(int x, int y, int r, boolean isHit) {
        setX(x);
        setY(y);
        setR(r);
        setIsHit(isHit);
    }

    public void setX(int x) {
        this.x = Math.round(x);
    }

    public void setY(int y) {
        this.y = Math.round(y);
    }

    public void setR(int r) {
        this.r = Math.round(r);
    }

    public void setIsHit(boolean isHit) {
        this.isHit = isHit;
    }



    public int getX() {
        return this.x;
    }

    public int getY() {
        return this.y;
    }

    public double getR() {
        return this.r;
    }

    public boolean getIsHit() {
        return this.isHit;
    }

    public String toString() {
        return this.x + ", " + this.y + ", " + this.r;
    }
}
