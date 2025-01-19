-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('305ecc35-68d1-463d-a960-d4ca4f8502e6','Seafood','Fresh or frozen fish, shellfish, and other marine life, valued for their protein content and essential nutrients','https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/seafood.svg'),('5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','Vegetables','Vegetables: Nutrient-rich plants, including leafy greens, root vegetables, and cruciferous types, commonly used in cooking for their health benefits.','https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/tomato.svg'),('745d77d1-6d3e-41cc-905f-8129a5b63843','Milk & Diary',' Fresh and processed products derived from milk, including milk, cheese, yogurt, butter, and cream, essential for a balanced diet','https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/milk&dairy.svg'),('76fdf1a4-e766-4acf-ada8-2fcb215da8c4','Bakery','A place offering a variety of freshly baked goods like bread, cakes, and pastries, perfect for satisfying sweet cravings.','https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/bakery.svg'),('7740708f-5623-4cf5-a45a-bfdf36bfd4db','Fruits','Fresh, ripe, and delicious fruits, perfect for snacking or adding to your meals. Enjoy a variety of seasonal and tropical fruits, full of vitamins and flavor.','https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/fruits.svg'),('967fdc3d-3c94-475a-ab0f-ee515cea5dc6','Fastfood','Quick and convenient meals, typically including burgers, fries, pizzas, and sandwiches, often served in a casual or takeout setting','https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/popcorn.svg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-19 21:03:23
