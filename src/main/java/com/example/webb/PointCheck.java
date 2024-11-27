package com.example.webb;


import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;
import java.util.LinkedList;

@Stateful
@SessionScoped
@Named("pointCheckResult")
public class PointCheck implements Serializable {
    private LinkedList<Point> resultList = new LinkedList<>();

    public void addInput(Point inp) {
        this.resultList.add(inp);
    }

    public LinkedList<Point> getResults() {
        return this.resultList;
    }
}