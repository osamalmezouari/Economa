-- Seed data for notification table
-- Updated: 2026-03-05 - Removed userId FK (now uses UserNotification join table)

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `Notification`;

INSERT INTO `Notification` (
        `id`,
        `type`,
        `message`,
        `isRead`,
        `createdAt`
    )
VALUES (
        '50000000-0000-4000-a000-000000000001',
        'order',
        'Your order has been placed successfully!',
        1,
        '2026-02-01 10:15:00.000'
    ),
    (
        '50000000-0000-4000-a000-000000000002',
        'order',
        'Your order has been shipped!',
        1,
        '2026-02-03 14:30:00.000'
    ),
    (
        '50000000-0000-4000-a000-000000000003',
        'promotion',
        'Spring sale is here! Use code SPRING25 for 25% off!',
        0,
        '2026-02-15 10:00:00.000'
    ),
    (
        '50000000-0000-4000-a000-000000000004',
        'order',
        'Your order has been delivered!',
        0,
        '2026-03-01 09:00:00.000'
    ),
    (
        '50000000-0000-4000-a000-000000000005',
        'system',
        'Welcome to Economa! Start shopping today.',
        1,
        '2026-01-10 10:00:00.000'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;