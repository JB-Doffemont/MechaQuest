package jdbc.types;

// import de la classe Connection pour intéragir avec la base de données
import java.sql.Connection;
// Permet de se connecter à la BDD
import java.sql.DriverManager;
// Permet de préparer les requêtes SQL
import java.sql.PreparedStatement;
// Permet de récuperer les données
import java.sql.ResultSet;
// Sert à la gestion des exceptions
import java.sql.SQLException;
// Permet d'executer des requêtes SQl
import java.sql.Statement;
// Permet de lire les entrées utilisateur.
import java.util.Scanner;

public class TypesDatabase {
	
	// Initialisation de la variable connection à null
	private static Connection connection = null;
	// Variable scanner pour lire les entrées utilisateur
	private static Scanner scanner = new Scanner(System.in);
	

	public static void main(String[] args	) {

		TypesDatabase typesDatabase = new TypesDatabase();
		// Chargement du driver jdbc pour intéragir avec bdd MySQL
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			
			// Variables pour définir les informations de connexion
			String dbURL = "jdbc:mysql://localhost:3306/mechaquest";
			String username = "root";
			String password=  "******";
			
			// DriverManager.getConnection() est utilisée pour établir une connexion
			connection = DriverManager.getConnection(dbURL, username, password);
			
			// Choix de l'utilisateur 
			System.out.println("Entrez un choix");
			System.out.println("1. Insérer une entrée");
			System.out.println("2. Sélectionner une entrée");
			System.out.println("3. Modifier une entrée");
			System.out.println("4. Supprimer une entrée");
			int choice = Integer.parseInt(scanner.nextLine());
			
			// Appel des différentes méthodes en fonction du choix de l'utilisateur
			switch (choice) {
			case 1:
				typesDatabase.insertRecord();
				break;
			case 2:
				typesDatabase.selectRecord();
				break;
			case 3:
				typesDatabase.updateRecord();
				break;
			case 4:
				typesDatabase.deleteRecord();
				break;
			default:
				break;
			}
		// Gestion des exceptions et affichage du message d'erreur
		} catch (Exception e) {
			throw new RuntimeException("Une erreur est survenue !");
		}
	}
	
	private void insertRecord() throws SQLException {
		
		// Requête Sql pour insérer une nouvelle entrée
		String sql = "insert into types(type_name, base_hp, base_atk, base_def, special) values (?, ?, ?, ?, ?)";
		
		// Préparation de la requête 
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		System.out.println("Entrez le nom du type :");
		// On définit la valeur des paramètres de la requête en fonction de l'entrée de l'utilisateur
		preparedStatement.setString(1, scanner.nextLine());
		
		System.out.println("Entrez la vie de base :");
		preparedStatement.setInt(2, Integer.parseInt(scanner.nextLine()));
		
		System.out.println("Entrez l'attaque de base :");
		preparedStatement.setInt(3, Integer.parseInt(scanner.nextLine()));
		
		System.out.println("Entrez la défense de base :");
		preparedStatement.setInt(4, Integer.parseInt(scanner.nextLine()));
		
		System.out.println("Entrez l'attaque spéciale :");
		preparedStatement.setString(5, scanner.nextLine());
		
		// On execute la requête et stocke dans la variable roxs le nombre de lignes affectées
		int rows = preparedStatement.executeUpdate();
		
		// Affichage du message de succès
		if (rows > 0) {
			System.out.println("Record inserted successfully.");
		}
	}
	
	public void selectRecord() throws SQLException {
		// On demande à l'utilisateur quel type il souhaite afficher
		System.out.println("Entrez le nom du type :");
		String name = scanner.nextLine();

		// Requête sql pour selectionner un type.
		String sql = "select * from types where type_name = '"+name+"'";
		
		// On crée un objet de type Statement qui permet d'exécuter des requêtes SQL
		Statement statement = connection.createStatement();
		
		// On stocke le resultat de la requête
		ResultSet result = statement.executeQuery(sql);
		
		// Si il y a bien un enregistrement nous l'affichons.
		if (result.next()) {
			String typeName = result.getString("type_name");
			int baseHp = result.getInt("base_hp");
			int baseAtk = result.getInt("base_atk");
			int baseDef = result.getInt("base_def");
			String special = result.getString("special");
			
			System.out.println("Le nom du type est : "+typeName);
			System.out.println("La vie de base est : "+baseHp);
			System.out.println("L'attaque de base est : "+baseAtk);
			System.out.println("La défense de base est : "+baseDef);
			System.out.println("Le spécial est : "+special);	
		// Si pas d'enregistrement nous informons l'utilisateur
		} else {
			System.out.println("Pas d'enregistrement trouvé !");
		}
	}
	private void updateRecord() throws SQLException {
		System.out.println("Tapez le nom du type que vous souhaitez modifier :");
		String name = scanner.nextLine();

		String sql = "select * from types where type_name = '"+name+"'";

		Statement statement = connection.createStatement();

		ResultSet result = statement.executeQuery(sql);
		
		if (result.next()) {
			String typeName = result.getString("type_name");
			int baseHp = result.getInt("base_hp");
			int baseAtk = result.getInt("base_atk");
			int baseDef = result.getInt("base_def");
			String special = result.getString("special");
			
			System.out.println("Le nom du type est : "+typeName);
			System.out.println("La vie de base est : "+baseHp);
			System.out.println("L'attaque de base est : "+baseAtk);
			System.out.println("La défense de base est : "+baseDef);
			System.out.println("Le spécial est : "+special);
			
			// On demande à l'utilisateur ce qu'il souhaite modifier
			System.out.println("Que souhaitez vous modifier ?");
			System.out.println("1. BaseHP");
			System.out.println("2. BaseAtk");
			System.out.println("3. BaseDef");
			System.out.println("4. Spéciale");
			
			// Lecture du choix de l'utilisateur
			int choice = Integer.parseInt(scanner.nextLine());
			
			// Création de la requête SQL pour la mise à jour des données du type choisi
			String sqlQuery = "update types set ";
			switch (choice) {
			// Cas de la mise à jour de la vie de base
			case 1:
				  // Si l'utilisateur a choisi de modifier la BaseHP, demander la nouvelle valeur et exécuter la requête SQL correspondante
				System.out.println("Entrez nouvelle valeur");
				int newBaseHp = Integer.parseInt(scanner.nextLine());
				sqlQuery = sqlQuery + "base_hp = ? where type_name = '"+typeName+"'";
				PreparedStatement preparedStatement = connection.prepareStatement(sqlQuery);
				preparedStatement.setInt(1, newBaseHp);
				
				// Exécution de la requête SQL pour mettre à jour la vie de base du type
				int rows = preparedStatement.executeUpdate();
				if (rows > 0) {
					System.out.println("La vie de base a été modifiée !");
				}
				break;
			case 2:
				System.out.println("Entrez nouvelle valeur");
				int newBaseAtk = Integer.parseInt(scanner.nextLine());
				sqlQuery = sqlQuery + "base_atk = ? where type_name = '"+typeName+"'";
				PreparedStatement preparedStatement1 = connection.prepareStatement(sqlQuery);
				preparedStatement1.setInt(1, newBaseAtk);
				
				int rows1 = preparedStatement1.executeUpdate();
				if (rows1 > 0) {
					System.out.println("L'attaque de base a été modifiée !");
				}
				break;
			case 3:
				System.out.println("Entrez nouvelle valeur");
				int newBaseDef = Integer.parseInt(scanner.nextLine());
				sqlQuery = sqlQuery + "base_def = ? where type_name = '"+typeName+"'";
				PreparedStatement preparedStatement2 = connection.prepareStatement(sqlQuery);
				preparedStatement2.setInt(1, newBaseDef);
				
				int rows2 = preparedStatement2.executeUpdate();
				if (rows2 > 0) {
					System.out.println("La défense de base a été modifiée !");
				}
				break;
			case 4:
				System.out.println("Entrez nouvelle attaque spéciale");
				String newSpecial = scanner.nextLine();
				sqlQuery = sqlQuery + "special = ? where type_name = '"+typeName+"'";
				PreparedStatement preparedStatement3 = connection.prepareStatement(sqlQuery);
				preparedStatement3.setString(1, newSpecial);
				
				int rows3 = preparedStatement3.executeUpdate();
				if (rows3 > 0) {
					System.out.println("L'attaque spéciale a été modifiée !");
				}
				break;
			}
			
		} else {
			System.out.println("Pas d'enregistrement trouvé !");
		}
	}
	
	public void deleteRecord() throws SQLException {
		
		// Demande le nom du type à supprimer à l'utilisateur
		System.out.println("Entrez le nom du type a supprimer :");
		String name = scanner.nextLine();
		
		// Crée la requête SQL pour supprimer l'enregistrement avec le nom de type donné
		String sql = "delete from types where type_name = '"+name+"'";
		
		// Crée un objet Statement pour exécuter la requête SQL
		Statement statement = connection.createStatement();
		
		// Exécute la requête SQL et renvoie le nombre de lignes affectées
		int rows = statement.executeUpdate(sql);
		
		// Si au moins une ligne a été supprimée, affiche un message de confirmation
		if (rows > 0) {
			System.out.println("Le type a bien été supprimé !");
		}
	}
}

