
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_gps
-- ----------------------------
DROP TABLE IF EXISTS `t_gps`;
CREATE TABLE `t_gps` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vin` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lng` double NOT NULL,
  `lat` double NOT NULL,
  `direction` float DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for t_vehicle
-- ----------------------------
DROP TABLE IF EXISTS `t_vehicle`;
CREATE TABLE `t_vehicle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vin` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `plate_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
