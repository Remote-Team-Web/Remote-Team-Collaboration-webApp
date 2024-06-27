-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2024 at 07:21 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `discussions`
--

CREATE TABLE `discussions` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `file_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `discussions`
--

INSERT INTO `discussions` (`id`, `project_id`, `user_id`, `message`, `created_at`, `file_path`) VALUES
(173, 50, 38, 'Ok from where we start?', '2024-06-26 18:20:23', ''),
(174, 50, 35, 'From the SRS😀', '2024-06-26 18:27:35', ''),
(175, 50, 36, 'Hey team! So, I just found a bug that causes the app to crash if you try to log in with a password longer than 50 characters. Who\'s responsible for this one? 😂', '2024-06-26 18:30:01', ''),
(176, 50, 37, 'raises hand slowly Uh, that might be on me. I was trying to make sure we supported all password lengths... maybe I went a bit overboard. 😅', '2024-06-26 18:55:05', ''),
(177, 50, 35, 'I have finished the doc', '2024-06-26 18:56:17', ''),
(178, 50, 38, 'Haha, well, at least it\'s not my fault this time! My web login form only allows 20 characters. Looks like Flutter is trying to compete in the long password Olympics! 🥇', '2024-06-26 19:02:55', ''),
(179, 50, 39, 'Guys, I\'m more concerned about the fact that our target audience\'s average password length is 8 characters. Let\'s focus on what matters, like making sure the app is user-friendly. 😜', '2024-06-26 19:04:16', ''),
(180, 50, 35, 'Ahem, according to the SRS (Section 4.3.2), the password should have a minimum of 8 and a maximum of 20 characters. I even made it bold and underlined. Looks like someone missed that part. 🤨', '2024-06-26 19:04:39', ''),
(181, 50, 37, 'Caught red-handed! 🕵️‍♂️ Don\'t worry, Flutter Dev. I once wrote a test case to ensure we support emojis in usernames... and accidentally created a user named \"😂\". Fun times!', '2024-06-26 19:05:00', ''),
(182, 50, 34, 'Hi every one', '2024-06-26 19:08:58', '');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `is_read`, `created_at`) VALUES
(53, 35, 'You have been assigned a new task: Srs Document Chapter 1', 0, '2024-06-26 18:21:33'),
(54, 36, 'You have been assigned a new task: Test the first milestone of mobile app', 0, '2024-06-26 18:22:51'),
(55, 37, 'You have been assigned a new task: Home page Flutter', 0, '2024-06-26 18:24:00'),
(56, 38, 'You have been assigned a new task: Web Front page Design', 0, '2024-06-26 18:25:18'),
(57, 39, 'You have been assigned a new task: Research on the Market with in the project', 0, '2024-06-26 18:26:50');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `description`, `user_id`, `created_at`) VALUES
(50, 'Remote Team Collaboration ', 'Remote team collaboration app based on  teams to track their project by setting task to their team member. is created on web based project HTML CSS JS PHP and MYSQL.', 34, '2024-06-26 18:04:10');

-- --------------------------------------------------------

--
-- Table structure for table `project_users`
--

CREATE TABLE `project_users` (
  `id` int(11) NOT NULL,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `role` enum('manager','member') NOT NULL,
  `status` enum('pending','accepted','declined') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project_users`
--

INSERT INTO `project_users` (`id`, `project_id`, `user_id`, `role`, `status`, `created_at`) VALUES
(174, 50, 35, 'member', 'accepted', '2024-06-26 18:04:39'),
(175, 50, 36, 'member', 'accepted', '2024-06-26 18:04:43'),
(176, 50, 37, 'member', 'accepted', '2024-06-26 18:04:50'),
(177, 50, 38, 'member', 'accepted', '2024-06-26 18:04:53'),
(178, 50, 39, 'member', 'accepted', '2024-06-26 18:04:56');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('backlog','in_progress','completed') NOT NULL,
  `due_date` date DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `due_date`, `project_id`, `user_id`, `created_at`) VALUES
