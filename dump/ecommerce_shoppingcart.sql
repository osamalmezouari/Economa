CREATE DATABASE  IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecommerce`;
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
-- Table structure for table `shoppingcart`
--

DROP TABLE IF EXISTS `shoppingcart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoppingcart` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `addedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ShoppingCart_userId_productId_key` (`userId`,`productId`),
  KEY `ShoppingCart_productId_fkey` (`productId`),
  CONSTRAINT `ShoppingCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ShoppingCart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcart`
--

LOCK TABLES `shoppingcart` WRITE;
/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
INSERT INTO `shoppingcart` VALUES ('21899a67-fc14-49cd-a5b7-732abfe7b638','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','44813c69-504f-4893-b3c0-ebf072532787',1,'2024-12-29 18:14:43.587'),('813d1d2c-5c2a-4d42-993d-6d9c92a3cf5e','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','db9a4d1c-fd28-4ce5-96ec-e236cae0de79',1,'2024-12-29 21:10:43.568'),('a4ee6ec0-a95e-4eca-8b2d-bc8be76d996a','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','2bf92ea9-19b9-41ad-813d-222b9dca568c',7,'2024-12-29 18:23:57.824'),('ae4f7e37-5566-466d-9c9f-e4688d7ff0c3','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','e99f4b36-ce62-4594-9b8e-5253572b8384',1,'2024-12-29 21:10:55.696'),('aeb9da89-5c14-452d-b1c0-94c62d94d587','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','6d26fa9f-4bc8-45a1-acc2-ffda8dc54415',1,'2024-12-29 20:56:37.044'),('daa15099-1905-41ea-814a-8b92d9e72c6f','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','66bb167d-5e02-4cc3-bc17-5e864bdee8b9',1,'2024-12-29 18:16:01.933'),('e100f6ca-9b05-48bb-8cb2-f19ab63f3028','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','9e7dacfd-8b85-4061-8bb2-2295e9786e5f',1,'2024-12-29 18:23:26.965'),('ed5a1ae1-7c39-4821-afd8-f62a7efc4b9d','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','a2c948f9-db97-411b-b693-0239fefbd93c',1,'2024-12-29 21:11:01.443'),('f2d7e0cc-4268-45f7-b8f4-3b55bbc135cb','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','e69c3c95-5817-4bd2-91b7-250d38ef8a75',1,'2024-12-29 21:10:49.250');
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-02 11:47:43
