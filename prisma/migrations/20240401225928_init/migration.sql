-- CreateTable
CREATE TABLE "product" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "price" REAL NOT NULL,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "product_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_modification" (
    "id" SERIAL NOT NULL,
    "product_id" SERIAL NOT NULL,
    "new_price" REAL NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "new_name" TEXT NOT NULL,
    "applied" BOOLEAN,

    CONSTRAINT "product_modification_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_post" (
    "id" SERIAL NOT NULL,
    "product_id" SERIAL NOT NULL,
    "published_at" TIMESTAMP(6),
    "modification_id" SERIAL NOT NULL,

    CONSTRAINT "product_post_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_modification" ADD CONSTRAINT "product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_post" ADD CONSTRAINT "modification_id" FOREIGN KEY ("modification_id") REFERENCES "product_modification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_post" ADD CONSTRAINT "product_id" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
