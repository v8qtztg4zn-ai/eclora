import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  {
    name: "Celestia Solitaire Ring",
    slug: "celestia-solitaire-ring",
    sku: "ECL-RNG-001",
    category: "Engagement Rings",
    description:
      "A breathtaking solitaire engagement ring featuring a 1.5 carat lab-grown diamond in an elegant four-prong setting. Crafted in 18K white gold with a cathedral band that elevates the center stone.",
    price: 4850,
    carat: 1.5,
    cut: "Excellent",
    color: "D",
    clarity: "VVS1",
    metal: "18K White Gold",
    diamondType: "Lab-Grown",
    stockStatus: "In Stock",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247fc67f4565?w=800&q=80",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
    ],
  },
  {
    name: "Luna Halo Ring",
    slug: "luna-halo-ring",
    sku: "ECL-RNG-002",
    category: "Engagement Rings",
    description:
      "A stunning halo design with a 2.0 carat center stone surrounded by a pavé diamond halo. Set in 18K rose gold for a warm, romantic glow.",
    price: 7200,
    carat: 2.0,
    cut: "Ideal",
    color: "E",
    clarity: "VVS2",
    metal: "18K Rose Gold",
    diamondType: "Lab-Grown",
    stockStatus: "In Stock",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    ],
  },
  {
    name: "Aurora Pendant",
    slug: "aurora-pendant",
    sku: "ECL-PND-001",
    category: "Diamond Pendants",
    description:
      "A delicate pear-shaped lab-grown diamond suspended from a fine 18K white gold chain. The perfect everyday luxury piece.",
    price: 3200,
    carat: 1.0,
    cut: "Excellent",
    color: "F",
    clarity: "VS1",
    metal: "18K White Gold",
    diamondType: "Lab-Grown",
    stockStatus: "In Stock",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    ],
  },
  {
    name: "Stellar Tennis Bracelet",
    slug: "stellar-tennis-bracelet",
    sku: "ECL-BRC-001",
    category: "Tennis Bracelets",
    description:
      "A classic tennis bracelet featuring 5 carats total weight of brilliant-cut lab-grown diamonds set in 18K white gold.",
    price: 8900,
    carat: 5.0,
    cut: "Excellent",
    color: "D",
    clarity: "VS1",
    metal: "18K White Gold",
    diamondType: "Lab-Grown",
    stockStatus: "Made to Order",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    ],
  },
  {
    name: "Ethereal Drop Earrings",
    slug: "ethereal-drop-earrings",
    sku: "ECL-EAR-001",
    category: "Earrings",
    description:
      "Elegant drop earrings with 0.75 carat lab-grown diamonds each, set in platinum with a secure lever-back closure.",
    price: 2800,
    carat: 1.5,
    cut: "Very Good",
    color: "G",
    clarity: "VS2",
    metal: "Platinum",
    diamondType: "Lab-Grown",
    stockStatus: "In Stock",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60904?w=800&q=80",
    ],
  },
  {
    name: "Nova Stud Earrings",
    slug: "nova-stud-earrings",
    sku: "ECL-EAR-002",
    category: "Earrings",
    description:
      "Timeless round brilliant stud earrings, 1 carat total weight, in a classic four-prong 18K yellow gold setting.",
    price: 2100,
    carat: 1.0,
    cut: "Excellent",
    color: "F",
    clarity: "VS1",
    metal: "18K Yellow Gold",
    diamondType: "Lab-Grown",
    stockStatus: "In Stock",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1617032218108-9e806e9d8846?w=800&q=80",
    ],
  },
  {
    name: "Infinity Band",
    slug: "infinity-band",
    sku: "ECL-RNG-003",
    category: "Engagement Rings",
    description:
      "A modern eternity band with channel-set lab-grown diamonds totaling 2 carats. Perfect as a wedding band or stackable piece.",
    price: 3600,
    carat: 2.0,
    cut: "Excellent",
    color: "E",
    clarity: "VS1",
    metal: "18K White Gold",
    diamondType: "Lab-Grown",
    stockStatus: "In Stock",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    ],
  },
  {
    name: "Custom Signature Piece",
    slug: "custom-signature-piece",
    sku: "ECL-CUS-001",
    category: "Custom Jewelry",
    description:
      "Work with our master artisans to create a one-of-a-kind piece. From sketch to finished jewel, your vision becomes reality.",
    price: 5000,
    carat: null,
    cut: null,
    color: null,
    clarity: null,
    metal: "Your Choice",
    diamondType: "Lab-Grown",
    stockStatus: "Made to Order",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1617032218108-9e806e9d8846?w=800&q=80",
    ],
  },
];

