-- Seed data for productreview table
-- Updated: 2026-03-05 - Dates shifted to 2026, productId made required

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `ProductReview`;

INSERT INTO `ProductReview` (
        `id`,
        `userId`,
        `productId`,
        `rating`,
        `reviewText`,
        `createdAt`
    )
VALUES (
        '998906e8-851e-4e46-afbd-d198d26a447d',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        '0c952488-af86-4e2f-9692-4f23aef911af',
        3,
        'Good quality ginger, fresh and aromatic.',
        '2026-02-26 18:53:16.876'
    ),
    (
        '60000000-0000-4000-a000-000000000001',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'e69c3c95-5817-4bd2-91b7-250d38ef8a75',
        5,
        'Best tomatoes I have ever bought! Super fresh.',
        '2026-02-05 14:30:00.000'
    ),
    (
        '60000000-0000-4000-a000-000000000002',
        '1c37e7d8-599f-5f00-91c8-b9dbe1f10f4c',
        'af8cca35-7cbb-4822-b17b-474035a69fbe',
        4,
        'Delicious croissants, just like Paris bakeries.',
        '2026-02-08 10:00:00.000'
    ),
    (
        '60000000-0000-4000-a000-000000000003',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'cc0ef72f-39b2-4ebc-8213-22b4f3f63e48',
        5,
        'Crisp and juicy apples, great for snacking.',
        '2026-02-12 16:45:00.000'
    ),
    (
        '60000000-0000-4000-a000-000000000004',
        '1c37e7d8-599f-5f00-91c8-b9dbe1f10f4c',
        '47aed3bd-7b21-48b2-be15-ca8d7fc62e23',
        4,
        'Juicy burgers with great flavor. Will order again!',
        '2026-02-15 12:00:00.000'
    ),
    (
        '60000000-0000-4000-a000-000000000005',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        '9fc54179-d314-4d3b-941e-215b67223653',
        5,
        'Premium mozzarella, perfect for homemade pizza.',
        '2026-02-20 11:30:00.000'
    ),
    (
        '60000000-0000-4000-a000-000000000006',
        '1c37e7d8-599f-5f00-91c8-b9dbe1f10f4c',
        '66d1a0a4-1018-44f0-a1fa-53c3bbb336fa',
        5,
        'Excellent smoked salmon, restaurant quality.',
        '2026-03-02 09:00:00.000'
    ),
    (
        '60000000-0000-4000-a000-000000000007',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'b7100eb2-53ac-41f3-a383-ffc39cffba9c',
        4,
        'Fresh blueberries, perfect for morning smoothies.',
        '2026-03-03 15:00:00.000'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;