(75, 'Srs Document Chapter 1', 'Do the srs document chapter one with this week ', 'completed', '2024-07-03', 50, 35, '2024-06-26 18:21:33'),
(76, 'Test the first milestone of mobile app', 'first milestone of mobile app test with in 2 days', 'backlog', '2024-07-12', 50, 36, '2024-06-26 18:22:51'),
(77, 'Home page Flutter', 'Create the home page with flutter', 'backlog', '2024-07-05', 50, 37, '2024-06-26 18:24:00'),
(78, 'Web Front page Design', 'Design the front page or the home page of the project', 'backlog', '2024-08-09', 50, 38, '2024-06-26 18:25:18'),
(79, 'Research on the Market with in the project', 'Research on the Market with in the project', 'in_progress', '2024-07-11', 50, 39, '2024-06-26 18:26:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(50) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `profile_image`, `created_at`, `role`, `phone_number`, `first_name`, `last_name`) VALUES
(34, 'HGiorgis', '$2y$10$RhrvDFnPMwRcnHVf/UdiP.jF2VRI/qc55oviy4Ulb5CdwEm08VyhS', 'hailegiorgiswagaye@gmail.com', '../../ui/image/uploads/2.jpg', '2024-06-26 17:30:48', 'Concept Artist', '0985359197', 'Hailegiorgis', 'Wagaye'),
(35, 'NibruAd', '$2y$10$.Amn9E7zRgYl5O2ngSFFMewegEpU8x0CsYdqhUI79R7vmBe/UejUS', 'nibruad@gmail.com', '../../ui/image/uploads/user 2.jpg', '2024-06-26 17:35:27', 'Document Analyzer ', '0946942006', 'Nibru', 'Kefyalew'),
(36, 'matthias22', '$2y$10$ZXpFdHipMXhbQ4KbCE2T/.haVkF9ClPtSURXcgGkDPtcKdf2DR0CW', 'matthias22@gmail.com', '../../ui/image/uploads/user 9.jpg', '2024-06-26 17:38:36', 'System Tester ', '0923677405', 'Matthias ', 'Mulugeta'),
(37, 'Yafet', '$2y$10$d4BtiVo4OmY0EARicROuF.e4pw8q/fzHkJ7NrMMgw0XIRNh6rYleC', 'Yafet@gmail.com', '../../ui/image/uploads/admin.jpg', '2024-06-26 17:46:47', 'Flutter Developer', '0921806849', 'Yafet', 'Tesfaye'),
(38, 'chapi', '$2y$10$nMIc7FZsVTldYbm61TCMe.f8AwlXX1oIggvIETrkD94..S0w4noVC', 'mete@gmail.com', '../../ui/image/uploads/user 12.jpg', '2024-06-26 17:49:03', 'React Developer ', '0926570242', 'Metasebiyaw', 'Asfawe'),
(39, 'Moh', '$2y$10$1yTT00TNlsMB/HvJ.8vhZeYelDSFAuFCg3zoYmPeXpYn9.7cto07u', 'mame@gmail.com', '../../ui/image/uploads/user 11.jpg', '2024-06-26 17:52:46', 'Marketing', '0967991617', 'Mohamed ', 'Muktar');

-- --------------------------------------------------------

--
-- Table structure for table `zoom_links`
--

CREATE TABLE `zoom_links` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `zoom_links`
--

INSERT INTO `zoom_links` (`id`, `project_id`, `user_id`, `title`, `created_at`, `updated_at`) VALUES
(17, 50, 34, 'https://zoom.us/j/5551112222', '2024-06-26 18:06:15', '2024-06-26 18:06:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `discussions`
--
ALTER TABLE `discussions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `project_users`
--
ALTER TABLE `project_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zoom_links`
--
ALTER TABLE `zoom_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `discussions`
--
ALTER TABLE `discussions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=183;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `project_users`
--
ALTER TABLE `project_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `zoom_links`
--
ALTER TABLE `zoom_links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `discussions`
--
ALTER TABLE `discussions`
  ADD CONSTRAINT `discussions_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `discussions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `project_users`
--
ALTER TABLE `project_users`
  ADD CONSTRAINT `project_users_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `project_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `zoom_links`
--
ALTER TABLE `zoom_links`
  ADD CONSTRAINT `zoom_links_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `zoom_links_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
