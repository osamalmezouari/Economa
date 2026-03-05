-- Seed data for units table
-- Updated: 2026-03-05

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `Units`;

INSERT INTO `Units` (`id`, `name`)
VALUES ('1', 'Piece'),
    ('2', 'Pack'),
    ('3', 'Kg'),
    ('4', 'L');

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;