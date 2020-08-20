# Migration `20200820001008-made-leader-optional`

This migration has been generated at 8/19/2020, 6:10:08 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200820000233-update-racial..20200820001008-made-leader-optional
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
@@ -47,9 +47,9 @@
 model Race {
   id            Int       @id @default(autoincrement())
   name          String
   description   String
-  leader        Leader
+  leader        Leader?
   racials       Racial[]
   loyalTo       Faction   @relation(fields: [factionId], references: [id])
   factionId     Int
 }
```