async function main() {
  console.log("Seeding ECLORA database...");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@eclora.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "EcloraAdmin2024!";

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 12),
      name: "ECLORA Admin",
    },
  });
  console.log("Admin user created");

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      brandName: "ECLORA",
      tagline: "Not mined, but designed to shine.",
      heroText: "Luxury redefined for a conscious generation.",
      email: "hello@eclora.com",
      phone: "+1 (234) 567-890",
      whatsapp: "1234567890",
      address: "By appointment — New York, NY",
      instagram: "https://instagram.com/eclora",
      pinterest: "https://pinterest.com/eclora",
    },
  });
  console.log("Site settings created");

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`${products.length} products seeded`);

  const customer = await prisma.customer.upsert({
    where: { email: "sophia.chen@email.com" },
    update: {},
    create: {
      name: "Sophia Chen",
      email: "sophia.chen@email.com",
      phone: "+1 (555) 123-4567",
    },
  });

  const customer2 = await prisma.customer.upsert({
    where: { email: "james.williams@email.com" },
    update: {},
    create: {
      name: "James Williams",
      email: "james.williams@email.com",
      phone: "+1 (555) 987-6543",
    },
  });

  const celestia = await prisma.product.findUnique({
    where: { slug: "celestia-solitaire-ring" },
  });

  if (celestia) {
    await prisma.inquiry.createMany({
      data: [
        {
          type: "product",
          name: "Sophia Chen",
          email: "sophia.chen@email.com",
          phone: "+1 (555) 123-4567",
          message: "Interested in the Celestia Solitaire. Can I see it in rose gold?",
          productId: celestia.id,
          customerId: customer.id,
          status: "New",
        },
        {
          type: "custom",
          name: "James Williams",
          email: "james.williams@email.com",
          jewelryType: "Engagement Ring",
          budget: "$5,000 - $10,000",
          diamondSize: "2 carat",
          metalPreference: "Platinum",
          message: "Looking for a unique three-stone design for my proposal.",
          customerId: customer2.id,
          status: "Contacted",
        },
      ],
      skipDuplicates: true,
    });
  }

  const aurora = await prisma.product.findUnique({
    where: { slug: "aurora-pendant" },
  });

  if (aurora && celestia) {
    await prisma.order.create({
      data: {
        orderNumber: "ECL-SEED-001",
        customerId: customer.id,
        status: "Confirmed",
        paymentStatus: "Paid",
        totalAmount: 8050,
        items: {
          create: [
            { productId: celestia.id, quantity: 1, price: celestia.price },
            { productId: aurora.id, quantity: 1, price: aurora.price },
          ],
        },
      },
    });
  }

  await prisma.appointment.createMany({
    data: [
      {
        name: "Sophia Chen",
        email: "sophia.chen@email.com",
        phone: "+1 (555) 123-4567",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        time: "14:00",
        purpose: "Engagement Ring Selection",
        status: "Confirmed",
        customerId: customer.id,
      },
      {
        name: "Emma Rodriguez",
        email: "emma.r@email.com",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        time: "11:00",
        purpose: "Custom Design Discussion",
        status: "Pending",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Sample inquiries, orders, and appointments created");
  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
