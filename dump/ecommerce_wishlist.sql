-- Seed data for wishlist table
-- Updated: 2026-03-05

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `Wishlist`;

INSERT INTO `Wishlist` (
        `id`,
        `userId`,
        `productId`,
        `addedAt`
    )
VALUES (
        '70000000-0000-4000-a000-000000000001',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'cba20795-52d4-4dce-ba0b-e75c2963b353',
        '2026-02-20 10:00:00.000'
    ),
    (
        '70000000-0000-4000-a000-000000000002',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        '66d1a0a4-1018-44f0-a1fa-53c3bbb336fa',
        '2026-02-25 14:30:00.000'
    ),
    (
        '70000000-0000-4000-a000-000000000003',
        '1c37e7d8-599f-5f00-91c8-b9dbe1f10f4c',
        'a2c948f9-db97-411b-b693-0239fefbd93c',
        '2026-03-01 09:00:00.000'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;