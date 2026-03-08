-- CreateTable
CREATE TABLE "Notifacation" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "view" BOOLEAN NOT NULL,
    "senderId" TEXT NOT NULL,
    "touserId" TEXT NOT NULL,

    CONSTRAINT "Notifacation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notifacation" ADD CONSTRAINT "Notifacation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
