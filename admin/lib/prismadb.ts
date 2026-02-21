import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
};

// Use direct PostgreSQL URL for the adapter (prisma+postgres:// not supported)
const directUrl = process.env.DIRECT_DATABASE_URL || "postgres://postgres:postgres@localhost:51217/template1?sslmode=disable";

const adapter = new PrismaPg({
    connectionString: directUrl,
});

const prismadb = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;