-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              10.4.32-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database futdraft
CREATE DATABASE IF NOT EXISTS `futdraft` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `futdraft`;

-- Dump della struttura di tabella futdraft.players
CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `age` int(5) NOT NULL,
  `height` float NOT NULL,
  `weight` float NOT NULL,
  `role` int(11) NOT NULL,
  `price` bigint(20) NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `average_clean_sheet` float DEFAULT NULL,
  `average_save` float DEFAULT NULL,
  `average_goals_conceded` float DEFAULT NULL,
  `average_contrasts_won` float DEFAULT NULL,
  `average_advances` float DEFAULT NULL,
  `avarage_yellow_season` float DEFAULT NULL,
  `average_passing_accuracy` float DEFAULT NULL,
  `average_balls_recovered` float DEFAULT NULL,
  `average_assist` float DEFAULT NULL,
  `career_goal` float DEFAULT NULL,
  `average_goal` float DEFAULT NULL,
  `average_dribbling` float DEFAULT NULL,
  `average_shots_on_goal` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_players_roles` (`role`),
  CONSTRAINT `FK_players_roles` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella futdraft.players: ~30 rows (circa)
INSERT INTO `players` (`id`, `lastname`, `firstname`, `age`, `height`, `weight`, `role`, `price`, `photo_url`, `average_clean_sheet`, `average_save`, `average_goals_conceded`, `average_contrasts_won`, `average_advances`, `avarage_yellow_season`, `average_passing_accuracy`, `average_balls_recovered`, `average_assist`, `career_goal`, `average_goal`, `average_dribbling`, `average_shots_on_goal`) VALUES
	(1, 'Donnarumma', 'Gianluigi', 25, 1.96, 90, 1, 85000000, NULL, 0.4, 4.5, 1.2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(2, 'Chiellini', 'Giorgio', 39, 1.87, 85, 2, 2500000, NULL, NULL, NULL, NULL, 2.5, 0.8, 0.3, 0.85, 6.3, 0.1, 35, 0.05, NULL, NULL),
	(3, 'Verratti', 'Marco', 31, 1.65, 60, 3, 40000000, NULL, NULL, NULL, NULL, 1.2, 1, 0.5, 0.9, 5.1, 1.2, 10, 0.1, 1.5, 0.6),
	(4, 'Immobile', 'Ciro', 34, 1.85, 78, 4, 45000000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.75, NULL, 0.3, 230, 0.7, 0.9, 2.2),
	(5, 'Buffon', 'Gianluigi', 46, 1.92, 91, 1, 500000, NULL, 0.35, 4, 1.1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(6, 'Bonucci', 'Leonardo', 36, 1.9, 82, 2, 2000000, NULL, NULL, NULL, NULL, 2, 0.7, 0.4, 0.88, 5.5, 0.2, 30, 0.03, NULL, NULL),
	(7, 'Jorginho', 'Frello', 32, 1.8, 70, 3, 35000000, NULL, NULL, NULL, NULL, 1.1, 0.9, 0.2, 0.93, 4.7, 1, 15, 0.08, 1.3, 0.7),
	(8, 'Ronaldo', 'Cristiano', 39, 1.87, 83, 4, 150000000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.78, NULL, 0.4, 800, 0.9, 1.7, 3.5),
	(9, 'De Gea', 'David', 33, 1.92, 76, 1, 30000000, NULL, 0.36, 4.3, 1.3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(10, 'Ramos', 'Sergio', 38, 1.84, 81, 2, 5000000, NULL, NULL, NULL, NULL, 2.8, 0.6, 0.4, 0.87, 6, 0.3, 100, 0.2, NULL, NULL),
	(11, 'Modric', 'Luka', 38, 1.72, 66, 3, 10000000, NULL, NULL, NULL, NULL, 1, 0.8, 0.3, 0.95, 5.9, 1.5, 50, 0.1, 1.7, 0.8),
	(12, 'Lewandowski', 'Robert', 35, 1.85, 79, 4, 70000000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.73, NULL, 0.5, 500, 0.85, 1.8, 3),
	(13, 'Courtois', 'Thibaut', 32, 1.99, 96, 1, 65000000, NULL, 0.4, 4.6, 1.1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(14, 'Pique', 'Gerard', 37, 1.94, 85, 2, 8000000, NULL, NULL, NULL, NULL, 2.4, 0.9, 0.5, 0.9, 6.8, 0.2, 50, 0.07, NULL, NULL),
	(15, 'Kante', 'N\'Golo', 32, 1.68, 68, 3, 60000000, NULL, NULL, NULL, NULL, 1.3, 1.1, 0.2, 0.92, 7, 0.8, 15, 0.04, 1.6, 0.9),
	(16, 'Messi', 'Lionel', 36, 1.7, 72, 4, 130000000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.77, NULL, 0.6, 700, 0.85, 2, 3.2),
	(17, 'Neuer', 'Manuel', 38, 1.93, 92, 1, 2000000, NULL, 0.34, 4.1, 1.4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(18, 'Godin', 'Diego', 38, 1.85, 81, 2, 1500000, NULL, NULL, NULL, NULL, 2.3, 0.7, 0.4, 0.85, 5.3, 0.3, 30, 0.05, NULL, NULL),
	(19, 'Kroos', 'Toni', 34, 1.83, 78, 3, 25000000, NULL, NULL, NULL, NULL, 1.1, 0.9, 0.3, 0.93, 4.8, 1, 25, 0.06, 1.5, 0.7),
	(20, 'Benzema', 'Karim', 36, 1.85, 81, 4, 50000000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.72, NULL, 0.5, 350, 0.75, 1.8, 2.5),
	(21, 'Oblak', 'Jan', 31, 1.88, 87, 1, 70000000, NULL, 0.42, 4.7, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(22, 'Hummels', 'Mats', 35, 1.91, 87, 2, 4000000, NULL, NULL, NULL, NULL, 2.1, 0.8, 0.4, 0.88, 6.5, 0.3, 30, 0.05, NULL, NULL),
	(23, 'Fabinho', '', 30, 1.88, 79, 3, 35000000, NULL, NULL, NULL, NULL, 1, 0.9, 0.2, 0.91, 5.4, 1, 15, 0.05, 1.4, 0.8),
	(24, 'Salah', 'Mohamed', 31, 1.75, 71, 4, 90000000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.74, NULL, 0.6, 250, 0.8, 1.9, 2.7),
	(25, 'Lloris', 'Hugo', 37, 1.88, 78, 1, 2000000, NULL, 0.38, 4.2, 1.2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(26, 'Alaba', 'David', 32, 1.8, 75, 2, 30000000, 'https://i.ibb.co/tQBFm79/p50188-t186-2023-1-001-000.png', NULL, NULL, NULL, 2, 0.7, 0.3, 0.9, 5, 0.4, 20, 0.1, NULL, NULL),
	(27, 'Busquets', 'Sergio', 35, 1.89, 76, 3, 20000000, NULL, NULL, NULL, NULL, 1.2, 0.8, 0.3, 0.93, 5.7, 1.2, 15, 0.04, 1.5, 0.6),
	(28, 'Mbappe', 'Kylian', 25, 1.78, 73, 4, 200000000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0.79, NULL, 0.5, 150, 0.9, 2.3, 3.8),
	(29, 'Ter Stegen', 'Marc-André', 32, 1.87, 85, 1, 60000000, NULL, 0.37, 4.5, 1.2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(30, 'Van Dijk', 'Virgil', 32, 1.93, 92, 2, 50000000, NULL, NULL, NULL, NULL, 2.4, 0.9, 0.4, 0.91, 6.7, 0.3, 30, 0.05, NULL, NULL);

-- Dump della struttura di tabella futdraft.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella futdraft.roles: ~4 rows (circa)
INSERT INTO `roles` (`id`, `name`) VALUES
	(1, 'Portiere'),
	(2, 'Difensore'),
	(3, 'Centrocampista'),
	(4, 'Attaccante');

-- Dump della struttura di tabella futdraft.teams
CREATE TABLE IF NOT EXISTS `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user` int(11) NOT NULL,
  `team` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `price` bigint(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_teams_users` (`user`),
  CONSTRAINT `FK_teams_users` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella futdraft.teams: ~1 rows (circa)
