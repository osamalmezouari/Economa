-- Seed data for user table
-- Updated: 2026-03-05 - Added avatar column and admin user

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `User`;

INSERT INTO `User` (
        `id`,
        `name`,
        `email`,
        `password`,
        `phoneNumber`,
        `address`,
        `createdAt`,
        `updatedAt`,
        `lastLogin`,
        `roleId`,
        `avatar`
    )
VALUES (
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'costumer',
        'costumer@gmail.com',
        'costumer1234',
        '+212 600 000000',
        'Costumer 123 Elm Street Springfield, IL 62701 USA',
        '2026-01-10 17:30:37.968',
        '2026-03-05 10:00:00.000',
        '2026-03-05 09:00:00.000',
        'a42db04f-f91f-4ba9-ac83-17be85de98d8',
        'https://ui-avatars.com/api/?name=Costumer&background=4CAF50&color=fff&size=128'
    ),
    (
        '1c37e7d8-599f-5f00-91c8-b9dbe1f10f4c',
        'Admin',
        'admin@economa.com',
        'admin1234',
        '+212 611 111111',
        'Admin HQ 456 Oak Avenue, NY 10001 USA',
        '2026-01-05 10:00:00.000',
        '2026-03-05 10:00:00.000',
        '2026-03-05 10:00:00.000',
        'b53ec15e-a02a-5cb0-b494-28cd96f09e19',
        'https://ui-avatars.com/api/?name=Admin&background=2196F3&color=fff&size=128'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;