package ibf.project.backend;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.jsonwebtoken.io.IOException;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String csvFilePath = "en.openfoodfacts.org.products.csv"; // Path to your CSV file
		String textFilePath = "output.txt"; // Path to the output text file

		// Call the method to read CSV and write to text file
		readCsvAndWriteToTextFile(csvFilePath, textFilePath);
	}

	public static void readCsvAndWriteToTextFile(String csvFilePath, String textFilePath) throws java.io.IOException {
		BufferedReader csvReader = null;
		BufferedWriter textWriter = null;

		try {
			csvReader = new BufferedReader(new FileReader(csvFilePath));
			textWriter = new BufferedWriter(new FileWriter(textFilePath));

			String row;
			while ((row = csvReader.readLine()) != null) {
				// Writing each row from CSV to text file
				textWriter.write(row);
				textWriter.newLine(); // Add a new line to separate rows
			}

			System.out.println("CSV file has been successfully read and written to the text file.");

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (csvReader != null) {
					csvReader.close();
				}
				if (textWriter != null) {
					textWriter.close();
				}
			} catch (IOException ex) {
				ex.printStackTrace();
			}
		}

	}

}