INSERT INTO `teams` (`id`, `name`, `user`, `team`, `price`) VALUES
	(16, 'Team 1', 10, '[[{"id":12,"lastname":"Lewandowski","firstname":"Robert","age":35,"height":1.85,"weight":79,"role":{"id":4,"name":"Attaccante"},"price":70000000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":null,"average_advances":null,"avarage_yellow_season":null,"average_passing_accuracy":0.73,"average_balls_recovered":null,"average_assist":0.5,"career_goal":500,"average_goal":0.85,"average_dribbling":1.8,"average_shots_on_goal":3}],[{"id":11,"lastname":"Modric","firstname":"Luka","age":38,"height":1.72,"weight":66,"role":{"id":3,"name":"Centrocampista"},"price":10000000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":1,"average_advances":0.8,"avarage_yellow_season":0.3,"average_passing_accuracy":0.95,"average_balls_recovered":5.9,"average_assist":1.5,"career_goal":50,"average_goal":0.1,"average_dribbling":1.7,"average_shots_on_goal":0.8},{"id":7,"lastname":"Jorginho","firstname":"Frello","age":32,"height":1.8,"weight":70,"role":{"id":3,"name":"Centrocampista"},"price":35000000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":1.1,"average_advances":0.9,"avarage_yellow_season":0.2,"average_passing_accuracy":0.93,"average_balls_recovered":4.7,"average_assist":1,"career_goal":15,"average_goal":0.08,"average_dribbling":1.3,"average_shots_on_goal":0.7},{"id":15,"lastname":"Kante","firstname":"N\'Golo","age":32,"height":1.68,"weight":68,"role":{"id":3,"name":"Centrocampista"},"price":60000000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":1.3,"average_advances":1.1,"avarage_yellow_season":0.2,"average_passing_accuracy":0.92,"average_balls_recovered":7,"average_assist":0.8,"career_goal":15,"average_goal":0.04,"average_dribbling":1.6,"average_shots_on_goal":0.9},{"id":3,"lastname":"Verratti","firstname":"Marco","age":31,"height":1.65,"weight":60,"role":{"id":3,"name":"Centrocampista"},"price":40000000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":1.2,"average_advances":1,"avarage_yellow_season":0.5,"average_passing_accuracy":0.9,"average_balls_recovered":5.1,"average_assist":1.2,"career_goal":10,"average_goal":0.1,"average_dribbling":1.5,"average_shots_on_goal":0.6},{"id":19,"lastname":"Kroos","firstname":"Toni","age":34,"height":1.83,"weight":78,"role":{"id":3,"name":"Centrocampista"},"price":25000000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":1.1,"average_advances":0.9,"avarage_yellow_season":0.3,"average_passing_accuracy":0.93,"average_balls_recovered":4.8,"average_assist":1,"career_goal":25,"average_goal":0.06,"average_dribbling":1.5,"average_shots_on_goal":0.7}],[{"id":2,"lastname":"Chiellini","firstname":"Giorgio","age":39,"height":1.87,"weight":85,"role":{"id":2,"name":"Difensore"},"price":2500000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":2.5,"average_advances":0.8,"avarage_yellow_season":0.3,"average_passing_accuracy":0.85,"average_balls_recovered":6.3,"average_assist":0.1,"career_goal":35,"average_goal":0.05,"average_dribbling":null,"average_shots_on_goal":null},{"id":6,"lastname":"Bonucci","firstname":"Leonardo","age":36,"height":1.9,"weight":82,"role":{"id":2,"name":"Difensore"},"price":2000000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":2,"average_advances":0.7,"avarage_yellow_season":0.4,"average_passing_accuracy":0.88,"average_balls_recovered":5.5,"average_assist":0.2,"career_goal":30,"average_goal":0.03,"average_dribbling":null,"average_shots_on_goal":null},{"id":30,"lastname":"Van Dijk","firstname":"Virgil","age":32,"height":1.93,"weight":92,"role":{"id":2,"name":"Difensore"},"price":50000000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":2.4,"average_advances":0.9,"avarage_yellow_season":0.4,"average_passing_accuracy":0.91,"average_balls_recovered":6.7,"average_assist":0.3,"career_goal":30,"average_goal":0.05,"average_dribbling":null,"average_shots_on_goal":null},{"id":18,"lastname":"Godin","firstname":"Diego","age":38,"height":1.85,"weight":81,"role":{"id":2,"name":"Difensore"},"price":1500000,"photo_url":null,"average_clean_sheet":null,"average_save":null,"average_goals_conceded":null,"average_contrasts_won":2.3,"average_advances":0.7,"avarage_yellow_season":0.4,"average_passing_accuracy":0.85,"average_balls_recovered":5.3,"average_assist":0.3,"career_goal":30,"average_goal":0.05,"average_dribbling":null,"average_shots_on_goal":null}],[{"id":9,"lastname":"De Gea","firstname":"David","age":33,"height":1.92,"weight":76,"role":{"id":1,"name":"Portiere"},"price":30000000,"photo_url":null,"average_clean_sheet":0.36,"average_save":4.3,"average_goals_conceded":1.3,"average_contrasts_won":null,"average_advances":null,"avarage_yellow_season":null,"average_passing_accuracy":null,"average_balls_recovered":null,"average_assist":null,"career_goal":null,"average_goal":null,"average_dribbling":null,"average_shots_on_goal":null}]]', 326000000);

-- Dump della struttura di tabella futdraft.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella futdraft.users: ~2 rows (circa)
INSERT INTO `users` (`id`, `lastname`, `firstname`, `email`, `password`) VALUES
	(9, 'Lattanzio', 'Thomas', 'tommy@gmail.com', '$2b$10$VjdqEa/CI3aGvFKBSaoEWudTRk8rlXQTK7Ltjjr2uGToAhpx.6HJi'),
	(10, 'Rosso', 'Simone', 'simone@gmail.com', '$2b$10$3xq374qF5eYIrt7x8yY4BORoQZRq1BMOuZFIDsVxDOUNLQ0YapaAm');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
