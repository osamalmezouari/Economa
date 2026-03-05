import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const base = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf-8'));
  const extra = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-orders.json'), 'utf-8'));

  console.log('🌱 Seeding database...');

  // Clear transactional data to avoid orphans/duplicates from previous runs
  console.log('🧹 Clearing old transactional data...');
  await prisma.userNotification.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.productReview.deleteMany({});
  await prisma.userTransfers.deleteMany({});
  await prisma.stockTransaction.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.refillBalanceRequest.deleteMany({});
  await prisma.balance.deleteMany({});
  console.log('✅ Tables cleared.');

  // Units
  for (const u of base.units) {
    await prisma.units.upsert({ where: { id: u.id }, update: u, create: u });
  }
  console.log(`✅ Units: ${base.units.length}`);

  // Categories
  for (const c of base.categories) {
    await prisma.category.upsert({ where: { id: c.id }, update: c, create: c });
  }
  console.log(`✅ Categories: ${base.categories.length}`);

  // Permissions
  for (const p of base.permissions) {
    await prisma.permission.upsert({ where: { id: p.id }, update: p, create: p });
  }
  console.log(`✅ Permissions: ${base.permissions.length}`);

  // Roles
  for (const r of base.roles) {
    await prisma.role.upsert({ where: { id: r.id }, update: r, create: r });
  }
  console.log(`✅ Roles: ${base.roles.length}`);

  // RolePermissions
  for (const rp of base.rolePermissions) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: rp.roleId, permissionId: rp.permissionId } },
      update: rp, create: rp,
    });
  }
  console.log(`✅ RolePermissions: ${base.rolePermissions.length}`);

  // Users
  for (const u of base.users) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: { ...u, createdAt: new Date(u.createdAt), updatedAt: new Date(u.updatedAt), lastLogin: u.lastLogin ? new Date(u.lastLogin) : null },
      create: { ...u, createdAt: new Date(u.createdAt), updatedAt: new Date(u.updatedAt), lastLogin: u.lastLogin ? new Date(u.lastLogin) : null },
    });
  }
  console.log(`✅ Users: ${base.users.length}`);

  // Balances
  if (base.balances) {
    for (const b of base.balances) {
      await prisma.balance.upsert({
        where: { id: b.id },
        update: { ...b, createdAt: new Date(b.createdAt), updatedAt: new Date(b.updatedAt) },
        create: { ...b, createdAt: new Date(b.createdAt), updatedAt: new Date(b.updatedAt) },
      });
    }
    console.log(`✅ Balances: ${base.balances.length}`);
  }

  // RefillBalanceRequests
  if (base.refillBalanceRequest) {
    for (const r of base.refillBalanceRequest) {
      await prisma.refillBalanceRequest.upsert({
        where: { id: r.id },
        update: { ...r, createdAt: new Date(r.createdAt), updatedAt: new Date(r.updatedAt) },
        create: { ...r, createdAt: new Date(r.createdAt), updatedAt: new Date(r.updatedAt) },
      });
    }
    console.log(`✅ Refills: ${base.refillBalanceRequest.length}`);
  }

  // Coupons
  for (const c of base.coupons) {
    await prisma.coupon.upsert({
      where: { id: c.id },
      update: { ...c, expiration_date: c.expiration_date ? new Date(c.expiration_date) : null, created_at: new Date(c.created_at), updated_at: new Date(c.updated_at) },
      create: { ...c, expiration_date: c.expiration_date ? new Date(c.expiration_date) : null, created_at: new Date(c.created_at), updated_at: new Date(c.updated_at) },
    });
  }
  console.log(`✅ Coupons: ${base.coupons.length}`);

  // Products + Gallery
  const prodDate = new Date('2026-01-20T12:00:00.000Z');
  for (const p of extra.products) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: { id: p.id, name: p.name, description: p.description, price: p.price, stock: p.stock, categoryId: p.categoryId, cost_price: p.cost_price, discount: p.discount, unitId: p.unitId, created_at: prodDate, updated_at: prodDate },
      create: { id: p.id, name: p.name, description: p.description, price: p.price, stock: p.stock, categoryId: p.categoryId, cost_price: p.cost_price, discount: p.discount, unitId: p.unitId, created_at: prodDate, updated_at: prodDate },
    });
    await prisma.gallery.upsert({
      where: { id: p.galleryId },
      update: { id: p.galleryId, productId: p.id, imageUrl: p.imageUrl, createdAt: prodDate },
      create: { id: p.galleryId, productId: p.id, imageUrl: p.imageUrl, createdAt: prodDate },
    });
  }
  console.log(`✅ Products: ${extra.products.length}`);
  console.log(`✅ Gallery: ${extra.products.length}`);

  // StockTransactions
  if (extra.stockTransactions) {
    for (const st of extra.stockTransactions) {
      await prisma.stockTransaction.upsert({
        where: { id: st.id },
        update: { ...st, transactionDate: new Date(st.transactionDate) },
        create: { ...st, transactionDate: new Date(st.transactionDate) },
      });
    }
    console.log(`✅ StockTransactions: ${extra.stockTransactions.length}`);
  }

  // Notifications
  for (const n of base.notifications) {
    await prisma.notification.upsert({
      where: { id: n.id },
      update: { ...n, createdAt: new Date(n.createdAt) },
      create: { ...n, createdAt: new Date(n.createdAt) },
    });
  }
  console.log(`✅ Notifications: ${base.notifications.length}`);

  // Orders + OrderItems + Payments
  let itemCount = 0;
  let itemIdx = 1;
  for (const o of extra.orders) {
    const dt = new Date(o.createdAt);
    await prisma.order.upsert({
      where: { id: o.id },
      update: { userId: o.userId, couponId: o.couponId, status: o.status, totalAmount: o.totalAmount, createdAt: dt, updatedAt: dt },
      create: { id: o.id, userId: o.userId, couponId: o.couponId, status: o.status, totalAmount: o.totalAmount, createdAt: dt, updatedAt: dt },
    });
    for (const item of o.items) {
      const itmId = `20000000-0000-4000-a000-${String(itemIdx).padStart(12, '0')}`;
      await prisma.orderItem.upsert({
        where: { id: itmId },
        update: { orderId: o.id, productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice },
        create: { id: itmId, orderId: o.id, productId: item.productId, quantity: item.quantity, unitPrice: item.unitPrice },
      });
      itemIdx++;
      itemCount++;
    }
    const payId = o.id.replace('10000000', '30000000');
    await prisma.payment.upsert({
      where: { id: payId },
      update: { orderId: o.id, amount: o.totalAmount, paymentDate: dt, paymentStatus: 'paid', createdAt: dt, updatedAt: dt },
      create: { id: payId, orderId: o.id, amount: o.totalAmount, paymentDate: dt, paymentStatus: 'paid', createdAt: dt, updatedAt: dt },
    });
  }
  console.log(`✅ Orders: ${extra.orders.length}`);
  console.log(`✅ OrderItems: ${itemCount}`);
  console.log(`✅ Payments: ${extra.orders.length}`);

  // Reviews
  for (const r of extra.reviews) {
    await prisma.productReview.upsert({
      where: { userId_productId: { userId: r.userId, productId: r.productId } },
      update: { ...r, createdAt: new Date(r.createdAt) },
      create: { ...r, createdAt: new Date(r.createdAt) },
    });
  }
  console.log(`✅ Reviews: ${extra.reviews.length}`);

  // UserTransfers
  if (base.userTransfers) {
    for (const t of base.userTransfers) {
      await prisma.userTransfers.upsert({
        where: { id: t.id },
        update: { ...t, createdAt: new Date(t.createdAt), updatedAt: new Date(t.updatedAt) },
        create: { ...t, createdAt: new Date(t.createdAt), updatedAt: new Date(t.updatedAt) },
      });
    }
    console.log(`✅ Transfers: ${base.userTransfers.length}`);
  }

  // UserNotifications
  if (base.userNotifications) {
    for (const un of base.userNotifications) {
      await prisma.userNotification.upsert({
        where: { userId_notificationId: { userId: un.userId, notificationId: un.notificationId } },
        update: un,
        create: un,
      });
    }
    console.log(`✅ UserNotifications: ${base.userNotifications.length}`);
  }

  console.log('\n🎉 Seeding complete!');
}

main()
  .catch((e) => { console.error('❌ Seed error:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
