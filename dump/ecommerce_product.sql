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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `stock` int NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `discount` int DEFAULT NULL,
  `unitId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Product_categoryId_fkey` (`categoryId`),
  KEY `Product_unitId_fkey` (`unitId`),
  CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Product_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `units` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('0c952488-af86-4e2f-9692-4f23aef911af','ginger','Fresh ginger adds a spicy kick and offers health benefits with its natural antioxidant properties',12.51,100,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 13:03:39.837','2024-11-20 13:03:39.837',0,'3'),('28ada4f5-ec53-40f4-8dd3-e67da3d7e108','Yogulleavert','Yogulleavert offers rich, thick, and creamy yogurt, made with premium ingredients for a smooth, indulgent texture and a refreshing, tangy taste.',15,100,'745d77d1-6d3e-41cc-905f-8129a5b63843','2024-11-20 15:58:21.921','2024-11-20 15:58:21.921',0,'4'),('29df0554-e942-46cf-a21a-084e54eed26a','Popcorn','Crispy, light, and perfectly salted, popcorn is the ideal snack for any occasion, offering a tasty crunch in every bite.',2.66,500,'967fdc3d-3c94-475a-ab0f-ee515cea5dc6','2024-11-20 17:07:16.699','2024-11-20 17:07:16.699',0,'1'),('2bf92ea9-19b9-41ad-813d-222b9dca568c','Pineapple','Tangy and sweet, pineapples offer a tropical burst of flavor, perfect for smoothies, fruit salads, or enjoying fresh',13.3,500,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:47:12.462','2024-11-20 16:47:12.462',0,'3'),('2e7745ae-1dff-4b16-8ab2-00bd09991348','corn','Our corn is fresh and sweet, adding flavor and texture to any dish, with health benefits from its high fiber and vitamin content',1.22,400,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 13:01:38.792','2024-11-20 13:01:38.792',0,'3'),('44813c69-504f-4893-b3c0-ebf072532787','Muffin Magic','Muffin Magic offers moist, fluffy muffins in a variety of flavors, baked with the finest ingredients for a deliciously magical taste in every bite.',15.3,100,'76fdf1a4-e766-4acf-ada8-2fcb215da8c4','2024-11-20 15:06:23.032','2024-11-20 15:06:23.032',10,'1'),('47aed3bd-7b21-48b2-be15-ca8d7fc62e23','juicy burger','Juicy, savory, and stacked with fresh ingredients, our burgers offer the perfect combination of flavors for a satisfying meal every time.',10.3,500,'967fdc3d-3c94-475a-ab0f-ee515cea5dc6','2024-11-20 17:05:40.218','2024-11-20 17:05:40.218',0,'1'),('5600ff4f-f924-4972-b821-a56f01384be4','CrabMaster','CrabMaster offers premium crab meat, delicately harvested for its sweet, tender texture and rich flavor',18.55,100,'305ecc35-68d1-463d-a960-d4ca4f8502e6','2024-11-20 16:08:50.967','2024-11-20 16:08:50.967',0,'1'),('57420e18-745a-4d2d-a90a-6301abda45c1','parsley','Our fresh parsley adds a burst of aromatic and refreshing flavor to any dish, while offering numerous health benefits',2.26,2000,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 12:53:59.781','2024-11-20 12:53:59.781',0,'3'),('66bb167d-5e02-4cc3-bc17-5e864bdee8b9','Freshly Caught','Golden Bay Prawns offer succulent, freshly caught prawns, delivering a sweet, tender taste perfect for any seafood dish.',30.55,150,'305ecc35-68d1-463d-a960-d4ca4f8502e6','2024-11-20 16:13:09.593','2024-11-20 16:13:09.593',10,'1'),('66d1a0a4-1018-44f0-a1fa-53c3bbb336fa','FreshCatch','FreshCatch Smoked Salmon offers tender, smoky salmon with a rich flavor, perfect for sandwiches, salads, or as a savory appetizer.',45.55,100,'305ecc35-68d1-463d-a960-d4ca4f8502e6','2024-11-20 16:11:03.277','2024-11-20 16:11:03.277',0,'1'),('6d26fa9f-4bc8-45a1-acc2-ffda8dc54415','Treats Cookie','Sweet Treats Cookie offers soft, chewy cookies loaded with rich flavors, baked to perfection for a delightful, sweet indulgence in every bite',15.3,100,'76fdf1a4-e766-4acf-ada8-2fcb215da8c4','2024-11-20 15:08:02.916','2024-11-20 15:08:02.916',10,'1'),('8035cdba-7750-4d2c-a589-6dd2623b432a','Pure Milk','Pure Milk offers fresh, creamy milk sourced from the finest dairies, packed with nutrients for a rich, wholesome taste in every glass.',4,100,'745d77d1-6d3e-41cc-905f-8129a5b63843','2024-11-20 15:54:43.415','2024-11-20 15:54:43.415',0,'4'),('9d4de2ba-a0ff-4ae1-ae11-4888580b8ee3','potato','Our potatoes are bursting with flavor and packed with essential nutrients, bringing freshness and vitality to every bite',8.54,40,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 12:29:05.576','2024-11-20 12:29:05.576',0,'3'),('9e7dacfd-8b85-4061-8bb2-2295e9786e5f','Ocean\'s Bounty','Premium frozen seafood, offering fresh, ocean-rich flavors for a variety of delicious seafood dishes.',35.55,150,'305ecc35-68d1-463d-a960-d4ca4f8502e6','2024-11-20 16:16:49.658','2024-11-20 16:16:49.658',10,'1'),('9fc54179-d314-4d3b-941e-215b67223653','Cheese Mozzzell','Cheese Craft Mozzeli offers smooth, creamy mozzarella with a fresh, rich flavor, perfect for pizzas, salads, or enjoying on its own.',18.3,100,'745d77d1-6d3e-41cc-905f-8129a5b63843','2024-11-20 15:52:33.744','2024-11-20 15:52:33.744',20,'1'),('a2c948f9-db97-411b-b693-0239fefbd93c','Lychee','Delight in the unique, juicy flavor of lychees. Perfect for desserts, salads, or as a refreshing snack. Try yours today!',35.3,300,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:40:52.724','2024-11-20 16:40:52.724',10,'3'),('aa7ce023-cf25-498d-84ff-76b596e553c5','onion','Rich in flavor and packed with nutrients, our onions bring a delightful crunch and depth to any dish, enhancing your meals with natural goodness',2.99,80,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 12:31:04.230','2024-11-20 12:31:04.230',0,'3'),('ad902d69-ee8b-447f-ac8b-a645e4d65a79','Nugget Bites','Crispy on the outside, tender on the inside, our nugget bites are the perfect bite-sized snack, packed with savory flavor in every piece.',12.66,500,'967fdc3d-3c94-475a-ab0f-ee515cea5dc6','2024-11-20 17:08:30.568','2024-11-20 17:08:30.568',0,'1'),('af8cca35-7cbb-4822-b17b-474035a69fbe','golden bake','GoldenBake offers fresh, delicious croissants, pastries, and bread, crafted with premium ingredients for a perfect, irresistible taste in every bite.',10,100,'76fdf1a4-e766-4acf-ada8-2fcb215da8c4','2024-11-20 15:04:16.230','2024-11-20 15:04:16.230',10,'1'),('b7100eb2-53ac-41f3-a383-ffc39cffba9c','Blueberries','Sweet and tangy, blueberries are packed with flavor and nutrients, perfect for snacking, baking, or topping your favorite dishes',25.3,300,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:34:41.281','2024-11-20 16:34:41.281',10,'3'),('bbbf7af7-b1ee-4a65-8fd7-77117eae4901','dragon fruit','Exotic and refreshing, dragon fruit offers a mildly sweet flavor and vibrant color, perfect for snacking, smoothies, or desserts',16.3,300,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:32:52.527','2024-11-20 16:32:52.527',5,'3'),('cba20795-52d4-4dce-ba0b-e75c2963b353','Paris Sweets','Paris Sweets offers elegant, handcrafted pastries inspired by the flavors of Paris, with delicate textures and rich, sweet tastes in every bite',18.3,100,'76fdf1a4-e766-4acf-ada8-2fcb215da8c4','2024-11-20 15:09:15.524','2024-11-20 15:09:15.524',0,'1'),('cc0ef72f-39b2-4ebc-8213-22b4f3f63e48','Apple','Juicy, crisp, and naturally sweet, apples are a versatile fruit perfect for snacking, baking, or adding freshness to any dish',10.55,300,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:30:31.461','2024-11-20 16:30:31.461',5,'3'),('cd4ebbc2-c884-450e-81fb-2f5c09faa6ed','sweet peppers','Our sweet peppers are full of fresh, sweet flavor, adding a pop of color and freshness to your dishes, while offering health benefits',7.65,150,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 12:57:55.108','2024-11-20 12:58:39.966',30,'3'),('cf74b208-3980-4203-acf9-d4c8ad40a40b','Mango','Sweet, juicy, and tropical, mangoes are a perfect burst of flavor, ideal for smoothies, desserts, or enjoying fresh',13.3,500,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:45:09.792','2024-11-20 16:45:09.792',0,'3'),('d5c58da3-4e63-49d4-b370-9d5dcd7176a1','Guava','Sweet and fragrant, guava offers a tropical flavor rich in vitamins, perfect for smoothies, desserts, or enjoying fresh',35.3,500,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:43:29.712','2024-11-20 16:43:29.712',0,'3'),('d9f5086d-04e6-4bd3-8447-094a4e688e7b','Crispy Fries','Golden, crispy, and perfectly seasoned, these fries are the ultimate fast food treat, perfect for pairing with burgers or enjoying on their own.',5.3,500,'967fdc3d-3c94-475a-ab0f-ee515cea5dc6','2024-11-20 17:03:17.221','2024-11-20 17:03:55.883',0,'1'),('db9a4d1c-fd28-4ce5-96ec-e236cae0de79','Orange','Juicy and refreshing, oranges are bursting with sweet citrus flavor and packed with vitamin C, perfect for snacks or fresh juices.',35.3,500,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:42:15.707','2024-11-20 16:42:15.707',0,'3'),('e69c3c95-5817-4bd2-91b7-250d38ef8a75','tomato','Fresh and vibrant, our tomatoes are packed with flavor and nutrients',6.22,20,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 12:27:05.536','2024-11-20 12:27:05.536',20,'3'),('e99f4b36-ce62-4594-9b8e-5253572b8384','Cherries','Juicy and sweet, cherries are a delicious and versatile fruit, perfect for snacking, baking, or adding a burst of flavor to any dish',25.3,300,'7740708f-5623-4cf5-a45a-bfdf36bfd4db','2024-11-20 16:37:20.374','2024-11-20 16:37:20.374',25,'3'),('eb2f122d-83e0-428d-982d-de096e77c804','broccoli','Our fresh broccoli is packed with vitamins, adding a unique flavor and health benefits with its antioxidant properties',20.55,100,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 13:06:11.229','2024-11-20 13:06:11.229',10,'3'),('ee3651d5-ae43-447a-8ff3-fa611be41f1b','Sea Fresh','SeaFresh offers premium ocean-caught seafood, delivering fresh, high-quality taste perfect for all your seafood recipes.',15.55,150,'305ecc35-68d1-463d-a960-d4ca4f8502e6','2024-11-20 16:17:46.434','2024-11-20 16:17:46.434',10,'1'),('f5dc065d-91ac-4590-ad7d-088e7a34e7a9','beetroot','Our fresh beetroot enhances flavors and offers health benefits with its rich vitamin and mineral content',15.35,100,'5d577fe5-0944-4f3c-88e2-5db4fdfd5c38','2024-11-20 13:05:17.886','2024-11-20 13:05:17.886',10,'3'),('f66248d8-e165-4067-9a6d-3ac4a5625402','NuttyFresh Almond Milk','NuttyFresh Almond Milk offers a smooth, creamy, and dairy-free alternative, made from organic almonds for a naturally nutty, wholesome taste',20.55,100,'745d77d1-6d3e-41cc-905f-8129a5b63843','2024-11-20 15:59:54.451','2024-11-20 15:59:54.451',0,'4');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
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
