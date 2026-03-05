-- Seed data for permission table
-- Updated: 2026-03-05

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `Permission`;

INSERT INTO `Permission` (`id`, `name`, `description`)
VALUES (
        '914afe53-2555-47ae-b4a7-db3ac457f4bc',
        'view_one_product',
        NULL
    ),
    (
        'd77dfaf7-464f-48e0-bf52-5fdbb32810d9',
        'view_all_products',
        NULL
    ),
    (
        'e1a2b3c4-1111-4000-a000-000000000001',
        'manage_orders',
        'Create, update, and delete orders'
    ),
    (
        'e1a2b3c4-1111-4000-a000-000000000002',
        'manage_users',
        'Create, update, and delete users'
    ),
    (
        'e1a2b3c4-1111-4000-a000-000000000003',
        'manage_products',
        'Create, update, and delete products'
    ),
    (
        'e1a2b3c4-1111-4000-a000-000000000004',
        'view_analytics',
        'View analytics dashboard'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;