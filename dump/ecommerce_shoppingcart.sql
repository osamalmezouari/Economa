-- Seed data for shoppingcart table
-- Updated: 2026-03-05 - Dates shifted to 2026

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `ShoppingCart`;

INSERT INTO `ShoppingCart` (
        `id`,
        `userId`,
        `productId`,
        `quantity`,
        `addedAt`
    )
VALUES (
        '21899a67-fc14-49cd-a5b7-732abfe7b638',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        '44813c69-504f-4893-b3c0-ebf072532787',
        1,
        '2026-03-01 18:14:43.587'
    ),
    (
        '813d1d2c-5c2a-4d42-993d-6d9c92a3cf5e',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'db9a4d1c-fd28-4ce5-96ec-e236cae0de79',
        1,
        '2026-03-01 21:10:43.568'
    ),
    (
        'a4ee6ec0-a95e-4eca-8b2d-bc8be76d996a',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        '2bf92ea9-19b9-41ad-813d-222b9dca568c',
        7,
        '2026-03-02 18:23:57.824'
    ),
    (
        'ae4f7e37-5566-466d-9c9f-e4688d7ff0c3',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'e99f4b36-ce62-4594-9b8e-5253572b8384',
        1,
        '2026-03-03 21:10:55.696'
    ),
    (
        'aeb9da89-5c14-452d-b1c0-94c62d94d587',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        '6d26fa9f-4bc8-45a1-acc2-ffda8dc54415',
        1,
        '2026-03-04 20:56:37.044'
    ),
    (
        'daa15099-1905-41ea-814a-8b92d9e72c6f',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        '66bb167d-5e02-4cc3-bc17-5e864bdee8b9',
        1,
        '2026-03-02 18:16:01.933'
    ),
    (
        'e100f6ca-9b05-48bb-8cb2-f19ab63f3028',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        '9e7dacfd-8b85-4061-8bb2-2295e9786e5f',
        1,
        '2026-03-03 18:23:26.965'
    ),
    (
        'ed5a1ae1-7c39-4821-afd8-f62a7efc4b9d',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'a2c948f9-db97-411b-b693-0239fefbd93c',
        1,
        '2026-03-04 21:11:01.443'
    ),
    (
        'f2d7e0cc-4268-45f7-b8f4-3b55bbc135cb',
        '0b26d6c7-488e-4fef-80b7-a88c0ad9368b',
        'e69c3c95-5817-4bd2-91b7-250d38ef8a75',
        1,
        '2026-03-05 10:10:49.250'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;