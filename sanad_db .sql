-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2026 at 10:29 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sanad_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` enum('female','male') NOT NULL,
  `dob` date NOT NULL,
  `language` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `message` text NOT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `first_name`, `last_name`, `gender`, `dob`, `language`, `email`, `phone`, `message`, `submitted_at`) VALUES
(3, 'Sarah', 'Al-Fahad', 'female', '1998-10-06', 'English', 'Sarah23@gmail.com', '0548176506', 'Thank you so much for creating Sanad! This platform has made it so easy for me to find volunteer opportunities that match my skills. I really appreciate all the hard work your team has put into this project. You are doing an incredible job', '2026-04-23 18:50:50'),
(4, 'Reman', 'Alamoudi ', 'female', '2004-01-21', 'English', 'reman.3aa@gmail.com', '0512345678', 'I would like to volunteer with you!', '2026-04-24 09:16:17'),
(5, 'Layan', 'Fagih', 'female', '2002-12-12', 'Chinese', 'reman.3aa@gmail.com', '0512345678', 'I want to ask how to apply to become a lead volunteer?', '2026-04-25 11:15:10'),
(6, 'Afnan', 'Omar', 'female', '2002-02-13', 'Arabic', 'afnan@gmail.com', '0512345678', 'I would like to get in contact with the head of the organization.', '2026-04-27 11:31:49');

-- --------------------------------------------------------

--
-- Table structure for table `volunteers`
--

CREATE TABLE `volunteers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `gender` enum('female','male') NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `interests` varchar(255) DEFAULT NULL,
  `skills` text NOT NULL,
  `availability` varchar(255) DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `volunteers`
--

INSERT INTO `volunteers` (`id`, `first_name`, `last_name`, `gender`, `dob`, `email`, `phone`, `interests`, `skills`, `availability`, `languages`, `created_at`) VALUES
(9, 'ghaida', 'SAMEER', 'female', '2003-11-11', 'ghaidasameer1424@gmail.com', '0548176506', 'Tech,Media', 'UI/UX design using Figma, Web Development (HTML, CSS), and problem-solving skills.', 'Weekdays', 'Arabic,English', '2026-04-23 18:46:07'),
(11, 'Reman', 'Alamoudi ', 'female', '2004-01-21', 'reman.3aa@gmail.com', '0565564452', 'Education,Events,Media', 'Arts and photography ', 'Morning,Weekends', 'Arabic,English', '2026-04-24 09:24:38'),
(12, 'Layan', 'Faqih', 'female', '2002-12-23', 'reman.3aa@gmail.com', '0587654321', 'Education,Food', 'Cooking', 'Morning,Weekdays', 'Arabic,English,French', '2026-04-25 11:13:54'),
(13, 'Lames', 'Nugali', 'female', '2016-03-03', 'hind@gmail.com', '0565564452', 'Education,Media', 'cooking', 'Morning,Weekdays', 'Arabic,English', '2026-04-27 11:35:01'),
(14, 'Ahmed', 'Mohammad', 'male', '1998-06-24', 'ahmed@gmail.com', '0573519372', 'Food,Tech,Media', 'Programming and Videography', 'Morning,Evening,Weekdays,Weekends', 'Arabic,English,French', '2026-04-29 07:53:38'),
(15, 'Saeed', 'Mussalam', 'male', '1992-10-28', 'S.muss@gmaul.com', '0582749182', 'Education,Media', 'Good communication skills and problem solving', 'Evening,Weekends', 'Arabic,French', '2026-04-29 07:55:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
