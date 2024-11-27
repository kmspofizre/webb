package com.example.webb;

import java.io.*;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet("/controller-servlet")
public class ControllerServlet extends HttpServlet {
    private String message;

    public void init() {
        message = "Controller Servlet ";
    }
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("/area-check-servlet").forward(request, response);
    }
    public void destroy() {
    }
}