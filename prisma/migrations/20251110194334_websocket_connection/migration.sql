-- CreateTable
CREATE TABLE "web_socket_connections" (
    "id" TEXT NOT NULL,
    "connectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "web_socket_connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "web_socket_connections_connectionId_key" ON "web_socket_connections"("connectionId");
