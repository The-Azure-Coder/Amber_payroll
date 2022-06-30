CREATE DATABASE  IF NOT EXISTS `payroll` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `payroll`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: payroll
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conditions`
--

DROP TABLE IF EXISTS `conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conditions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `condition` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conditions`
--

LOCK TABLES `conditions` WRITE;
/*!40000 ALTER TABLE `conditions` DISABLE KEYS */;
INSERT INTO `conditions` VALUES (1,'Absent'),(2,'Sick');
/*!40000 ALTER TABLE `conditions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_nm` varchar(45) NOT NULL,
  `rates` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Operations','400'),(2,'Sales & Marketing','500'),(3,'Administration','900'),(4,'Accounts','800');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `first_nm` varchar(45) NOT NULL,
  `last_nm` varchar(45) NOT NULL,
  `nis` varchar(45) NOT NULL,
  `trn` varchar(80) NOT NULL,
  `expected_hrs` int NOT NULL DEFAULT '40',
  PRIMARY KEY (`id`),
  KEY `FK_department_id_idx` (`department_id`),
  CONSTRAINT `FK_department_id` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,3,'Tyrese','Morgan','AA3123','123-456-789',50),(2,2,'Shannel','Grant','AS3456','145-678-890',40);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `department_id` int NOT NULL,
  `emp_id` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2_role_id_idx` (`role_id`),
  KEY `FK2_department_id_idx` (`department_id`),
  KEY `FK_emp_id_idx` (`emp_id`),
  CONSTRAINT `FK2_department_id` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `FK_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (1,1,3,1,'jrackfinn@gmail.com','tyrese123'),(2,2,2,2,'shannel12@gmail.com','shannel123');
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paycycle`
--

DROP TABLE IF EXISTS `paycycle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paycycle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_time` varchar(45) NOT NULL,
  `end_time` varchar(45) NOT NULL,
  `activity` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paycycle`
--

LOCK TABLES `paycycle` WRITE;
/*!40000 ALTER TABLE `paycycle` DISABLE KEYS */;
/*!40000 ALTER TABLE `paycycle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roles` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'Supervisor'),(3,'Accountant'),(4,'Employee');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_payment`
--

DROP TABLE IF EXISTS `salary_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary_payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int NOT NULL,
  `department_id` int NOT NULL,
  `paycycle_id` int NOT NULL,
  `workhrs_id` int NOT NULL,
  `salary` varchar(45) NOT NULL,
  `overtime` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2_emp_id_idx` (`emp_id`),
  KEY `FK3_emp_id_idx` (`emp_id`),
  KEY `FK3_department_id_idx` (`department_id`),
  KEY `FK_paycycle_id_idx` (`paycycle_id`),
  KEY `FK_workhrs_id_idx` (`workhrs_id`),
  CONSTRAINT `FK3_department_id` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `FK3_emp_id` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `FK_paycycle_id` FOREIGN KEY (`paycycle_id`) REFERENCES `paycycle` (`id`),
  CONSTRAINT `FK_workhrs_id` FOREIGN KEY (`workhrs_id`) REFERENCES `work_hours` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_payment`
--

LOCK TABLES `salary_payment` WRITE;
/*!40000 ALTER TABLE `salary_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_hours`
--

DROP TABLE IF EXISTS `work_hours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_hours` (
  `id` int NOT NULL,
  `emp_id` varchar(45) NOT NULL,
  `hrs` varchar(45) NOT NULL,
  `paycycle_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_hours`
--

LOCK TABLES `work_hours` WRITE;
/*!40000 ALTER TABLE `work_hours` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_hours` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-30 17:34:29
