-- Seed data for rolepermission table
-- Updated: 2026-03-05 - Added admin permissions

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `RolePermission`;

INSERT INTO `RolePermission` (`roleId`, `permissionId`)
VALUES (
        'a42db04f-f91f-4ba9-ac83-17be85de98d8',
        'd77dfaf7-464f-48e0-bf52-5fdbb32810d9'
    ),
    (
        'a42db04f-f91f-4ba9-ac83-17be85de98d8',
        '914afe53-2555-47ae-b4a7-db3ac457f4bc'
    ),
    (
        'b53ec15e-a02a-5cb0-b494-28cd96f09e19',
        'd77dfaf7-464f-48e0-bf52-5fdbb32810d9'
    ),
    (
        'b53ec15e-a02a-5cb0-b494-28cd96f09e19',
        '914afe53-2555-47ae-b4a7-db3ac457f4bc'
    ),
    (
        'b53ec15e-a02a-5cb0-b494-28cd96f09e19',
        'e1a2b3c4-1111-4000-a000-000000000001'
    ),
    (
        'b53ec15e-a02a-5cb0-b494-28cd96f09e19',
        'e1a2b3c4-1111-4000-a000-000000000002'
    ),
    (
        'b53ec15e-a02a-5cb0-b494-28cd96f09e19',
        'e1a2b3c4-1111-4000-a000-000000000003'
    ),
    (
        'b53ec15e-a02a-5cb0-b494-28cd96f09e19',
        'e1a2b3c4-1111-4000-a000-000000000004'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;