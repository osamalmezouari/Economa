-- Seed data for coupon table
-- Updated: 2026-03-05 - Removed used_count column, added sample coupons

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `Coupon`;

INSERT INTO `Coupon` (
        `id`,
        `code`,
        `description`,
        `discount_type`,
        `discount_value`,
        `max_usage`,
        `expiration_date`,
        `minimum_order_value`,
        `created_at`,
        `updated_at`
    )
VALUES (
        '40000000-0000-4000-a000-000000000001',
        'SAVE10',
        '10% off your entire order',
        'Percentage',
        10,
        100,
        '2026-12-31 23:59:59.000',
        20,
        '2026-01-15 10:00:00.000',
        '2026-01-15 10:00:00.000'
    ),
    (
        '40000000-0000-4000-a000-000000000002',
        'FLAT20',
        '$20 off orders over $50',
        'Flat',
        20,
        50,
        '2026-12-31 23:59:59.000',
        50,
        '2026-01-15 10:00:00.000',
        '2026-01-15 10:00:00.000'
    ),
    (
        '40000000-0000-4000-a000-000000000003',
        'WELCOME15',
        '15% off for new customers',
        'Percentage',
        15,
        200,
        '2026-06-30 23:59:59.000',
        15,
        '2026-01-15 10:00:00.000',
        '2026-01-15 10:00:00.000'
    ),
    (
        '40000000-0000-4000-a000-000000000004',
        'SPRING25',
        '25% off spring sale',
        'Percentage',
        25,
        30,
        '2026-05-31 23:59:59.000',
        30,
        '2026-02-01 10:00:00.000',
        '2026-02-01 10:00:00.000'
    ),
    (
        '40000000-0000-4000-a000-000000000005',
        'FREESHIP',
        '$5 off shipping',
        'Flat',
        5,
        500,
        '2026-12-31 23:59:59.000',
        NULL,
        '2026-01-20 10:00:00.000',
        '2026-01-20 10:00:00.000'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;