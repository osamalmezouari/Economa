-- Seed data for role table
-- Updated: 2026-03-05 - Added rolelvl column and admin role

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `Role`;

INSERT INTO `Role` (
        `id`,
        `name`,
        `description`,
        `rolelvl`
    )
VALUES (
        'a42db04f-f91f-4ba9-ac83-17be85de98d8',
        'costumer',
        'default role for registered user',
        1
    ),
    (
        'b53ec15e-a02a-5cb0-b494-28cd96f09e19',
        'admin',
        'Administrator with full access',
        10
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;