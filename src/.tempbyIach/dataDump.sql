-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: eduvoice
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (706,'校規'),(707,'資源'),(708,'課程');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rule_history`
--

LOCK TABLES `rule_history` WRITE;
/*!40000 ALTER TABLE `rule_history` DISABLE KEYS */;
INSERT INTO `rule_history` VALUES (1,1,262,'jgjgwej','2024-07-07 02:20:26','O');
INSERT INTO `rule_history` VALUES (2,1,261,'jgjgwej','2024-11-07 02:20:26','?');
/*!40000 ALTER TABLE `rule_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rule_status`
--

LOCK TABLES `rule_status` WRITE;
/*!40000 ALTER TABLE `rule_status` DISABLE KEYS */;
INSERT INTO `rule_status` VALUES (1,1,262,'debuging','2024-07-07');
/*!40000 ALTER TABLE `rule_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rule_tag`
--

LOCK TABLES `rule_tag` WRITE;
/*!40000 ALTER TABLE `rule_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `rule_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rules`
--

LOCK TABLES `rules` WRITE;
/*!40000 ALTER TABLE `rules` DISABLE KEYS */;
INSERT INTO `rules` VALUES (1,'學校有沒有愛心傘',707,'清明時節雨紛紛\n路上行人欲斷魂',0),(2,'國立公幼',707,'抽不到公幼啦',0),(3,'取消早自修',0,'延後上學時間或改為晨讀時間間',0),(4,'早自修不考試',0,'延後上學時間或改為晨讀時間間',0),(5,'便服日，不強制穿校服',0,'延後上學時間或改為晨讀時間間',0),(6,'每個人都能搭乘學校電梯',0,'延後上學時間或改為晨讀時間間',0),(7,'監視器全校無死角',0,'延後上學時間或改為晨讀時間間',0),(8,'學校監視器留檔時間',0,'延後上學時間或改為晨讀時間間',0);
/*!40000 ALTER TABLE `rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `schools`
--

LOCK TABLES `schools` WRITE;
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;
INSERT INTO `schools` VALUES (1,'國立臺灣戲曲學院附設高職部',NULL,'臺北市',NULL),(2,'國立臺東專科學校附設高職部',NULL,'臺東縣',NULL),(3,'國立華僑高級中等學校',NULL,'新北市',NULL),(4,'私立淡江高中',NULL,'新北市',NULL),(5,'私立康橋高中',NULL,'新北市',NULL),(6,'私立金陵女中',NULL,'新北市',NULL),(7,'新北市裕德高級中等學校',NULL,'新北市',NULL),(8,'財團法人南山高中',NULL,'新北市',NULL),(9,'財團法人恆毅高中',NULL,'新北市',NULL),(10,'私立聖心女中',NULL,'新北市',NULL),(11,'私立崇義高中',NULL,'新北市',NULL),(12,'新北市福瑞斯特高中',NULL,'新北市',NULL),(13,'私立東海高中',NULL,'新北市',NULL),(14,'私立格致高中',NULL,'新北市',NULL),(15,'私立醒吾高中',NULL,'新北市',NULL),(16,'私立徐匯高中',NULL,'新北市',NULL),(17,'新北市崇光高中',NULL,'新北市',NULL),(18,'私立光仁高中',NULL,'新北市',NULL),(19,'私立竹林高中',NULL,'新北市',NULL),(20,'私立及人高中',NULL,'新北市',NULL),(21,'財團法人辭修高中',NULL,'新北市',NULL),(22,'新北市林口康橋國際高中',NULL,'新北市',NULL),(23,'私立時雨高中',NULL,'新北市',NULL),(24,'市立泰山高中',NULL,'新北市',NULL),(25,'市立板橋高中',NULL,'新北市',NULL),(26,'市立新店高中',NULL,'新北市',NULL),(27,'市立中和高中',NULL,'新北市',NULL),(28,'市立新莊高中',NULL,'新北市',NULL),(29,'市立新北高中',NULL,'新北市',NULL),(30,'市立林口高中',NULL,'新北市',NULL),(31,'市立海山高中',NULL,'新北市',NULL),(32,'市立三重高中',NULL,'新北市',NULL),(33,'市立永平高中',NULL,'新北市',NULL),(34,'市立樹林高中',NULL,'新北市',NULL),(35,'市立明德高中',NULL,'新北市',NULL),(36,'市立秀峰高中',NULL,'新北市',NULL),(37,'市立金山高中',NULL,'新北市',NULL),(38,'市立安康高中',NULL,'新北市',NULL),(39,'市立雙溪高中',NULL,'新北市',NULL),(40,'市立石碇高中',NULL,'新北市',NULL),(41,'市立丹鳳高中',NULL,'新北市',NULL),(42,'市立清水高中',NULL,'新北市',NULL),(43,'市立三民高中',NULL,'新北市',NULL),(44,'市立錦和高中',NULL,'新北市',NULL),(45,'市立光復高中',NULL,'新北市',NULL),(46,'市立竹圍高中',NULL,'新北市',NULL),(47,'市立北大高級中學',NULL,'新北市',NULL),(48,'市立豐珠中學',NULL,'新北市',NULL),(49,'國立蘭陽女中',NULL,'宜蘭縣',NULL),(50,'國立宜蘭高中',NULL,'宜蘭縣',NULL),(51,'國立羅東高中',NULL,'宜蘭縣',NULL),(52,'私立慧燈高中',NULL,'宜蘭縣',NULL),(53,'私立中道高中',NULL,'宜蘭縣',NULL),(54,'縣立南澳高中',NULL,'宜蘭縣',NULL),(55,'縣立慈心華德福實中',NULL,'宜蘭縣',NULL),(56,'國立中央大學附屬中壢高中',NULL,'桃園市',NULL),(57,'桃園市懷恩高中',NULL,'桃園市',NULL),(58,'桃園市育達高中',NULL,'桃園市',NULL),(59,'私立六和高中',NULL,'桃園市',NULL),(60,'桃園市復旦高中',NULL,'桃園市',NULL),(61,'桃園市治平高中',NULL,'桃園市',NULL),(62,'桃園市振聲高中',NULL,'桃園市',NULL),(63,'私立光啟高中',NULL,'桃園市',NULL),(64,'桃園市啟英高中',NULL,'桃園市',NULL),(65,'桃園市清華高中',NULL,'桃園市',NULL),(66,'桃園市新興高中',NULL,'桃園市',NULL),(67,'私立至善高中',NULL,'桃園市',NULL),(68,'桃園市大興高中',NULL,'桃園市',NULL),(69,'私立大華高中',NULL,'桃園市',NULL),(70,'市立龍潭高中',NULL,'桃園市',NULL),(71,'市立桃園高中',NULL,'桃園市',NULL),(72,'市立武陵高中',NULL,'桃園市',NULL),(73,'市立楊梅高中',NULL,'桃園市',NULL),(74,'市立陽明高中',NULL,'桃園市',NULL),(75,'市立內壢高中',NULL,'桃園市',NULL),(76,'市立南崁高中',NULL,'桃園市',NULL),(77,'市立大溪高中',NULL,'桃園市',NULL),(78,'市立壽山高中',NULL,'桃園市',NULL),(79,'市立平鎮高中',NULL,'桃園市',NULL),(80,'市立觀音高中',NULL,'桃園市',NULL),(81,'市立新屋高級中等學校',NULL,'桃園市',NULL),(82,'市立永豐高中',NULL,'桃園市',NULL),(83,'市立羅浮高中',NULL,'桃園市',NULL),(84,'市立大園國際高中',NULL,'桃園市',NULL),(85,'國立竹東高中',NULL,'新竹縣',NULL),(86,'國立關西高中',NULL,'新竹縣',NULL),(87,'國立竹北高中',NULL,'新竹縣',NULL),(88,'私立義民高中',NULL,'新竹縣',NULL),(89,'私立忠信高中',NULL,'新竹縣',NULL),(90,'私立東泰高中',NULL,'新竹縣',NULL),(91,'私立仰德高中',NULL,'新竹縣',NULL),(92,'縣立六家高級中學',NULL,'新竹縣',NULL),(93,'縣立湖口高中',NULL,'新竹縣',NULL),(94,'國立苗栗高中',NULL,'苗栗縣',NULL),(95,'國立竹南高中',NULL,'苗栗縣',NULL),(96,'國立卓蘭高中',NULL,'苗栗縣',NULL),(97,'國立苑裡高中',NULL,'苗栗縣',NULL),(98,'私立君毅高中',NULL,'苗栗縣',NULL),(99,'私立大成高中',NULL,'苗栗縣',NULL),(100,'私立建臺高中',NULL,'苗栗縣',NULL),(101,'私立全人實驗高中',NULL,'苗栗縣',NULL),(102,'縣立三義高中',NULL,'苗栗縣',NULL),(103,'縣立苑裡高中',NULL,'苗栗縣',NULL),(104,'縣立興華高中',NULL,'苗栗縣',NULL),(105,'縣立大同高中',NULL,'苗栗縣',NULL),(106,'國立興大附中',NULL,'臺中市',NULL),(107,'國立中科實驗高級中學',NULL,'臺中市',NULL),(108,'財團法人常春藤高中',NULL,'臺中市',NULL),(109,'私立明台高中',NULL,'臺中市',NULL),(110,'私立致用高中',NULL,'臺中市',NULL),(111,'臺中市大明高中',NULL,'臺中市',NULL),(112,'私立嘉陽高中',NULL,'臺中市',NULL),(113,'私立明道高中',NULL,'臺中市',NULL),(114,'私立僑泰高中',NULL,'臺中市',NULL),(115,'私立華盛頓高中',NULL,'臺中市',NULL),(116,'私立青年高中',NULL,'臺中市',NULL),(117,'私立弘文高中',NULL,'臺中市',NULL),(118,'私立立人高中',NULL,'臺中市',NULL),(119,'私立玉山高中',NULL,'臺中市',NULL),(120,'私立慈明高中',NULL,'臺中市',NULL),(121,'華德福大地實驗學校',NULL,'臺中市',NULL),(122,'市立大甲高中',NULL,'臺中市',NULL),(123,'市立清水高中',NULL,'臺中市',NULL),(124,'市立豐原高中',NULL,'臺中市',NULL),(125,'市立后綜高中',NULL,'臺中市',NULL),(126,'市立大里高中',NULL,'臺中市',NULL),(127,'市立新社高中',NULL,'臺中市',NULL),(128,'市立長億高中',NULL,'臺中市',NULL),(129,'市立中港高中',NULL,'臺中市',NULL),(130,'市立龍津高中',NULL,'臺中市',NULL),(131,'國立彰化女中',NULL,'彰化縣',NULL),(132,'國立員林高中',NULL,'彰化縣',NULL),(133,'國立彰化高中',NULL,'彰化縣',NULL),(134,'國立鹿港高中',NULL,'彰化縣',NULL),(135,'國立溪湖高中',NULL,'彰化縣',NULL),(136,'私立精誠高中',NULL,'彰化縣',NULL),(137,'私立文興高中',NULL,'彰化縣',NULL),(138,'財團法人正德高中',NULL,'彰化縣',NULL),(139,'縣立彰化藝術高中',NULL,'彰化縣',NULL),(140,'縣立二林高中',NULL,'彰化縣',NULL),(141,'縣立和美高中',NULL,'彰化縣',NULL),(142,'縣立田中高中',NULL,'彰化縣',NULL),(143,'縣立成功高中',NULL,'彰化縣',NULL),(144,'國立南投高中',NULL,'南投縣',NULL),(145,'國立中興高中',NULL,'南投縣',NULL),(146,'國立竹山高中',NULL,'南投縣',NULL),(147,'國立暨大附中',NULL,'南投縣',NULL),(148,'私立五育高中',NULL,'南投縣',NULL),(149,'私立三育高中',NULL,'南投縣',NULL),(150,'私立弘明實驗高中',NULL,'南投縣',NULL),(151,'私立普台高中',NULL,'南投縣',NULL),(152,'縣立旭光高中',NULL,'南投縣',NULL),(153,'國立斗六高中',NULL,'雲林縣',NULL),(154,'國立北港高中',NULL,'雲林縣',NULL),(155,'國立虎尾高中',NULL,'雲林縣',NULL),(156,'私立永年高中',NULL,'雲林縣',NULL),(157,'私立正心高中',NULL,'雲林縣',NULL),(158,'私立文生高中',NULL,'雲林縣',NULL),(159,'私立巨人高中',NULL,'雲林縣',NULL),(160,'私立揚子高中',NULL,'雲林縣',NULL),(161,'財團法人義峰高中',NULL,'雲林縣',NULL),(162,'福智高中',NULL,'雲林縣',NULL),(163,'雲林縣維多利亞實驗高中',NULL,'雲林縣',NULL),(164,'縣立斗南高中',NULL,'雲林縣',NULL),(165,'縣立麥寮高中',NULL,'雲林縣',NULL),(166,'縣立古坑華德福實驗高級中學',NULL,'雲林縣',NULL),(167,'縣立蔦松藝術高中',NULL,'雲林縣',NULL),(168,'國立東石高中',NULL,'嘉義縣',NULL),(169,'國立新港藝術高中',NULL,'嘉義縣',NULL),(170,'私立同濟高中',NULL,'嘉義縣',NULL),(171,'私立協同高中',NULL,'嘉義縣',NULL),(172,'縣立竹崎高中',NULL,'嘉義縣',NULL),(173,'縣立永慶高中',NULL,'嘉義縣',NULL),(174,'國立新豐高中',NULL,'臺南市',NULL),(175,'國立臺南大學附中',NULL,'臺南市',NULL),(176,'國立北門高中',NULL,'臺南市',NULL),(177,'國立新營高中',NULL,'臺南市',NULL),(178,'國立後壁高中',NULL,'臺南市',NULL),(179,'國立善化高中',NULL,'臺南市',NULL),(180,'國立新化高中',NULL,'臺南市',NULL),(181,'國立南科國際實驗高中',NULL,'臺南市',NULL),(182,'私立南光高中',NULL,'臺南市',NULL),(183,'私立港明高中',NULL,'臺南市',NULL),(184,'臺南市興國高中',NULL,'臺南市',NULL),(185,'私立明達高中',NULL,'臺南市',NULL),(186,'私立黎明高中',NULL,'臺南市',NULL),(187,'私立新榮高中',NULL,'臺南市',NULL),(188,'市立大灣高中',NULL,'臺南市',NULL),(189,'市立永仁高中',NULL,'臺南市',NULL),(190,'國立鳳山高中',NULL,'高雄市',NULL),(191,'國立岡山高中',NULL,'高雄市',NULL),(192,'國立旗美高中',NULL,'高雄市',NULL),(193,'國立鳳新高中',NULL,'高雄市',NULL),(194,'光禾華德福實驗學校',NULL,'高雄市',NULL),(195,'財團法人新光高中',NULL,'高雄市',NULL),(196,'財團法人普門中學',NULL,'高雄市',NULL),(197,'私立正義高中',NULL,'高雄市',NULL),(198,'私立義大國際高中',NULL,'高雄市',NULL),(199,'市立文山高中',NULL,'高雄市',NULL),(200,'市立林園高中',NULL,'高雄市',NULL),(201,'市立仁武高中',NULL,'高雄市',NULL),(202,'市立路竹高中',NULL,'高雄市',NULL),(203,'市立六龜高中',NULL,'高雄市',NULL),(204,'市立福誠高中',NULL,'高雄市',NULL),(205,'國立屏東女中',NULL,'屏東縣',NULL),(206,'國立屏東高中',NULL,'屏東縣',NULL),(207,'國立潮州高中',NULL,'屏東縣',NULL),(208,'國立屏北高中',NULL,'屏東縣',NULL),(209,'屏東縣崇華高中',NULL,'屏東縣',NULL),(210,'財團法人屏榮高中',NULL,'屏東縣',NULL),(211,'私立陸興高中',NULL,'屏東縣',NULL),(212,'私立美和高中',NULL,'屏東縣',NULL),(213,'縣立大同高中',NULL,'屏東縣',NULL),(214,'縣立枋寮高中',NULL,'屏東縣',NULL),(215,'縣立東港高中',NULL,'屏東縣',NULL),(216,'縣立來義高中',NULL,'屏東縣',NULL),(217,'國立臺東大學附屬體育高中',NULL,'臺東縣',NULL),(218,'國立臺東女中',NULL,'臺東縣',NULL),(219,'國立臺東高中',NULL,'臺東縣',NULL),(220,'臺東縣均一高中',NULL,'臺東縣',NULL),(221,'私立育仁高中',NULL,'臺東縣',NULL),(222,'縣立蘭嶼高中',NULL,'臺東縣',NULL),(223,'國立花蓮女中',NULL,'花蓮縣',NULL),(224,'國立花蓮高中',NULL,'花蓮縣',NULL),(225,'國立玉里高中',NULL,'花蓮縣',NULL),(226,'私立海星高中',NULL,'花蓮縣',NULL),(227,'私立四維高中',NULL,'花蓮縣',NULL),(228,'財團法人慈濟大學附中',NULL,'花蓮縣',NULL),(229,'花蓮縣立體育高中',NULL,'花蓮縣',NULL),(230,'縣立南平中學',NULL,'花蓮縣',NULL),(231,'國立馬公高中',NULL,'澎湖縣',NULL),(232,'國立基隆女中',NULL,'基隆市',NULL),(233,'國立基隆高中',NULL,'基隆市',NULL),(234,'私立二信高中',NULL,'基隆市',NULL),(235,'輔大聖心高中',NULL,'基隆市',NULL),(236,'市立中山高中',NULL,'基隆市',NULL),(237,'市立安樂高中',NULL,'基隆市',NULL),(238,'市立暖暖高中',NULL,'基隆市',NULL),(239,'市立八斗高中',NULL,'基隆市',NULL),(240,'國立竹科實驗高級中等學校',NULL,'新竹市',NULL),(241,'國立新竹女中',NULL,'新竹市',NULL),(242,'國立新竹高中',NULL,'新竹市',NULL),(243,'私立光復高中',NULL,'新竹市',NULL),(244,'私立曙光女中',NULL,'新竹市',NULL),(245,'私立磐石高中',NULL,'新竹市',NULL),(246,'私立世界高中',NULL,'新竹市',NULL),(247,'市立成德高中',NULL,'新竹市',NULL),(248,'市立香山高中',NULL,'新竹市',NULL),(249,'市立建功高中',NULL,'新竹市',NULL),(250,'私立東大附中',NULL,'臺中市',NULL),(251,'私立葳格高中',NULL,'臺中市',NULL),(252,'私立新民高中',NULL,'臺中市',NULL),(253,'私立宜寧高中',NULL,'臺中市',NULL),(254,'私立明德高中',NULL,'臺中市',NULL),(255,'私立衛道高中',NULL,'臺中市',NULL),(256,'私立曉明女中',NULL,'臺中市',NULL),(257,'私立嶺東高中',NULL,'臺中市',NULL),(258,'私立磊川華德福實驗教育學校',NULL,'臺中市',NULL),(259,'市立臺中女中',NULL,'臺中市',NULL),(260,'市立臺中一中',NULL,'臺中市',NULL),(261,'市立忠明高中',NULL,'臺中市',NULL),(262,'市立西苑高中',NULL,'臺中市',NULL),(263,'市立東山高中',NULL,'臺中市',NULL),(264,'市立惠文高中',NULL,'臺中市',NULL),(265,'市立臺中二中',NULL,'臺中市',NULL),(266,'市立文華高中',NULL,'臺中市',NULL),(267,'國立嘉義女中',NULL,'嘉義市',NULL),(268,'國立嘉義高中',NULL,'嘉義市',NULL),(269,'私立興華高中',NULL,'嘉義市',NULL),(270,'私立仁義高中',NULL,'嘉義市',NULL),(271,'私立嘉華高中',NULL,'嘉義市',NULL),(272,'私立輔仁高中',NULL,'嘉義市',NULL),(273,'私立宏仁女中',NULL,'嘉義市',NULL),(274,'私立立仁高中',NULL,'嘉義市',NULL),(275,'國立臺南二中',NULL,'臺南市',NULL),(276,'國立臺南一中',NULL,'臺南市',NULL),(277,'國立臺南女中',NULL,'臺南市',NULL),(278,'國立家齊高中',NULL,'臺南市',NULL),(279,'私立長榮高中',NULL,'臺南市',NULL),(280,'私立長榮女中',NULL,'臺南市',NULL),(281,'財團法人聖功女中',NULL,'臺南市',NULL),(282,'臺南市光華高中',NULL,'臺南市',NULL),(283,'私立六信高中',NULL,'臺南市',NULL),(284,'私立瀛海高中',NULL,'臺南市',NULL),(285,'臺南市崑山高中',NULL,'臺南市',NULL),(286,'私立德光高中',NULL,'臺南市',NULL),(287,'財團法人慈濟高中',NULL,'臺南市',NULL),(288,'市立南寧高中',NULL,'臺南市',NULL),(289,'市立土城高中',NULL,'臺南市',NULL),(290,'市立西松高中',NULL,'臺北市',NULL),(291,'市立中崙高中',NULL,'臺北市',NULL),(292,'臺北市私立協和祐德高級中學',NULL,'臺北市',NULL),(293,'市立松山高中',NULL,'臺北市',NULL),(294,'市立永春高中',NULL,'臺北市',NULL),(295,'國立師大附中',NULL,'臺北市',NULL),(296,'私立延平中學',NULL,'臺北市',NULL),(297,'私立金甌女中',NULL,'臺北市',NULL),(298,'私立復興實驗高中',NULL,'臺北市',NULL),(299,'市立和平高中',NULL,'臺北市',NULL),(300,'市立芳和實中',NULL,'臺北市',NULL),(301,'私立大同高中',NULL,'臺北市',NULL),(302,'市立中山女中',NULL,'臺北市',NULL),(303,'市立大同高中',NULL,'臺北市',NULL),(304,'市立大直高中',NULL,'臺北市',NULL),(305,'私立強恕中學',NULL,'臺北市',NULL),(306,'市立建國中學',NULL,'臺北市',NULL),(307,'市立成功中學',NULL,'臺北市',NULL),(308,'市立北一女中',NULL,'臺北市',NULL),(309,'臺北市靜修高中',NULL,'臺北市',NULL),(310,'市立明倫高中',NULL,'臺北市',NULL),(311,'市立成淵高中',NULL,'臺北市',NULL),(312,'市立華江高中',NULL,'臺北市',NULL),(313,'市立大理高中',NULL,'臺北市',NULL),(314,'國立政大附中',NULL,'臺北市',NULL),(315,'私立東山高中',NULL,'臺北市',NULL),(316,'私立滬江高中',NULL,'臺北市',NULL),(317,'私立大誠高中',NULL,'臺北市',NULL),(318,'私立再興中學',NULL,'臺北市',NULL),(319,'私立景文高中',NULL,'臺北市',NULL),(320,'臺北市靜心高中',NULL,'臺北市',NULL),(321,'市立景美女中',NULL,'臺北市',NULL),(322,'市立萬芳高中',NULL,'臺北市',NULL),(323,'市立數位實驗高中',NULL,'臺北市',NULL),(324,'市立南港高中',NULL,'臺北市',NULL),(325,'市立育成高中',NULL,'臺北市',NULL),(326,'私立文德女中',NULL,'臺北市',NULL),(327,'私立方濟中學',NULL,'臺北市',NULL),(328,'私立達人女中',NULL,'臺北市',NULL),(329,'市立內湖高中',NULL,'臺北市',NULL),(330,'市立麗山高中',NULL,'臺北市',NULL),(331,'市立南湖高中',NULL,'臺北市',NULL),(332,'私立泰北高中',NULL,'臺北市',NULL),(333,'私立衛理女中',NULL,'臺北市',NULL),(334,'私立華興中學',NULL,'臺北市',NULL),(335,'市立陽明高中',NULL,'臺北市',NULL),(336,'市立百齡高中',NULL,'臺北市',NULL),(337,'私立薇閣高中',NULL,'臺北市',NULL),(338,'臺北市幼華高中',NULL,'臺北市',NULL),(339,'臺北市私立奎山實驗高級中學',NULL,'臺北市',NULL),(340,'市立復興高中',NULL,'臺北市',NULL),(341,'市立中正高中',NULL,'臺北市',NULL),(342,'天主教明誠高中',NULL,'高雄市',NULL),(343,'私立大榮高中',NULL,'高雄市',NULL),(344,'市立鼓山高中',NULL,'高雄市',NULL),(345,'市立左營高中',NULL,'高雄市',NULL),(346,'市立新莊高中',NULL,'高雄市',NULL),(347,'國立中山大學附屬國光高中',NULL,'高雄市',NULL),(348,'市立中山高中',NULL,'高雄市',NULL),(349,'市立楠梓高中',NULL,'高雄市',NULL),(350,'私立立志高中',NULL,'高雄市',NULL),(351,'南海月光實驗學校',NULL,'高雄市',NULL),(352,'市立高雄中學',NULL,'高雄市',NULL),(353,'市立三民高中',NULL,'高雄市',NULL),(354,'市立新興高中',NULL,'高雄市',NULL),(355,'市立高雄女中',NULL,'高雄市',NULL),(356,'國立高師大附中',NULL,'高雄市',NULL),(357,'私立復華高中',NULL,'高雄市',NULL),(358,'天主教道明中學',NULL,'高雄市',NULL),(359,'市立中正高中',NULL,'高雄市',NULL),(360,'市立前鎮高中',NULL,'高雄市',NULL),(361,'市立瑞祥高中',NULL,'高雄市',NULL),(362,'市立小港高中',NULL,'高雄市',NULL),(363,'國立金門高中',NULL,'金門縣',NULL),(364,'國立馬祖高中',NULL,'連江縣',NULL),(365,'私立樹人家商',NULL,'新北市',NULL),(366,'私立復興商工',NULL,'新北市',NULL),(367,'私立南強工商',NULL,'新北市',NULL),(368,'私立穀保家商',NULL,'新北市',NULL),(369,'私立開明工商',NULL,'新北市',NULL),(370,'私立智光商工',NULL,'新北市',NULL),(371,'私立清傳高商',NULL,'新北市',NULL),(372,'私立能仁家商',NULL,'新北市',NULL),(373,'私立豫章工商',NULL,'新北市',NULL),(374,'私立莊敬工家',NULL,'新北市',NULL),(375,'私立中華商海',NULL,'新北市',NULL),(376,'市立瑞芳高工',NULL,'新北市',NULL),(377,'市立三重商工',NULL,'新北市',NULL),(378,'市立新北高工',NULL,'新北市',NULL),(379,'市立淡水商工',NULL,'新北市',NULL),(380,'市立鶯歌工商',NULL,'新北市',NULL),(381,'市立樟樹國際實中',NULL,'新北市',NULL),(382,'國立宜蘭高商',NULL,'宜蘭縣',NULL),(383,'國立羅東高商',NULL,'宜蘭縣',NULL),(384,'國立蘇澳海事',NULL,'宜蘭縣',NULL),(385,'國立羅東高工',NULL,'宜蘭縣',NULL),(386,'國立頭城家商',NULL,'宜蘭縣',NULL),(387,'國立北科大附屬桃園農工',NULL,'桃園市',NULL),(388,'私立成功工商',NULL,'桃園市',NULL),(389,'私立方曙商工',NULL,'桃園市',NULL),(390,'私立永平工商',NULL,'桃園市',NULL),(391,'市立中壢高商',NULL,'桃園市',NULL),(392,'市立中壢家商',NULL,'桃園市',NULL),(393,'私立內思高工',NULL,'新竹縣',NULL),(394,'國立大湖農工',NULL,'苗栗縣',NULL),(395,'國立苗栗農工',NULL,'苗栗縣',NULL),(396,'國立苗栗高商',NULL,'苗栗縣',NULL),(397,'私立中興商工',NULL,'苗栗縣',NULL),(398,'私立育民工家',NULL,'苗栗縣',NULL),(399,'私立賢德工商',NULL,'苗栗縣',NULL),(400,'私立龍德家商',NULL,'苗栗縣',NULL),(401,'市立豐原高商',NULL,'臺中市',NULL),(402,'市立大甲高工',NULL,'臺中市',NULL),(403,'市立東勢高工',NULL,'臺中市',NULL),(404,'市立沙鹿高工',NULL,'臺中市',NULL),(405,'市立霧峰農工',NULL,'臺中市',NULL),(406,'市立神岡高工',NULL,'臺中市',NULL),(407,'國立彰師附工',NULL,'彰化縣',NULL),(408,'國立永靖高工',NULL,'彰化縣',NULL),(409,'國立二林工商',NULL,'彰化縣',NULL),(410,'國立秀水高工',NULL,'彰化縣',NULL),(411,'國立彰化高商',NULL,'彰化縣',NULL),(412,'國立員林農工',NULL,'彰化縣',NULL),(413,'國立員林崇實高工',NULL,'彰化縣',NULL),(414,'國立員林家商',NULL,'彰化縣',NULL),(415,'國立北斗家商',NULL,'彰化縣',NULL),(416,'私立大慶商工',NULL,'彰化縣',NULL),(417,'私立達德商工',NULL,'彰化縣',NULL),(418,'國立仁愛高農',NULL,'南投縣',NULL),(419,'國立埔里高工',NULL,'南投縣',NULL),(420,'國立南投高商',NULL,'南投縣',NULL),(421,'國立草屯商工',NULL,'南投縣',NULL),(422,'國立水里商工',NULL,'南投縣',NULL),(423,'南投縣同德高中',NULL,'南投縣',NULL),(424,'國立虎尾農工',NULL,'雲林縣',NULL),(425,'國立西螺農工',NULL,'雲林縣',NULL),(426,'國立斗六家商',NULL,'雲林縣',NULL),(427,'國立北港農工',NULL,'雲林縣',NULL),(428,'國立土庫商工',NULL,'雲林縣',NULL),(429,'私立大成商工',NULL,'雲林縣',NULL),(430,'私立大德工商',NULL,'雲林縣',NULL),(431,'國立民雄農工',NULL,'嘉義縣',NULL),(432,'私立協志工商',NULL,'嘉義縣',NULL),(433,'私立萬能工商',NULL,'嘉義縣',NULL),(434,'國立新化高工',NULL,'臺南市',NULL),(435,'國立白河商工',NULL,'臺南市',NULL),(436,'國立北門農工',NULL,'臺南市',NULL),(437,'國立曾文家商',NULL,'臺南市',NULL),(438,'國立新營高工',NULL,'臺南市',NULL),(439,'國立玉井工商',NULL,'臺南市',NULL),(440,'國立臺南高工',NULL,'臺南市',NULL),(441,'國立曾文農工',NULL,'臺南市',NULL),(442,'私立陽明工商',NULL,'臺南市',NULL),(443,'私立育德工家',NULL,'臺南市',NULL),(444,'國立旗山農工',NULL,'高雄市',NULL),(445,'國立岡山農工',NULL,'高雄市',NULL),(446,'國立鳳山商工',NULL,'高雄市',NULL),(447,'私立中山工商',NULL,'高雄市',NULL),(448,'私立旗美商工',NULL,'高雄市',NULL),(449,'私立高英工商',NULL,'高雄市',NULL),(450,'私立華德工家',NULL,'高雄市',NULL),(451,'私立高苑工商',NULL,'高雄市',NULL),(452,'國立內埔農工',NULL,'屏東縣',NULL),(453,'國立屏東高工',NULL,'屏東縣',NULL),(454,'國立佳冬高農',NULL,'屏東縣',NULL),(455,'國立東港海事',NULL,'屏東縣',NULL),(456,'國立恆春工商',NULL,'屏東縣',NULL),(457,'私立民生家商',NULL,'屏東縣',NULL),(458,'私立日新工商',NULL,'屏東縣',NULL),(459,'國立關山工商',NULL,'臺東縣',NULL),(460,'國立臺東高商',NULL,'臺東縣',NULL),(461,'國立成功商水',NULL,'臺東縣',NULL),(462,'私立公東高工',NULL,'臺東縣',NULL),(463,'國立花蓮高農',NULL,'花蓮縣',NULL),(464,'國立花蓮高工',NULL,'花蓮縣',NULL),(465,'國立花蓮高商',NULL,'花蓮縣',NULL),(466,'國立光復商工',NULL,'花蓮縣',NULL),(467,'花蓮縣上騰工商',NULL,'花蓮縣',NULL),(468,'國立澎湖海事水產',NULL,'澎湖縣',NULL),(469,'國立海洋大學附屬基隆海事',NULL,'基隆市',NULL),(470,'國立基隆商工',NULL,'基隆市',NULL),(471,'私立光隆家商',NULL,'基隆市',NULL),(472,'私立培德工家',NULL,'基隆市',NULL),(473,'國立新竹高商',NULL,'新竹市',NULL),(474,'國立新竹高工',NULL,'新竹市',NULL),(475,'國立興大附農',NULL,'臺中市',NULL),(476,'財團法人光華高工',NULL,'臺中市',NULL),(477,'市立臺中家商',NULL,'臺中市',NULL),(478,'市立臺中高工',NULL,'臺中市',NULL),(479,'國立華南高商',NULL,'嘉義市',NULL),(480,'國立嘉義高工',NULL,'嘉義市',NULL),(481,'國立嘉義高商',NULL,'嘉義市',NULL),(482,'國立嘉義家職',NULL,'嘉義市',NULL),(483,'私立東吳工家',NULL,'嘉義市',NULL),(484,'國立臺南高商',NULL,'臺南市',NULL),(485,'國立臺南海事',NULL,'臺南市',NULL),(486,'私立南英商工',NULL,'臺南市',NULL),(487,'私立亞洲餐旅',NULL,'臺南市',NULL),(488,'私立慈幼工商',NULL,'臺南市',NULL),(489,'臺北市育達高中',NULL,'臺北市',NULL),(490,'市立松山家商',NULL,'臺北市',NULL),(491,'市立松山工農',NULL,'臺北市',NULL),(492,'私立東方工商',NULL,'臺北市',NULL),(493,'私立喬治工商',NULL,'臺北市',NULL),(494,'私立開平餐飲',NULL,'臺北市',NULL),(495,'市立大安高工',NULL,'臺北市',NULL),(496,'私立稻江護家',NULL,'臺北市',NULL),(497,'臺北市開南高中',NULL,'臺北市',NULL),(498,'私立稻江高商',NULL,'臺北市',NULL),(499,'市立木柵高工',NULL,'臺北市',NULL),(500,'市立南港高工',NULL,'臺北市',NULL),(501,'市立內湖高工',NULL,'臺北市',NULL),(502,'私立華岡藝校',NULL,'臺北市',NULL),(503,'市立士林高商',NULL,'臺北市',NULL),(504,'私立惇敍工商',NULL,'臺北市',NULL),(505,'私立中華藝校',NULL,'高雄市',NULL),(506,'市立海青工商',NULL,'高雄市',NULL),(507,'市立三民家商',NULL,'高雄市',NULL),(508,'私立樹德家商',NULL,'高雄市',NULL),(509,'市立高雄高工',NULL,'高雄市',NULL),(510,'市立高雄高商',NULL,'高雄市',NULL),(511,'私立國際商工',NULL,'高雄市',NULL),(512,'私立三信家商',NULL,'高雄市',NULL),(513,'市立中正高工',NULL,'高雄市',NULL),(514,'國立高餐大附屬餐旅中學',NULL,'高雄市',NULL),(515,'國立金門農工',NULL,'金門縣',NULL),(516,'私立南華高中進修學校',NULL,'臺北市',NULL),(517,'私立志仁中學進修學校',NULL,'臺北市',NULL),(518,'私立光華高商進修學校',NULL,'新北市',NULL),(519,'國立成功大學附設高工進修學校',NULL,'臺南市',NULL),(520,'國立和美實驗學校',NULL,'彰化縣',NULL),(521,'市立楠梓特殊學校',NULL,'高雄市',NULL),(522,'私立宏德高商進修學校',NULL,'桃園市',NULL),(523,'國立二林工商進校分校',NULL,'彰化縣',NULL),(524,'私立樹德高中進修學校',NULL,'臺南市',NULL),(525,'私立正德高中進修學校',NULL,'花蓮縣',NULL),(526,'敦品中學',NULL,'桃園市',NULL),(527,'誠正中學',NULL,'新竹縣',NULL),(528,'勵志中學',NULL,'彰化縣',NULL);
/*!40000 ALTER TABLE `schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'校規'),(2,'法規');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-09 11:16:19
