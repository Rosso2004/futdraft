-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              10.4.28-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dump della struttura del database kronos
CREATE DATABASE IF NOT EXISTS `kronos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `kronos`;

-- Dump della struttura di tabella kronos.course
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `day` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `max` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella kronos.course: ~0 rows (circa)

-- Dump della struttura di tabella kronos.customer
CREATE TABLE IF NOT EXISTS `customer` (
  `fiscal_code` varchar(255) NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`fiscal_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella kronos.customer: ~2 rows (circa)
INSERT INTO `customer` (`fiscal_code`, `lastname`, `firstname`, `birthday`, `email`, `phone_number`, `password`) VALUES
	('RSSSMN04P23L219M', 'Rosso', 'Simone', '2004-09-23', 'rossosimone@gmail.com', '123456789', '$2b$10$8Ga8Si.PS8.TaF3OSuvK..6TgTCkRxtvcRtNZGsNy1uvOntcmahha');

-- Dump della struttura di tabella kronos.medical_certificate
CREATE TABLE IF NOT EXISTS `medical_certificate` (
  `id` int(11) NOT NULL,
  `expiration` date DEFAULT NULL,
  `fiscal_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_medical_certificate_customer` (`fiscal_code`),
  CONSTRAINT `FK_medical_certificate_customer` FOREIGN KEY (`fiscal_code`) REFERENCES `customer` (`fiscal_code`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella kronos.medical_certificate: ~0 rows (circa)

-- Dump della struttura di tabella kronos.rel_course_customer
CREATE TABLE IF NOT EXISTS `rel_course_customer` (
  `fiscal_code` varchar(255) DEFAULT NULL,
  `id_course` int(11) DEFAULT NULL,
  KEY `FK_rel_course_customer_customer` (`fiscal_code`),
  KEY `FK_rel_course_customer_course` (`id_course`),
  CONSTRAINT `FK_rel_course_customer_course` FOREIGN KEY (`id_course`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_rel_course_customer_customer` FOREIGN KEY (`fiscal_code`) REFERENCES `customer` (`fiscal_code`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella kronos.rel_course_customer: ~0 rows (circa)

-- Dump della struttura di tabella kronos.subscription
CREATE TABLE IF NOT EXISTS `subscription` (
  `id` int(11) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `finish_date` datetime DEFAULT NULL,
  `fiscal_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_subscription_customer` (`fiscal_code`),
  CONSTRAINT `FK_subscription_customer` FOREIGN KEY (`fiscal_code`) REFERENCES `customer` (`fiscal_code`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella kronos.subscription: ~0 rows (circa)

-- Dump della struttura di tabella kronos.workout
CREATE TABLE IF NOT EXISTS `workout` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `start` date DEFAULT NULL,
  `finish` date DEFAULT NULL,
  `day_of_work` int(11) DEFAULT NULL,
  `fiscal_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_workout_customer` (`fiscal_code`),
  CONSTRAINT `FK_workout_customer` FOREIGN KEY (`fiscal_code`) REFERENCES `customer` (`fiscal_code`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dump dei dati della tabella kronos.workout: ~0 rows (circa)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
