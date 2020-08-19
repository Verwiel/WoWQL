# Migration `20200819200637-added-faction--race--and-racials`

This migration has been generated at 8/19/2020, 2:06:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Faction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
)

CREATE TABLE "Race" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "factionId" INTEGER NOT NULL,

FOREIGN KEY ("factionId") REFERENCES "Faction"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Racial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,

FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200819155525-add-vote-model..20200819200637-added-faction--race--and-racials
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
@@ -34,5 +34,29 @@
   user   User @relation(fields: [userId], references: [id])
   userId Int
   @@unique([linkId, userId])
+}
+
+model Faction {
+  id            Int  @id @default(autoincrement())
+  name          String
+  description   String
+  races         Race[]
+}
+
+model Race {
+  id            Int       @id @default(autoincrement())
+  name          String
+  description   String
+  racials       Racial[]
+  faction       Faction   @relation(fields: [factionId], references: [id])
+  factionId     Int
+}
+
+model Racial {
+  id            Int       @id @default(autoincrement())
+  name          String
+  description   String
+  race          Race      @relation(fields: [raceId], references: [id])
+  raceId        Int
 }
```


