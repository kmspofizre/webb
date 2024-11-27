<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.example.webb.PointCheck" %>
<%@ page import="com.example.webb.Point" %>
<html>
<head>
    <title>Результат</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 99vh;
        }
        .container {
            border: 1px solid black;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.82);
            text-align: center;
        }
        table{
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
<div class="container" id="container">
    <table id="tres">
    <% PointCheck pcr = (PointCheck) request.getSession().getAttribute("pointCheckResult");
        if (pcr == null || pcr.getResults().isEmpty()) {
    %>

        <tbody>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Result</th>
        </tr>
        </tbody>
    <% } else { %>
    <h1>Результат</h1>

        <tbody>
        <tr>
            
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Result</th>
        </tr>

        <% for (Point point : pcr.getResults()) { %>
        <tr>
            <td><%= point.getX() %></td>
            <td><%= point.getY() %></td>
            <td><%= point.getR() %></td>
            <td><%= point.getIsHit() ? "OK" : "MISS" %></td>
        </tr>
        <% } %>
        </tbody>

    <% } %>
    </table>
    <a href="index.jsp">Назад</a>
</div>
</body>
</html>