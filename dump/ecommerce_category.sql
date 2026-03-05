-- Seed data for category table
-- Updated: 2026-03-05

USE `ecommerce`;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

DELETE FROM `Category`;

INSERT INTO `Category` (
        `id`,
        `name`,
        `svgLink`,
        `description`
    )
VALUES (
        '305ecc35-68d1-463d-a960-d4ca4f8502e6',
        'Seafood',
        'https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/seafood.svg',
        'Fresh or frozen fish, shellfish, and other marine life, valued for their protein content and essential nutrients'
    ),
    (
        '5d577fe5-0944-4f3c-88e2-5db4fdfd5c38',
        'Vegetables',
        'https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/tomato.svg',
        'Vegetables: Nutrient-rich plants, including leafy greens, root vegetables, and cruciferous types, commonly used in cooking for their health benefits.'
    ),
    (
        '745d77d1-6d3e-41cc-905f-8129a5b63843',
        'Milk & Diary',
        'https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/milk&dairy.svg',
        'Fresh and processed products derived from milk, including milk, cheese, yogurt, butter, and cream, essential for a balanced diet'
    ),
    (
        '76fdf1a4-e766-4acf-ada8-2fcb215da8c4',
        'Bakery',
        'https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/bakery.svg',
        'A place offering a variety of freshly baked goods like bread, cakes, and pastries, perfect for satisfying sweet cravings.'
    ),
    (
        '7740708f-5623-4cf5-a45a-bfdf36bfd4db',
        'Fruits',
        'https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/fruits.svg',
        'Fresh, ripe, and delicious fruits, perfect for snacking or adding to your meals. Enjoy a variety of seasonal and tropical fruits, full of vitamins and flavor.'
    ),
    (
        '967fdc3d-3c94-475a-ab0f-ee515cea5dc6',
        'Fastfood',
        'https://raw.githubusercontent.com/osamalmezouari/ecommerce/refs/heads/master/client/public/assets/icons/popcorn.svg',
        'Quick and convenient meals, typically including burgers, fries, pizzas, and sandwiches, often served in a casual or takeout setting'
    );

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;