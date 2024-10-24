-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "file" VARCHAR(255),
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "online" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_FriendsList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FriendsList_AB_unique" ON "_FriendsList"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendsList_B_index" ON "_FriendsList"("B");

-- AddForeignKey
ALTER TABLE "_FriendsList" ADD CONSTRAINT "_FriendsList_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendsList" ADD CONSTRAINT "_FriendsList_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
