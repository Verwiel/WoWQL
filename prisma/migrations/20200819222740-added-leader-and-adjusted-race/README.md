# Migration `20200819222740-added-leader-and-adjusted-race`

This migration has been generated at 8/19/2020, 4:27:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Leader" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,

FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "factionId" INTEGER NOT NULL,

FOREIGN KEY ("factionId") REFERENCES "Faction"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Race" ("id", "name", "description", "factionId") SELECT "id", "name", "description", "factionId" FROM "Race";
DROP TABLE "Race";
ALTER TABLE "new_Race" RENAME TO "Race";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON

CREATE UNIQUE INDEX "Leader_raceId_unique" ON "Leader"("raceId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200819213052-update-race..20200819222740-added-leader-and-adjusted-race
--- datamodel.dml
+++ datamodel.dml
@@ -1,8 +1,8 @@
 datasource db {
   provider = "sqlite" 
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -47,13 +47,23 @@
 model Race {
   id            Int       @id @default(autoincrement())
   name          String
   description   String
+  leader        Leader
+  history       String
   racials       Racial[]
   loyalTo       Faction   @relation(fields: [factionId], references: [id])
   factionId     Int
 }
+model Leader {
+  id            Int       @id @default(autoincrement())
+  name          String
+  description   String
+  people        Race      @relation(fields: [raceId], references: [id])
+  raceId        Int
+}
+
 model Racial {
   id            Int       @id @default(autoincrement())
   name          String
   description   String
```


