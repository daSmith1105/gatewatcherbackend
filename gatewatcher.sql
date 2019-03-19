-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 18, 2019 at 07:49 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `monarch`
--

-- --------------------------------------------------------

--
-- Table structure for table `GateUsers`
--

CREATE TABLE `GateUsers` (
  `id` int(11) NOT NULL,
  `sFirstName` varchar(20) NOT NULL DEFAULT '',
  `sLastName` varchar(20) NOT NULL DEFAULT '',
  `sUsername` varchar(60) NOT NULL DEFAULT '',
  `sPassword` varchar(65) NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `bAuthID` int(11) DEFAULT NULL,
  `bCustomerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `GateUsers`
--

INSERT INTO `GateUsers` (`id`, `sFirstName`, `sLastName`, `sUsername`, `sPassword`, `createdAt`, `updatedAt`, `deletedAt`, `bAuthID`, `bCustomerID`) VALUES
(1, 'Dividia', 'Technologies', 'dividia', 'rda2245', '2019-03-18 16:36:57', '2019-03-18 16:36:57', NULL, 1, 1),
(2, 'Master', 'Admin', 'master', 'master', '2019-03-18 16:36:57', '2019-03-18 16:36:57', NULL, 1, 1),
(3, 'guard', 'guard', 'guard', 'guard', '2019-03-18 16:51:08', '2019-03-18 16:51:08', NULL, 3, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `GateUsers`
--
ALTER TABLE `GateUsers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bAuthID` (`bAuthID`),
  ADD KEY `bCustomerID` (`bCustomerID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `GateUsers`
--
ALTER TABLE `GateUsers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `GateUsers`
--
ALTER TABLE `GateUsers`
  ADD CONSTRAINT `gateusers_ibfk_1` FOREIGN KEY (`bAuthID`) REFERENCES `GateAcls` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `gateusers_ibfk_2` FOREIGN KEY (`bCustomerID`) REFERENCES `GateCustomers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

