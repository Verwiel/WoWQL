# Migration `20200819213052-update-race`

This migration has been generated at 8/19/2020, 3:30:52 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200819200637-added-faction--race--and-racials..20200819213052-update-race
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
@@ -37,9 +37,9 @@
   @@unique([linkId, userId])
 }
 model Faction {
-  id            Int  @id @default(autoincrement())
+  id            Int       @id @default(autoincrement())
   name          String
   description   String
   races         Race[]
 }
@@ -48,9 +48,9 @@
   id            Int       @id @default(autoincrement())
   name          String
   description   String
   racials       Racial[]
-  faction       Faction   @relation(fields: [factionId], references: [id])
+  loyalTo       Faction   @relation(fields: [factionId], references: [id])
   factionId     Int
 }
 model Racial {
```


