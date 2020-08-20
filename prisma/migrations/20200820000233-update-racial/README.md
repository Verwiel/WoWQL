# Migration `20200820000233-update-racial`

This migration has been generated at 8/19/2020, 6:02:33 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Racial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "benefit" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,

FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Racial" ("id", "name", "raceId") SELECT "id", "name", "raceId" FROM "Racial";
DROP TABLE "Racial";
ALTER TABLE "new_Racial" RENAME TO "Racial";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200819225117-removing-history..20200820000233-update-racial
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
@@ -64,8 +64,8 @@
 model Racial {
   id            Int       @id @default(autoincrement())
   name          String
-  description   String
+  benefit       String
   race          Race      @relation(fields: [raceId], references: [id])
   raceId        Int
 }
```


