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
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Gallery_productId_fkey` (`productId`),
  CONSTRAINT `Gallery_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES ('09c24e2e-3651-45e1-a571-b27f10c40123','8035cdba-7750-4d2c-a589-6dd2623b432a','2024-11-20 16:23:32.850','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/milk%20%26%20dairy/product2.jpg?raw=true'),('1def01d5-cc6a-4fc9-8bfd-8617603561fe','aa7ce023-cf25-498d-84ff-76b596e553c5','2024-11-20 13:21:26.674','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product3.jpg?raw=true'),('1e1fe988-327a-4ea8-a93e-b91be114cb40','cd4ebbc2-c884-450e-81fb-2f5c09faa6ed','2024-11-20 13:22:27.265','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product5.jpg?raw=true'),('1e78aff3-4ba8-4019-9a3f-2ca84b589081','f66248d8-e165-4067-9a6d-3ac4a5625402','2024-11-20 16:24:25.208','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/milk%20%26%20dairy/product4.jpg?raw=true'),('20f58411-457f-44c3-84c0-3bbe89117909','bbbf7af7-b1ee-4a65-8fd7-77117eae4901','2024-11-20 16:58:25.049','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product2.jpg?raw=true'),('23ddefa4-7882-40a1-8663-580bfd0c7ead','6d26fa9f-4bc8-45a1-acc2-ffda8dc54415','2024-11-20 15:13:45.496','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/bakery/product3.jpg?raw=true'),('2bf3b0ff-6d2d-43c6-95ab-96ebd6b9b5e9','47aed3bd-7b21-48b2-be15-ca8d7fc62e23','2024-11-20 17:10:50.302','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fastfood/product2.jpg?raw=true'),('343fa737-327f-4fb0-8a81-d034db9b320a','29df0554-e942-46cf-a21a-084e54eed26a','2024-11-20 17:11:04.244','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fastfood/product3.jpg?raw=true'),('36f1784c-2dbf-4ebf-9328-f83942effae8','f5dc065d-91ac-4590-ad7d-088e7a34e7a9','2024-11-20 13:23:21.805','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product8.jpg?raw=true'),('3a919433-513e-4fc4-b51b-af270969cd49','ad902d69-ee8b-447f-ac8b-a645e4d65a79','2024-11-20 17:11:16.274','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fastfood/product4.jpg?raw=true'),('3f640803-6670-4ecf-be70-c474997ce330','af8cca35-7cbb-4822-b17b-474035a69fbe','2024-11-20 15:13:09.305','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/bakery/product1.jpg?raw=true'),('449d4f66-2d8c-4965-8abb-5febed8cd9ba','5600ff4f-f924-4972-b821-a56f01384be4','2024-11-20 16:19:32.542','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/sea%20food/product1.jpg?raw=true'),('44a00550-c90e-4472-9294-75d137c1c39b','66bb167d-5e02-4cc3-bc17-5e864bdee8b9','2024-11-20 16:20:02.782','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/sea%20food/product3.jpg?raw=true'),('4ac3b8c9-deb9-409c-b6a0-4aec5f043884','b7100eb2-53ac-41f3-a383-ffc39cffba9c','2024-11-20 16:58:44.225','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product3.jpg?raw=true'),('4ecb8ff6-4fe6-44b4-ac8d-179313d25e8b','2e7745ae-1dff-4b16-8ab2-00bd09991348','2024-11-20 13:22:45.602','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product6.jpg?raw=true'),('4ee72a4b-a330-45f7-8861-c9f8f7c7bf99','0c952488-af86-4e2f-9692-4f23aef911af','2024-11-20 13:23:04.396','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product7.jpg?raw=true'),('61cdc9bd-f91c-4dcc-98c7-e041ab11c549','a2c948f9-db97-411b-b693-0239fefbd93c','2024-11-20 16:59:13.530','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product5.jpg?raw=true'),('786c6c3d-7701-4cc0-b606-c46cf64a8636','e69c3c95-5817-4bd2-91b7-250d38ef8a75','2024-11-20 13:19:42.483','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product1.jpg?raw=true'),('80992e7f-c928-4d93-b5dc-a3e9a888c494','ee3651d5-ae43-447a-8ff3-fa611be41f1b','2024-11-20 16:20:33.304','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/sea%20food/product5.jpg?raw=true'),('81056d8a-6eb0-4ea9-a3aa-52daf3763876','57420e18-745a-4d2d-a90a-6301abda45c1','2024-11-20 13:21:50.294','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product4.jpg?raw=true'),('81313ff2-5afc-4d3b-b257-c3f65a0e9e50','d9f5086d-04e6-4bd3-8447-094a4e688e7b','2024-11-20 17:10:30.927','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fastfood/product1.jpg?raw=true'),('8bd06b8a-c1f7-4ea8-a9b1-1d32b2a0df64','cc0ef72f-39b2-4ebc-8213-22b4f3f63e48','2024-11-20 16:58:06.706','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product1.jpg?raw=true'),('8d85e782-53bd-4acc-872d-78210796f518','e99f4b36-ce62-4594-9b8e-5253572b8384','2024-11-20 16:59:00.197','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product4.jpg?raw=true'),('986b2a89-d57a-4b2c-85c3-ba93d1de17c3','db9a4d1c-fd28-4ce5-96ec-e236cae0de79','2024-11-20 16:59:31.664','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product6.jpg?raw=true'),('a87c8c44-5c55-4cd0-af19-579c5c54bc2c','44813c69-504f-4893-b3c0-ebf072532787','2024-11-20 15:13:23.602','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/bakery/product2.jpg?raw=true'),('b0335e6b-fe43-48c2-b4cc-a7c6d8c9ffd0','28ada4f5-ec53-40f4-8dd3-e67da3d7e108','2024-11-20 16:23:44.899','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/milk%20%26%20dairy/product3.jpg?raw=true'),('b1713971-f3cc-4736-b462-d17e36c4db69','9fc54179-d314-4d3b-941e-215b67223653','2024-11-20 16:23:16.700','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/milk%20%26%20dairy/product1.jpg?raw=true'),('b1fe9442-d163-4f1c-9b1a-a0e6352ecc35','cf74b208-3980-4203-acf9-d4c8ad40a40b','2024-11-20 16:59:57.044','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product8.jpg?raw=true'),('bb9f0487-afa7-4b48-a057-c3a1a630767b','9e7dacfd-8b85-4061-8bb2-2295e9786e5f','2024-11-20 16:20:20.221','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/sea%20food/product4.jpg?raw=true'),('cca8003e-afa2-4e27-bb55-3e7a5e77f4ee','eb2f122d-83e0-428d-982d-de096e77c804','2024-11-20 13:23:37.164','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product9.jpg?raw=true'),('ce5fb9b5-4ab4-4ef7-b8fe-2b7cdc07c657','66d1a0a4-1018-44f0-a1fa-53c3bbb336fa','2024-11-20 16:19:46.996','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/sea%20food/product2.jpg?raw=true'),('e541bd8e-518f-4a46-8673-da39413c8a7c','9d4de2ba-a0ff-4ae1-ae11-4888580b8ee3','2024-11-20 13:21:12.907','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/vegetables/product2.jpg?raw=true'),('e847524a-d109-4db6-b490-79df8826acdd','2bf92ea9-19b9-41ad-813d-222b9dca568c','2024-11-20 17:00:10.895','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product9.jpg?raw=true'),('e8ff6771-f069-4c31-a274-fcd2149e1619','d5c58da3-4e63-49d4-b370-9d5dcd7176a1','2024-11-20 16:59:44.651','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/fruits/product7.jpg?raw=true'),('edb2b0d9-6cca-45cd-956a-b2af10c3ea96','cba20795-52d4-4dce-ba0b-e75c2963b353','2024-11-20 15:13:57.989','https://github.com/osamalmezouari/ecommerce/blob/master/client/public/assets/products/bakery/product4.jpg?raw=true');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
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
