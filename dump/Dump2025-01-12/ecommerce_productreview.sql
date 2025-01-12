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
-- Table structure for table `productreview`
--

DROP TABLE IF EXISTS `productreview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productreview` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `reviewText` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductReview_userId_productId_key` (`userId`,`productId`),
  KEY `ProductReview_productId_fkey` (`productId`),
  CONSTRAINT `ProductReview_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ProductReview_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productreview`
--

LOCK TABLES `productreview` WRITE;
/*!40000 ALTER TABLE `productreview` DISABLE KEYS */;
INSERT INTO `productreview` VALUES ('233e3b79-cfe8-4384-9e9d-d0a2eb0ec8b0','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','aa7ce023-cf25-498d-84ff-76b596e553c5',5,'Excellent potatoes onion !','2025-01-05 19:55:24.900'),('2bd94d13-008a-4fcc-8bb9-6f3496f6365b','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','57420e18-745a-4d2d-a90a-6301abda45c1',5,'un bon produit','2025-01-05 19:52:31.284'),('6ffa357b-31a2-4cc8-8093-758c9751e3c7','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','2e7745ae-1dff-4b16-8ab2-00bd09991348',3,'un bon produit','2025-01-05 19:52:13.313'),('80a4b765-b08c-44d9-8794-0c3f31e615ed','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','9d4de2ba-a0ff-4ae1-ae11-4888580b8ee3',5,'Excellent potatoes, perfect for making crispy chips!','2025-01-05 19:54:33.894'),('87e1e322-9473-40c0-8da5-5eec62adaa87','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','e69c3c95-5817-4bd2-91b7-250d38ef8a75',1,'trash and oldest tomato','2025-01-06 19:10:06.356'),('998906e8-851e-4e46-afbd-d198d26a447d','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','0c952488-af86-4e2f-9692-4f23aef911af',3,'Vivo utilis socius una coma.','2024-12-26 18:53:16.876'),('e3157b8e-c33e-4234-ab4f-cf30ae434d69','0b26d6c7-488e-4fef-80b7-a88c0ad9368b','cd4ebbc2-c884-450e-81fb-2f5c09faa6ed',4,'fresh and juicy Sweet peppers','2025-01-05 20:11:09.938');
/*!40000 ALTER TABLE `productreview` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-12 22:02:29
