/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Exercises` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[response]` on the table `Exercises` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TableContents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercises_question_key" ON "Exercises"("question");

-- CreateIndex
CREATE UNIQUE INDEX "Exercises_response_key" ON "Exercises"("response");

-- CreateIndex
CREATE UNIQUE INDEX "TableContents_name_key" ON "TableContents"("name");
