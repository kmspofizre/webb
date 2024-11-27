package com.example.webb;


import java.io.*;
import java.util.Enumeration;
import java.util.LinkedList;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet("/area-check-servlet")
public class AreaCheckServlet extends HttpServlet {
    private String message;
    @Inject
    private PointCheck pointCheck;

    public void init() {
        message = "Area Check ";
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String s;
        int r;
        float x;
        float y;
        boolean hit;
        boolean click;
        try {

            r = Integer.parseInt(request.getParameter("r"));
            x = Float.parseFloat(request.getParameter("x"));
            y = Float.parseFloat(request.getParameter("y"));
            click = Boolean.parseBoolean(request.getParameter("click"));
//            if (!Check.checkValues(x, y, r)) {
//                response.sendError(HttpServletResponse.SC_BAD_REQUEST, String.format("400: %s", "Wrong data (watch constraints)"));
//            }
            hit = Check.checkCoordinates(x, y, r);

            Point point = new Point((int) Math.round(x), (int) Math.round(y), (int) Math.round(r), hit);
            System.out.println(point);
            pointCheck.addInput(point);
            request.getSession().setAttribute("pointCheckResult", pointCheck);
            if (!click){
                response.sendRedirect(request.getContextPath() + "/result.jsp");
            }
            else{
                response.setContentType("application/json");
                Response res = new Response(hit, x, y, r);
                ObjectMapper objectMapper1 = new ObjectMapper();
                LinkedList<Point> pres = ((PointCheck) request.getSession().getAttribute("pointCheckResult")).getResults();
                Point pt = pres.get(pres.toArray().length - 1);
                String jsonResponse = objectMapper1.writeValueAsString(pt);
                response.getWriter().write(jsonResponse);

            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, String.format("400: %s", "Not enough data or parameters are wrong"));
        }

        //response.sendRedirect(request.getContextPath() + "/result.jsp");
    }
}
