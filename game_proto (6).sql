-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 27, 2015 at 05:35 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `game_proto`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int(11) NOT NULL,
  `event_name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_name`) VALUES
(1, 'A weak monster appears.'),
(2, 'You find something nice in a pile of rubble.'),
(3, 'A monster appears'),
(4, 'You find something shiny'),
(5, 'A strong monster appears. You might want to run...'),
(6, 'Oooohhh. Now that looks nice...'),
(7, 'Aarggghh! RUN AWAY!!!'),
(8, 'OMG! Gimme that now!!');

-- --------------------------------------------------------

--
-- Table structure for table `event_functions`
--

CREATE TABLE IF NOT EXISTS `event_functions` (
  `event_function_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `function_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_functions`
--

INSERT INTO `event_functions` (`event_function_id`, `event_id`, `function_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8);

-- --------------------------------------------------------

--
-- Table structure for table `event_modifiers`
--

CREATE TABLE IF NOT EXISTS `event_modifiers` (
  `event_modifier_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `event_trigger` varchar(50) NOT NULL,
  `effect_name` varchar(50) NOT NULL,
  `effect` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event_modifiers`
--

INSERT INTO `event_modifiers` (`event_modifier_id`, `event_id`, `event_trigger`, `effect_name`, `effect`) VALUES
(1, 1, 'monster', 't1monster', -5),
(2, 2, 'loot', 't1monster', 10),
(3, 3, 'monster', 't1monster', 5),
(4, 4, 'loot', 't1monster', 0),
(5, 5, 'monster', 't1monster', 10),
(6, 6, 'loot', 't1monster', 0),
(7, 7, 'monster', 't1monster', 0),
(8, 8, 'loot', 't1monster', 0),
(9, 9, 'monster', 't1monster', 0),
(10, 10, 'loot', 't1monster', 0),
(11, 1, 'monster', 't2monster', 10),
(12, 2, 'loot', 't2monster', 10),
(13, 3, 'monster', 't2monster', 10),
(14, 4, 'loot', 't2monster', 5),
(15, 5, 'monster', 't2monster', 10),
(16, 6, 'loot', 't2monster', 0),
(17, 7, 'monster', 't2monster', 0),
(18, 8, 'loot', 't2monster', 0),
(19, 9, 'monster', 't2monster', 0),
(20, 10, 'loot', 't2monster', 0),
(21, 1, 'monster', 't3monster', -5),
(22, 2, 'loot', 't3monster', 5),
(23, 3, 'monster', 't3monster', 10),
(24, 4, 'loot', 't3monster', 5),
(25, 5, 'monster', 't3monster', 10),
(26, 6, 'loot', 't3monster', 10),
(27, 7, 'monster', 't3monster', 5),
(28, 8, 'loot', 't3monster', 5),
(29, 9, 'monster', 't3monster', 0),
(30, 10, 'loot', 't3monster', 0),
(31, 1, 'monster', 't4monster', -10),
(32, 2, 'loot', 't4monster', -10),
(33, 3, 'monster', 't4monster', 5),
(34, 4, 'loot', 't4monster', -5),
(35, 5, 'monster', 't4monster', 5),
(36, 6, 'loot', 't4monster', 0),
(37, 7, 'monster', 't4monster', 10),
(38, 8, 'loot', 't4monster', 5),
(39, 9, 'monster', 't4monster', 5),
(40, 10, 'loot', 't4monster', 5),
(41, 1, 'monster', 't5monster', -20),
(42, 2, 'loot', 't5monster', -15),
(43, 3, 'monster', 't5monster', -15),
(44, 4, 'loot', 't5monster', -10),
(45, 5, 'monster', 't5monster', -5),
(46, 6, 'loot', 't5monster', -5),
(47, 7, 'monster', 't5monster', 5),
(48, 8, 'loot', 't5monster', 5),
(49, 9, 'monster', 't5monster', 10),
(50, 10, 'loot', 't5monster', 15),
(51, 1, 'monster', 't1loot', 15),
(52, 2, 'loot', 't1loot', -5),
(53, 3, 'monster', 't1loot', 10),
(54, 4, 'loot', 't1loot', -5),
(55, 5, 'monster', 't1loot', 5),
(56, 6, 'loot', 't1loot', 0),
(57, 7, 'monster', 't1loot', 0),
(58, 8, 'loot', 't1loot', 0),
(59, 9, 'monster', 't1loot', 0),
(60, 10, 'loot', 't1loot', 0),
(61, 1, 'monster', 't2loot', 10),
(62, 2, 'loot', 't2loot', 5),
(63, 3, 'monster', 't2loot', 10),
(64, 4, 'loot', 't2loot', -10),
(65, 5, 'monster', 't2loot', 10),
(66, 6, 'loot', 't2loot', -5),
(67, 7, 'monster', 't2loot', 0),
(68, 8, 'loot', 't2loot', 0),
(69, 9, 'monster', 't2loot', 0),
(70, 10, 'loot', 't2loot', 0),
(71, 1, 'monster', 't3loot', 5),
(72, 2, 'loot', 't3loot', 5),
(73, 3, 'monster', 't3loot', 10),
(74, 4, 'loot', 't3loot', 5),
(75, 5, 'monster', 't3loot', 10),
(76, 6, 'loot', 't3loot', -5),
(77, 7, 'monster', 't3loot', 5),
(78, 8, 'loot', 't3loot', -5),
(79, 9, 'monster', 't3loot', 0),
(80, 10, 'loot', 't3loot', 0),
(81, 1, 'monster', 't4loot', 0),
(82, 2, 'loot', 't4loot', 0),
(83, 3, 'monster', 't4loot', 0),
(84, 4, 'loot', 't4loot', 0),
(85, 5, 'monster', 't4loot', 10),
(86, 6, 'loot', 't4loot', -5),
(87, 7, 'monster', 't4loot', 10),
(88, 8, 'loot', 't4loot', -10),
(89, 9, 'monster', 't4loot', 10),
(90, 10, 'loot', 't4loot', -5),
(91, 1, 'monster', 't5loot', 0),
(92, 2, 'loot', 't5loot', 0),
(93, 3, 'monster', 't5loot', 0),
(94, 4, 'loot', 't5loot', 0),
(95, 5, 'monster', 't5loot', 0),
(96, 6, 'loot', 't5loot', 0),
(97, 7, 'monster', 't5loot', 15),
(98, 8, 'loot', 't5loot', -10),
(99, 9, 'monster', 't5loot', 15),
(100, 10, 'loot', 't5loot', -15);

-- --------------------------------------------------------

--
-- Table structure for table `event_reward`
--

CREATE TABLE IF NOT EXISTS `event_reward` (
  `event_reward_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `reward_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `functions`
--

CREATE TABLE IF NOT EXISTS `functions` (
  `function_id` int(11) NOT NULL,
  `function_type` varchar(50) NOT NULL,
  `function_name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `functions`
--

INSERT INTO `functions` (`function_id`, `function_type`, `function_name`) VALUES
(1, 'monster', 'addMonsterT1'),
(2, 'reward', 'addRewardT1'),
(3, 'monster', 'addMonsterT2'),
(4, 'reward', 'addRewardT2'),
(5, 'monster', 'addMonsterT3'),
(6, 'reward', 'addRewardT3'),
(7, 'monster', 'addMonsterT4'),
(8, 'reward', 'addRewardT4');

-- --------------------------------------------------------

--
-- Table structure for table `map`
--

CREATE TABLE IF NOT EXISTS `map` (
  `map_id` int(11) NOT NULL,
  `map_structure` varchar(5000) NOT NULL,
  `map_start` varchar(250) NOT NULL,
  `map_end` varchar(250) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `map`
--

INSERT INTO `map` (`map_id`, `map_structure`, `map_start`, `map_end`) VALUES
(2, 'a:11:{i:0;i:19;i:1;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}i:2;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}i:3;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}i:4;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}i:5;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}i:6;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}i:7;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}i:8;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}i:9;a:15:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:0;i:9;i:0;i:10;i:0;i:11;i:0;i:12;i:0;i:13;i:0;i:14;i:3;}s:5:"width";i:19;}', 'a:2:{s:9:"start_row";s:1:"8";s:10:"start_cell";s:1:"1";}', 'a:2:{s:7:"end_row";s:1:"1";s:8:"end_cell";s:2:"19";}'),
(3, 'a:14:{i:0;i:13;i:1;i:13;i:2;i:13;i:3;a:9:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:3;}i:4;i:13;i:5;a:9:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:3;}i:6;i:13;i:7;a:9:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:3;}i:8;i:13;i:9;a:9:{i:0;i:3;i:1;i:0;i:2;i:0;i:3;i:0;i:4;i:0;i:5;i:0;i:6;i:0;i:7;i:0;i:8;i:3;}i:10;i:13;i:11;i:13;i:12;i:13;s:5:"width";i:13;}', 'a:2:{s:9:"start_row";s:2:"13";s:10:"start_cell";s:1:"1";}', 'a:2:{s:7:"end_row";s:1:"7";s:8:"end_cell";s:1:"7";}'),
(4, 'a:10:{i:0;i:9;i:1;a:3:{i:0;i:4;i:1;i:0;i:2;i:4;}i:2;i:9;i:3;a:5:{i:0;i:3;i:1;i:0;i:2;i:1;i:3;i:0;i:4;i:3;}i:4;a:5:{i:0;i:1;i:1;i:0;i:2;i:5;i:3;i:0;i:4;i:1;}i:5;a:5:{i:0;i:3;i:1;i:0;i:2;i:1;i:3;i:0;i:4;i:3;}i:6;i:9;i:7;a:3:{i:0;i:4;i:1;i:0;i:2;i:4;}i:8;i:9;s:5:"width";i:9;}', 'a:2:{s:9:"start_row";s:1:"5";s:10:"start_cell";s:1:"5";}', 'a:2:{s:7:"end_row";s:1:"9";s:8:"end_cell";s:1:"5";}');

-- --------------------------------------------------------

--
-- Table structure for table `map_terrain`
--

CREATE TABLE IF NOT EXISTS `map_terrain` (
  `map_terrain_id` int(11) NOT NULL,
  `map_id` int(11) NOT NULL,
  `terrain_id` int(11) NOT NULL,
  `map_row` int(11) NOT NULL,
  `map_cell` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=476 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `map_terrain`
--

INSERT INTO `map_terrain` (`map_terrain_id`, `map_id`, `terrain_id`, `map_row`, `map_cell`) VALUES
(122, 2, 7, 1, 1),
(123, 2, 7, 1, 2),
(124, 2, 8, 1, 3),
(125, 2, 8, 1, 4),
(126, 2, 8, 1, 5),
(127, 2, 7, 1, 6),
(128, 2, 7, 1, 7),
(129, 2, 7, 1, 8),
(130, 2, 7, 1, 9),
(131, 2, 7, 1, 10),
(132, 2, 2, 1, 11),
(133, 2, 2, 1, 12),
(134, 2, 2, 1, 13),
(135, 2, 2, 1, 14),
(136, 2, 7, 1, 15),
(137, 2, 7, 1, 16),
(138, 2, 7, 1, 17),
(139, 2, 7, 1, 18),
(140, 2, 7, 1, 19),
(141, 2, 7, 2, 1),
(142, 2, 7, 2, 2),
(143, 2, 8, 2, 3),
(144, 2, 7, 2, 17),
(145, 2, 7, 2, 18),
(146, 2, 7, 2, 19),
(147, 2, 1, 3, 1),
(148, 2, 7, 3, 2),
(149, 2, 8, 3, 3),
(150, 2, 8, 3, 17),
(151, 2, 8, 3, 18),
(152, 2, 7, 3, 19),
(153, 2, 1, 4, 1),
(154, 2, 7, 4, 2),
(155, 2, 7, 4, 3),
(156, 2, 7, 4, 17),
(157, 2, 8, 4, 18),
(158, 2, 7, 4, 19),
(159, 2, 7, 5, 1),
(160, 2, 7, 5, 2),
(161, 2, 7, 5, 3),
(162, 2, 3, 5, 17),
(163, 2, 8, 5, 18),
(164, 2, 3, 5, 19),
(165, 2, 7, 6, 1),
(166, 2, 7, 6, 2),
(167, 2, 8, 6, 3),
(168, 2, 8, 6, 17),
(169, 2, 8, 6, 18),
(170, 2, 3, 6, 19),
(171, 2, 7, 7, 1),
(172, 2, 7, 7, 2),
(173, 2, 8, 7, 3),
(174, 2, 3, 7, 17),
(175, 2, 8, 7, 18),
(176, 2, 3, 7, 19),
(177, 2, 8, 8, 1),
(178, 2, 8, 8, 2),
(179, 2, 8, 8, 3),
(180, 2, 3, 8, 17),
(181, 2, 8, 8, 18),
(182, 2, 8, 8, 19),
(183, 2, 3, 9, 1),
(184, 2, 3, 9, 2),
(185, 2, 3, 9, 3),
(186, 2, 3, 9, 17),
(187, 2, 2, 9, 18),
(188, 2, 2, 9, 19),
(189, 2, 3, 10, 1),
(190, 2, 3, 10, 2),
(191, 2, 2, 10, 3),
(192, 2, 2, 10, 17),
(193, 2, 2, 10, 18),
(194, 2, 2, 10, 19),
(335, 3, 2, 1, 1),
(336, 3, 2, 1, 2),
(337, 3, 2, 1, 3),
(338, 3, 6, 1, 4),
(339, 3, 6, 1, 5),
(340, 3, 6, 1, 6),
(341, 3, 6, 1, 7),
(342, 3, 5, 1, 8),
(343, 3, 6, 1, 9),
(344, 3, 6, 1, 10),
(345, 3, 4, 1, 11),
(346, 3, 4, 1, 12),
(347, 3, 4, 1, 13),
(348, 3, 4, 2, 1),
(349, 3, 4, 2, 2),
(350, 3, 4, 2, 3),
(351, 3, 4, 2, 4),
(352, 3, 6, 2, 5),
(353, 3, 6, 2, 6),
(354, 3, 6, 2, 7),
(355, 3, 6, 2, 8),
(356, 3, 6, 2, 9),
(357, 3, 2, 2, 10),
(358, 3, 4, 2, 11),
(359, 3, 4, 2, 12),
(360, 3, 4, 2, 13),
(361, 3, 4, 3, 1),
(362, 3, 3, 3, 2),
(363, 3, 4, 3, 3),
(364, 3, 2, 3, 4),
(365, 3, 2, 3, 5),
(366, 3, 2, 3, 6),
(367, 3, 2, 3, 7),
(368, 3, 6, 3, 8),
(369, 3, 2, 3, 9),
(370, 3, 2, 3, 10),
(371, 3, 4, 3, 11),
(372, 3, 4, 3, 12),
(373, 3, 4, 3, 13),
(374, 3, 4, 4, 1),
(375, 3, 4, 4, 2),
(376, 3, 4, 4, 3),
(377, 3, 4, 4, 11),
(378, 3, 4, 4, 12),
(379, 3, 3, 4, 13),
(380, 3, 4, 5, 1),
(381, 3, 4, 5, 2),
(382, 3, 4, 5, 3),
(383, 3, 2, 5, 4),
(384, 3, 2, 5, 5),
(385, 3, 2, 5, 6),
(386, 3, 8, 5, 7),
(387, 3, 2, 5, 8),
(388, 3, 2, 5, 9),
(389, 3, 4, 5, 10),
(390, 3, 4, 5, 11),
(391, 3, 4, 5, 12),
(392, 3, 4, 5, 13),
(393, 3, 4, 6, 1),
(394, 3, 2, 6, 2),
(395, 3, 2, 6, 3),
(396, 3, 4, 6, 11),
(397, 3, 4, 6, 12),
(398, 3, 4, 6, 13),
(399, 3, 2, 7, 1),
(400, 3, 2, 7, 2),
(401, 3, 2, 7, 3),
(402, 3, 1, 7, 4),
(403, 3, 1, 7, 5),
(404, 3, 8, 7, 6),
(405, 3, 8, 7, 7),
(406, 3, 8, 7, 8),
(407, 3, 2, 7, 9),
(408, 3, 4, 7, 10),
(409, 3, 4, 7, 11),
(410, 3, 4, 7, 12),
(411, 3, 4, 7, 13),
(412, 3, 2, 8, 1),
(413, 3, 3, 8, 2),
(414, 3, 2, 8, 3),
(415, 3, 3, 8, 11),
(416, 3, 3, 8, 12),
(417, 3, 4, 8, 13),
(418, 3, 1, 9, 1),
(419, 3, 1, 9, 2),
(420, 3, 3, 9, 3),
(421, 3, 3, 9, 4),
(422, 3, 1, 9, 5),
(423, 3, 7, 9, 6),
(424, 3, 8, 9, 7),
(425, 3, 7, 9, 8),
(426, 3, 1, 9, 9),
(427, 3, 2, 9, 10),
(428, 3, 4, 9, 11),
(429, 3, 4, 9, 12),
(430, 3, 4, 9, 13),
(431, 3, 7, 10, 1),
(432, 3, 1, 10, 2),
(433, 3, 3, 10, 3),
(434, 3, 2, 10, 11),
(435, 3, 4, 10, 12),
(436, 3, 4, 10, 13),
(437, 3, 7, 11, 1),
(438, 3, 7, 11, 2),
(439, 3, 3, 11, 3),
(440, 3, 3, 11, 4),
(441, 3, 1, 11, 5),
(442, 3, 7, 11, 6),
(443, 3, 7, 11, 7),
(444, 3, 7, 11, 8),
(445, 3, 7, 11, 9),
(446, 3, 1, 11, 10),
(447, 3, 1, 11, 11),
(448, 3, 2, 11, 12),
(449, 3, 2, 11, 13),
(450, 3, 7, 12, 1),
(451, 3, 7, 12, 2),
(452, 3, 7, 12, 3),
(453, 3, 7, 12, 4),
(454, 3, 1, 12, 5),
(455, 3, 1, 12, 6),
(456, 3, 7, 12, 7),
(457, 3, 1, 12, 8),
(458, 3, 7, 12, 9),
(459, 3, 7, 12, 10),
(460, 3, 1, 12, 11),
(461, 3, 1, 12, 12),
(462, 3, 1, 12, 13),
(463, 3, 7, 13, 1),
(464, 3, 7, 13, 3),
(465, 3, 7, 13, 4),
(466, 3, 7, 13, 5),
(467, 3, 1, 13, 6),
(468, 3, 1, 13, 7),
(469, 3, 7, 13, 8),
(470, 3, 7, 13, 9),
(471, 3, 7, 13, 10),
(472, 3, 1, 13, 11),
(473, 3, 1, 13, 12),
(474, 3, 1, 13, 13),
(475, 3, 7, 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `monsters`
--

CREATE TABLE IF NOT EXISTS `monsters` (
  `monster_id` int(11) NOT NULL,
  `monster_tier` varchar(3) NOT NULL,
  `monster_name` varchar(100) NOT NULL,
  `monster_image` varchar(500) NOT NULL,
  `monster_health` int(11) NOT NULL,
  `monster_defence` int(11) NOT NULL,
  `monster_attack` int(11) NOT NULL,
  `monster_chance` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monsters`
--

INSERT INTO `monsters` (`monster_id`, `monster_tier`, `monster_name`, `monster_image`, `monster_health`, `monster_defence`, `monster_attack`, `monster_chance`) VALUES
(1, '1', 'Goblin', '', 4, 1, 1, 30),
(2, '1', 'Rat', '', 3, 0, 1, 10),
(3, '1', 'Robber', '', 5, 1, 2, 15),
(4, '1', 'Wolf', '', 5, 1, 2, 5),
(5, '1', 'Bandito', '', 6, 0, 2, 1),
(6, '1', 'Slighly Scary Bird', '', 5, 0, 2, 9),
(7, '1', 'Bear', '', 8, 3, 2, 10),
(8, '1', 'Big Icky Spider', '', 5, 0, 3, 10),
(9, '1', 'Dazed Traveller', '', 3, 0, 1, 5),
(10, '1', 'Angry Cow', '', 5, 1, 1, 5),
(11, '2', 'Highwayman', '', 6, 3, 3, 10),
(12, '2', 'Mountain Lion', '', 7, 2, 4, 5),
(13, '2', 'Huge ''n'' Ugly Spider', '', 9, 4, 3, 10),
(14, '2', 'Ogre Dunce', '', 12, 0, 4, 5),
(15, '2', 'Vexed Bear', '', 8, 4, 3, 10),
(16, '2', 'Lost Soldier', '', 8, 3, 3, 10),
(17, '2', 'Ravenous Honey Badger', '', 5, 6, 4, 5),
(18, '2', 'Big Bad Wolf', '', 7, 2, 4, 10),
(19, '2', 'Harpy', '', 7, 2, 3, 15),
(20, '2', 'Reservoir Gobs', '', 12, 2, 6, 5),
(21, '2', 'Loot Mad Adventurer', '', 7, 5, 4, 5),
(22, '2', 'One Armed Giant', '', 16, 5, 4, 5),
(23, '2', 'Terrifying Bird', '', 6, 6, 6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE IF NOT EXISTS `rewards` (
  `reward_id` int(11) NOT NULL,
  `reward_chance` int(11) NOT NULL,
  `reward` varchar(1000) NOT NULL,
  `reward_tier` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`reward_id`, `reward_chance`, `reward`, `reward_tier`) VALUES
(1, 1, 'a:4:{s:4:"name";s:21:"Drop of Kingly Potion";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:1;s:7:"defence";i:1;s:4:"move";i:1;}s:5:"image";s:25:"drop_of_kingly_potion.png";}', 1),
(2, 2, 'a:4:{s:4:"name";s:25:"Potion of the Tiny Nipper";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:1;s:7:"defence";i:0;s:4:"move";i:1;}s:5:"image";s:29:"potion_of_the_tiny_nipper.png";}', 1),
(3, 2, 'a:4:{s:4:"name";s:23:"Potion of the Oblivious";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:2;s:6:"attack";i:0;s:7:"defence";i:1;s:4:"move";i:0;}s:5:"image";s:27:"potion_of_the_oblivious.png";}', 1),
(4, 3, 'a:4:{s:4:"name";s:20:"Measly Health Potion";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:3;s:6:"attack";i:0;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:24:"measly_health_potion.png";}', 1),
(5, 3, 'a:4:{s:4:"name";s:20:"Measly Attack Potion";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:1;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:24:"measly_attack_potion.png";}', 1),
(6, 3, 'a:4:{s:4:"name";s:21:"Measly Defence Potion";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:1;s:4:"move";i:0;}s:5:"image";s:25:"measly_defence_potion.png";}', 1),
(7, 3, 'a:4:{s:4:"name";s:19:"Measly Speed Potion";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:0;s:4:"move";i:1;}s:5:"image";s:23:"measly_speed_potion.png";}', 1),
(8, 3, 'a:4:{s:4:"name";s:15:"An Actual Sword";s:4:"type";s:6:"weapon";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:2;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:19:"an_actual_sword.png";}', 1),
(9, 3, 'a:4:{s:4:"name";s:16:"An Actual Shield";s:4:"type";s:6:"shield";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:2;s:4:"move";i:0;}s:5:"image";s:20:"an_actual_shield.png";}', 1),
(10, 3, 'a:4:{s:4:"name";s:16:"An Actual Helmet";s:4:"type";s:6:"helmet";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:2;s:4:"move";i:0;}s:5:"image";s:20:"an_actual_helmet.png";}', 1),
(11, 3, 'a:4:{s:4:"name";s:18:"Some Actual Armour";s:4:"type";s:6:"armour";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:2;s:4:"move";i:0;}s:5:"image";s:22:"some_actual_armour.png";}', 1),
(12, 6, 'a:4:{s:4:"name";s:24:"Suspicious Wooden Shield";s:4:"type";s:6:"shield";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:1;s:4:"move";i:0;}s:5:"image";s:28:"suspicious_wooden_shield.png";}', 1),
(13, 6, 'a:4:{s:4:"name";s:24:"Suspicious Wooden Armour";s:4:"type";s:6:"armour";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:1;s:4:"move";i:0;}s:5:"image";s:28:"suspicious_wooden_armour.png";}', 1),
(14, 6, 'a:4:{s:4:"name";s:24:"Suspicious Wooden Helmet";s:4:"type";s:6:"helmet";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:1;s:4:"move";i:0;}s:5:"image";s:28:"suspicious_wooden_helmet.png";}', 1),
(15, 6, 'a:4:{s:4:"name";s:23:"Suspicious Wooden Sword";s:4:"type";s:6:"weapon";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:1;s:7:"defence";i:1;s:4:"move";i:0;}s:5:"image";s:27:"suspicious_wooden_sword.png";}', 1),
(16, 1, 'a:4:{s:4:"name";s:12:"Cackling Axe";s:4:"type";s:6:"weapon";s:5:"stats";a:4:{s:6:"health";i:-3;s:6:"attack";i:3;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:16:"cackling_axe.png";}', 1),
(17, 1, 'a:4:{s:4:"name";s:17:"Sniggering Armour";s:4:"type";s:6:"armour";s:5:"stats";a:4:{s:6:"health";i:4;s:6:"attack";i:0;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:21:"sniggering_armour.png";}', 1),
(18, 1, 'a:4:{s:4:"name";s:13:"Helm of Doubt";s:4:"type";s:6:"helmet";s:5:"stats";a:4:{s:6:"health";i:2;s:6:"attack";i:0;s:7:"defence";i:2;s:4:"move";i:-1;}s:5:"image";s:17:"helm_of_doubt.png";}', 1),
(19, 1, 'a:4:{s:4:"name";s:12:"Rowdy Shield";s:4:"type";s:6:"shield";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:1;s:7:"defence";i:2;s:4:"move";i:0;}s:5:"image";s:16:"rowdy_shield.png";}', 1),
(20, 10, 'a:4:{s:4:"name";s:14:"Vial of Health";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:1;s:6:"attack";i:0;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:18:"vial_of_health.png";}', 1),
(21, 1, 'a:4:{s:4:"name";s:10:"Pole Vault";s:4:"type";s:6:"weapon";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:1;s:7:"defence";i:0;s:4:"move";i:2;}s:5:"image";s:14:"pole_vault.png";}', 1),
(22, 1, 'a:4:{s:4:"name";s:22:"Dregs of Kingly Potion";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:1;s:6:"attack";i:2;s:7:"defence";i:2;s:4:"move";i:2;}s:5:"image";s:26:"dregs_of_kingly_potion.png";}', 2),
(23, 2, 'a:4:{s:4:"name";s:16:"Potion of a Rock";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:4;s:6:"attack";i:0;s:7:"defence";i:2;s:4:"move";i:-1;}s:5:"image";s:20:"potion_of_a_rock.png";}', 2),
(24, 2, 'a:4:{s:4:"name";s:23:"Potion of a Jagged Rock";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:-2;s:6:"attack";i:2;s:7:"defence";i:1;s:4:"move";i:0;}s:5:"image";s:27:"potion_of_a_jagged_rock.png";}', 2),
(25, 3, 'a:4:{s:4:"name";s:13:"Health Potion";s:4:"type";s:8:"modifier";s:5:"stats";a:4:{s:6:"health";i:4;s:6:"attack";i:0;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:17:"health_potion.png";}', 2),
(26, 6, 'a:4:{s:4:"name";s:15:"An Actual Sword";s:4:"type";s:6:"weapon";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:2;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:19:"an_actual_sword.png";}', 2),
(27, 6, 'a:4:{s:4:"name";s:16:"An Actual Shield";s:4:"type";s:6:"shield";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:2;s:4:"move";i:0;}s:5:"image";s:20:"an_actual_shield.png";}', 2),
(28, 6, 'a:4:{s:4:"name";s:16:"An Actual Helmet";s:4:"type";s:6:"helmet";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:2;s:4:"move";i:0;}s:5:"image";s:20:"an_actual_helmet.png";}', 2),
(29, 6, 'a:4:{s:4:"name";s:18:"Some Actual Armour";s:4:"type";s:6:"armour";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:2;s:4:"move";i:0;}s:5:"image";s:22:"some_actual_armour.png";}', 2),
(30, 3, 'a:4:{s:4:"name";s:18:"Half Decent Armour";s:4:"type";s:6:"armour";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:3;s:4:"move";i:0;}s:5:"image";s:22:"half_decent_armour.png";}', 2),
(31, 3, 'a:4:{s:4:"name";s:18:"Half Decent Helmet";s:4:"type";s:6:"helmet";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:3;s:4:"move";i:0;}s:5:"image";s:22:"half_decent_helmet.png";}', 2),
(32, 3, 'a:4:{s:4:"name";s:18:"Half Decent Shield";s:4:"type";s:6:"shield";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:0;s:7:"defence";i:3;s:4:"move";i:0;}s:5:"image";s:22:"half_decent_shield.png";}', 2),
(33, 3, 'a:4:{s:4:"name";s:17:"Half Decent Sword";s:4:"type";s:6:"weapon";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:3;s:7:"defence";i:0;s:4:"move";i:0;}s:5:"image";s:21:"half_decent_sword.png";}', 2),
(34, 1, 'a:4:{s:4:"name";s:22:"Seriously Spiky Armour";s:4:"type";s:6:"armour";s:5:"stats";a:4:{s:6:"health";i:-4;s:6:"attack";i:2;s:7:"defence";i:3;s:4:"move";i:-1;}s:5:"image";s:26:"seriously_spiky_armour.png";}', 2),
(35, 1, 'a:4:{s:4:"name";s:12:"Jones Helmet";s:4:"type";s:6:"helmet";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:2;s:7:"defence";i:3;s:4:"move";i:1;}s:5:"image";s:16:"jones_helmet.png";}', 2),
(36, 1, 'a:4:{s:4:"name";s:13:"Claudes Sword";s:4:"type";s:6:"weapon";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:5;s:7:"defence";i:0;s:4:"move";i:-1;}s:5:"image";s:17:"claudes_sword.png";}', 2),
(37, 1, 'a:4:{s:4:"name";s:19:"Shield of Major Tom";s:4:"type";s:6:"shield";s:5:"stats";a:4:{s:6:"health";i:0;s:6:"attack";i:1;s:7:"defence";i:4;s:4:"move";i:1;}s:5:"image";s:23:"shield_of_major_tom.png";}', 2),
(38, 1, 'a:4:{s:4:"name";s:19:"Spooky Scary Sallet";s:4:"type";s:6:"helmet";s:5:"stats";a:4:{s:6:"health";i:-5;s:6:"attack";i:0;s:7:"defence";i:6;s:4:"move";i:2;}s:5:"image";s:23:"spooky_scary_sallet.png";}', 2);

-- --------------------------------------------------------

--
-- Table structure for table `terrain_event`
--

CREATE TABLE IF NOT EXISTS `terrain_event` (
  `terrain_event_id` int(11) NOT NULL,
  `terrain_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `event_chance` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `terrain_event`
--

INSERT INTO `terrain_event` (`terrain_event_id`, `terrain_id`, `event_id`, `event_chance`) VALUES
(1, 8, 1, 10),
(2, 7, 1, 15),
(3, 8, 2, 5),
(4, 7, 2, 10),
(5, 1, 1, 10),
(6, 2, 1, 15),
(7, 3, 7, 10),
(8, 4, 1, 20),
(9, 5, 1, 0),
(10, 6, 1, 5),
(11, 1, 3, 5),
(12, 2, 3, 10),
(13, 4, 3, 20),
(14, 4, 5, 10),
(15, 5, 3, 5),
(16, 5, 5, 15),
(17, 5, 7, 20),
(18, 6, 3, 10),
(19, 6, 5, 15),
(20, 7, 3, 10),
(21, 7, 5, 5),
(22, 8, 3, 5),
(23, 1, 5, 1),
(24, 1, 7, 8),
(25, 1, 9, 0),
(26, 1, 2, 10),
(27, 1, 4, 7),
(28, 1, 6, 3),
(29, 1, 8, 0),
(30, 1, 10, 0),
(31, 2, 5, 5),
(32, 2, 7, 1),
(33, 2, 9, 0),
(34, 2, 2, 8),
(35, 2, 4, 7),
(36, 2, 6, 5),
(37, 2, 8, 0),
(38, 2, 10, 0),
(39, 3, 1, 10),
(40, 3, 2, 3),
(41, 3, 3, 15),
(42, 3, 4, 5),
(43, 3, 5, 15),
(44, 3, 6, 2),
(45, 3, 8, 2),
(46, 3, 9, 5),
(47, 3, 10, 3),
(48, 4, 2, 2),
(49, 4, 4, 3),
(50, 4, 6, 4),
(51, 4, 7, 5),
(52, 4, 8, 1),
(53, 4, 9, 1),
(54, 4, 10, 0),
(55, 5, 2, 1),
(56, 5, 4, 1),
(57, 5, 6, 1),
(58, 5, 8, 1),
(59, 5, 9, 15),
(60, 5, 10, 1),
(61, 6, 2, 5),
(62, 6, 4, 10),
(63, 6, 6, 5),
(64, 6, 7, 15),
(65, 6, 8, 4),
(66, 6, 9, 10),
(67, 6, 10, 1),
(68, 7, 4, 5),
(69, 7, 6, 0),
(70, 7, 7, 1),
(71, 7, 8, 0),
(72, 7, 9, 0),
(73, 7, 10, 0),
(74, 8, 4, 0),
(75, 8, 5, 1),
(76, 8, 6, 0),
(77, 8, 7, 0),
(78, 8, 8, 0),
(79, 8, 9, 0),
(80, 8, 10, 0);

-- --------------------------------------------------------

--
-- Table structure for table `terrain_tiles`
--

CREATE TABLE IF NOT EXISTS `terrain_tiles` (
  `terrain_id` int(11) NOT NULL,
  `terrain_type` varchar(50) NOT NULL,
  `terrain_image` varchar(250) NOT NULL,
  `terrain_effect` varchar(20) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `terrain_tiles`
--

INSERT INTO `terrain_tiles` (`terrain_id`, `terrain_type`, `terrain_image`, `terrain_effect`) VALUES
(1, 'Grassland', '', ''),
(2, 'Plains', '', ''),
(3, 'Water', '', ''),
(4, 'Sand', '', ''),
(5, 'Lava', '', ''),
(6, 'Ash', '', ''),
(7, 'Forest', '', ''),
(8, 'Road', '', ''),
(9, 'GrasslandT2', '', ''),
(10, 'PlainsT2', '', ''),
(11, 'WaterT2', '', ''),
(12, 'SandT2', '', ''),
(13, 'LavaT2', '', ''),
(14, 'AshT2', '', ''),
(15, 'ForestT2', '', ''),
(16, 'RoadT2', '', ''),
(17, 'GrasslandT3', '', ''),
(18, 'PlainsT3', '', ''),
(19, 'WaterT3', '', ''),
(20, 'SandT3', '', ''),
(21, 'LavaT3', '', ''),
(22, 'AshT3', '', ''),
(23, 'ForestT3', '', ''),
(24, 'RoadT3', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `event_functions`
--
ALTER TABLE `event_functions`
  ADD PRIMARY KEY (`event_function_id`);

--
-- Indexes for table `event_modifiers`
--
ALTER TABLE `event_modifiers`
  ADD PRIMARY KEY (`event_modifier_id`);

--
-- Indexes for table `event_reward`
--
ALTER TABLE `event_reward`
  ADD PRIMARY KEY (`event_reward_id`);

--
-- Indexes for table `functions`
--
ALTER TABLE `functions`
  ADD PRIMARY KEY (`function_id`);

--
-- Indexes for table `map`
--
ALTER TABLE `map`
  ADD PRIMARY KEY (`map_id`);

--
-- Indexes for table `map_terrain`
--
ALTER TABLE `map_terrain`
  ADD PRIMARY KEY (`map_terrain_id`);

--
-- Indexes for table `monsters`
--
ALTER TABLE `monsters`
  ADD PRIMARY KEY (`monster_id`);

--
-- Indexes for table `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`reward_id`);

--
-- Indexes for table `terrain_event`
--
ALTER TABLE `terrain_event`
  ADD PRIMARY KEY (`terrain_event_id`);

--
-- Indexes for table `terrain_tiles`
--
ALTER TABLE `terrain_tiles`
  ADD PRIMARY KEY (`terrain_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `event_functions`
--
ALTER TABLE `event_functions`
  MODIFY `event_function_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `event_modifiers`
--
ALTER TABLE `event_modifiers`
  MODIFY `event_modifier_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `event_reward`
--
ALTER TABLE `event_reward`
  MODIFY `event_reward_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `functions`
--
ALTER TABLE `functions`
  MODIFY `function_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `map`
--
ALTER TABLE `map`
  MODIFY `map_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `map_terrain`
--
ALTER TABLE `map_terrain`
  MODIFY `map_terrain_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=476;
--
-- AUTO_INCREMENT for table `monsters`
--
ALTER TABLE `monsters`
  MODIFY `monster_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `rewards`
--
ALTER TABLE `rewards`
  MODIFY `reward_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `terrain_event`
--
ALTER TABLE `terrain_event`
  MODIFY `terrain_event_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `terrain_tiles`
--
ALTER TABLE `terrain_tiles`
  MODIFY `terrain_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
