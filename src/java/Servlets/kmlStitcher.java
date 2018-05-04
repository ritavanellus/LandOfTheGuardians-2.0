/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Servlets;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author Rita
 */
@WebServlet(name = "kmlStitcher", urlPatterns = {"/kmlStitcher"})
public class kmlStitcher extends HttpServlet {

	/**
	 * Processes requests for both HTTP <code>GET</code> and <code>POST</code> methods.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	//creating the file name, which should be the date and time, stringified
	Date now = new Date();
	DateFormat df = new SimpleDateFormat("ddMMyyyyHHmmss");
	String nowF = df.format(now);

	protected void processRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException, ParseException {
		response.setContentType("text/kml;charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment;filename=\"" + nowF + ".kml\"");

		String path = request.getParameter("pathArray");
		String[] pathArray = path.split(",");
		StringBuilder endPoints = new StringBuilder("");
		StringBuilder coords = new StringBuilder("");
		String startP = "";
		String endP = "";

		JSONParser parser = new JSONParser();
		JSONObject bigObj = new JSONObject();
		JSONObject oneEdge = new JSONObject();
		JSONArray polyLineCoord = new JSONArray();
		JSONObject oneCoord = new JSONObject();

		/* Now absolute path is given for the json file, otherwise it is not found!
		The code below did not work...
		String relativeWebPath = "/jsons/testAll.json";
		String absolutePath = getServletContext().getRealPath(relativeWebPath);
		System.out.println("absolutePath: "+absolutePath);
		File target= new File (absolutePath);*/
		try {
			Object obj = parser.parse(new FileReader("C:\\Users\\Rita\\Documents\\NetBeansProjects\\LandOfTheGuardians\\web\\jsons\\Phase1.json"));

			bigObj = (JSONObject) obj;

			for (String edge : pathArray) {
				oneEdge = (JSONObject) bigObj.get(edge);
				polyLineCoord = (JSONArray) oneEdge.get("polyLine");
				for (Object cPair : polyLineCoord) {
					oneCoord = (JSONObject) cPair;
					double lng = (double) oneCoord.get("lng");
					double lat = (double) oneCoord.get("lat");
					coords.append(lng + "," + lat + ",0\n");
				}
			}

			String firstEdge = pathArray[0];
			oneEdge = (JSONObject) bigObj.get(firstEdge);
			startP = (String) oneEdge.get("startPoint");
			String lastEdge = pathArray[pathArray.length - 1];
			oneEdge = (JSONObject) bigObj.get(lastEdge);
			endP = (String) oneEdge.get("endPoint");

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		try (PrintWriter out = response.getWriter()) {

			out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
					+ "<kml xmlns=\"http://www.opengis.net/kml/2.2\">\n"
					+ "  <Document>");
			out.println("<Placemark>\n"
					+ "      <name>" + startP + " to " + endP + "</name>\n"
					+ "      <styleUrl>#line-1267FF-5000-nodesc</styleUrl>\n"
					+ "      <LineString>\n"
					+ "        <tessellate>1</tessellate>\n"
					+ "        <coordinates>");
			out.println(coords);
			out.println("        </coordinates>\n"
					+ "      </LineString>\n"
					+ "    </Placemark>\n"
					+ "  </Document>\n"
					+ "</kml>");

			/*out.println("<!DOCTYPE html>");
			out.println("<html>");
			out.println("<head>");
			out.println("<title>Servlet kmlStitcher</title>");
			out.println("</head>");
			out.println("<body>");
			out.println("<h1>Servlet kmlStitcher at " + request.getContextPath() + "</h1>");
			out.println("<h1>Coordinate series " + coords + "</h1>");
			out.println("</body>");
			out.println("</html>");*/
		}

	}

	// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
	/**
	 * Handles the HTTP <code>GET</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (ParseException ex) {
			Logger.getLogger(kmlStitcher.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	/**
	 * Handles the HTTP <code>POST</code> method.
	 *
	 * @param request servlet request
	 * @param response servlet response
	 * @throws ServletException if a servlet-specific error occurs
	 * @throws IOException if an I/O error occurs
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		try {
			processRequest(request, response);
		} catch (ParseException ex) {
			Logger.getLogger(kmlStitcher.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	/**
	 * Returns a short description of the servlet.
	 *
	 * @return a String containing servlet description
	 */
	@Override
	public String getServletInfo() {
		return "Short description";
	}// </editor-fold>

}
