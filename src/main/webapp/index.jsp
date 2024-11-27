<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="com.example.webb.PointCheck" %>
<%@ page import="com.example.webb.Point" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:h="http://java.sun.com/jsf/html"
      xmlns:f="http://java.sun.com/jsf/core"
      xmlns:p="http://primefaces.org/ui">

<h:head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="styles.css">
    <script type="text/javascript" src="http://code.jquery.com/jquery-latest.js"></script>
    <script type="text/javascript" src="script.js"></script>
    <title>Лаба 3</title>
</h:head>
<h:body>
<h:div class="main">
    <h:header class="header">
        <h:div class="container">
            <h:div class="navigation">
                Кирилл Игнатов P3219; 414211
            </h:div>
            <h:span id="span" style="color: white;"></h:span>
        </h:div>
    </h:header>
    <h:div class="content">
        <h:div class="container">
            <h:div class="blocks">
                <h:div class="param-form">
                    <h:style>
                        .hidden {
                            display: none;
                        }
                    </h:style>
                    <h:form action="" method="post" class="pform" id="pform">
                        <h:div class="pformins">
                            <h:label for="x">Choose X value</h:label><br>
                            <h:div>
                                <h:label><h:input type="checkbox" name="x" id="x" value="-4"/>-4</h:label>
                                <h:label><h:input type="checkbox" name="x" id="x" value="-3"/>-3</h:label>
                                <h:label><h:input type="checkbox" name="x" id="x" value="-2"/>-2</h:label>
                                <h:label><h:input type="checkbox" name="x" id="x" value="-1"/>-1</h:label>
                                <h:label><h:input type="checkbox" name="x" id="x" value="0"/>0</h:label>
                                <h:label><h:input type="checkbox" name="x" id="x" value="1"/>1</h:label>
                                <h:label><h:input type="checkbox" name="x" id="x" value="2"/>2</h:label>
                                <h:label><h:input type="checkbox" name="x" id="x" value="3"/>3</h:label>
                                <h:label><h:input type="checkbox" name="x" id="x" value="4"/>4</h:label>
                            </h:div>
                        </h:div>
                        <h:div class="pformins">
                            <h:label for="y">Enter Y value </h:label><br>
                            <h:input type="text" name="y" id="y" required/>
                        </h:div>
                        <h:div class="pformins">
                            <h:label for="r">Choose R parameter </h:label><br>
                            <h:div>
                                <h:label><h:input type="checkbox" name="r" id="r" value="1"/>1</h:label>
                                <h:label><h:input type="checkbox" name="r" id="r" value="2"/>2</h:label>
                                <h:label><h:input type="checkbox" name="r" id="r" value="3"/>3</h:label>
                                <h:label><h:input type="checkbox" name="r" id="r" value="4"/>4</h:label>
                                <h:label><h:input type="checkbox" name="r" id="r" value="5"/>5</h:label>
                            </h:div>
                        </h:div>
                        <h:div class="pformins">
                            <h:input type="submit" value="Go!"/>
                            <h:div id="loader" class="hidden"></h:div>
                        </h:div>
                        <p:slider minValue="0" maxValue="5" for="blah"/>
                    </h:form>
                </h:div>
                <h:div class="result">

                    <h:canvas id="canvas" class="canv">

                    </h:canvas>
                </h:div>
                <h:div class="for_table" id="container">
                    <table id="tres">
                        <caption>Результаты</caption>
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
                        <tbody>
                        <tr>

                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Result</th>
                        </tr>
                        <% for (Point point : pcr.getResults()) { %>
                        <tr>
                            <td><%= point.getX() %>
                            </td>
                            <td><%= point.getY() %>
                            </td>
                            <td><%= point.getR() %>
                            </td>
                            <td><%= point.getIsHit() ? "OK" : "MISS" %>
                            </td>
                        </tr>
                        <% } %>
                        </tbody>
                    <% } %>
                    </table>
                </h:div>
            </h:div>
        </h:div>
    </h:div>
</h:div>
<script>window.root = `${pageContext.request.contextPath}`</script>

</h:body>
</html>