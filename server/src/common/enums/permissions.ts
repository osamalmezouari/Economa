export enum Permissions_TYPE {
  // User permissions
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USERS_READ = 'users:read',
  USER_PROFILE_UPDATE = 'user:profile:update',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  // Category permissions
  CATEGORY_CREATE = 'category:create',
  CATEGORIES_READ = 'categories:read',
  CATEGORY_NAMESANDIDS_READ = 'category:namesandids:read',
  CATEGORY_CARDS_READ = 'category:cards:read',
  CATEGORY_READ = 'category:read',
  CATEGORY_UPDATE = 'category:update',
  CATEGORY_DELETE = 'category:delete',

  // Wishlist permissions
  WISHLIST_CREATE = 'wishlist:create',
  WISHLIST_READ = 'wishlist:read',
  WISHLIST_DELETE = 'wishlist:delete',

  // Analytics permissions
  ANALYTICS_STORE_READ = 'analytics:store:read',
  ANALYTICS_REFILL_READ = 'analytics:refill:read',

  // Product permissions
  PRODUCT_READ = 'product:read',
  PRODUCT_STORE_READ = 'product:store:read',
  PRODUCT_STOCK_READ = 'product:stock:read',
/*   PRODUCT_CARDS_READ = 'product:cards:read',
 */  
/* PRODUCT_NEW_ARRIVALS_READ = 'product:newArrivals:read',
 */  
/* PRODUCT_COMPARE_READ = 'product:compare:read',
 */  
/* PRODUCT_DETAILS_READ = 'product:details:read',
 */  PRODUCT_MANAGE_TABLE_READ = 'product:manageTable:read',
  PRODUCT_CREATE = 'product:create',
  PRODUCT_UPDATE = 'product:update',
  PRODUCT_REVIEW_CREATE = 'product:review:create',
  PRODUCT_STOCK_CREATE = 'product:stock:create',

  // Order permissions
  ORDER_CREATE = 'order:create',
  ORDER_READ = 'order:read',

  // Permission management
  PERMISSIONS_READ = 'permissions:read',

  // Balance permissions
  BALANCE_REFILL_CREATE = 'balance:refill:create',
  BALANCE_REFILL_UPDATE = 'balance:refill:update',
  BALANCE_REFILL_READ = 'balance:refill:read',
  BALANCE_REFILL_STATUS_READ = 'balance:refill:status:read',
  BALANCE_CARDINFO_READ = 'balance:cardinfo:read',
  BALANCE_READ = 'balance:read',
  BALANCE_REFILLS_READ = 'balance:refills:read',
  BALANCE_TRANSFER ='balance:transfer',
  BALANCE_TRANSFER_READ = 'balance:transfer:read',

  // Shopping Cart permissions
  CART_READ = 'cart:read',
  CART_CREATE = 'cart:create',
  CART_UPDATE = 'cart:update',
  CART_DELETE = 'cart:delete',

  // Role permissions
  ROLES_READ = 'roles:read',
  ROLE_READ = 'role:read',
  ROLE_CREATE = 'role:create',
  ROLE_UPDATE = 'role:update',
  ROLE_PERMISSIONS_UPDATE = 'role:permissions:update',

  // Payment permissions
  PAYMENT_CREATE = 'payment:create',
  PAYMENT_READ = 'payment:read',
  PAYMENT_UPDATE = 'payment:update',
  PAYMENT_DELETE = 'payment:delete',

  // Coupon permissions
  COUPON_VERIFY = 'coupon:verify',
  COUPON_CREATE = 'coupon:create',
  COUPON_READ = 'coupon:read',
  COUPON_UPDATE = 'coupon:update',
  COUPON_DELETE = 'coupon:delete',

  // Notification permissions
  NOTIFICATION_CREATE = 'notification:create',
  NOTIFICATION_READ = 'notification:read',
  NOTIFICATION_UPDATE = 'notification:update',
  NOTIFICATION_DELETE = 'notification:delete',
}
