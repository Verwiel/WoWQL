# Migration `20200819225117-removing-history`

This migration has been generated at 8/19/2020, 4:51:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "factionId" INTEGER NOT NULL,

FOREIGN KEY ("factionId") REFERENCES "Faction"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Race" ("id", "name", "description", "factionId") SELECT "id", "name", "description", "factionId" FROM "Race";
DROP TABLE "Race";
ALTER TABLE "new_Race" RENAME TO "Race";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200819222740-added-leader-and-adjusted-race..20200819225117-removing-history
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
@@ -48,9 +48,8 @@
   id            Int       @id @default(autoincrement())
   name          String
   description   String
   leader        Leader
-  history       String
   racials       Racial[]
   loyalTo       Faction   @relation(fields: [factionId], references: [id])
   factionId     Int
 }
```


