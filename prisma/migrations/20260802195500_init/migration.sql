-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "businessName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "sector" TEXT,
    "websiteUrl" TEXT,
    "budgetRange" TEXT,
    "preferredLanguage" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'contact_form',
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AuditRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "sector" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "score" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "sector" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");
