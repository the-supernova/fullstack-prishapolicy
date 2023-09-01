import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "@/utils/prisma";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.text}`,
      };
    }),
  getBooks: procedure.query(async () => {
    return await prisma.book.findMany();
  }),
  getBook: procedure.input(z.string()).query(async (opts) => {
    return await prisma.book.findUnique({
      where: {
        id: opts.input,
      },
    });
  }),
  postBookData: procedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        description: z.string(),
        readtime: z.number(),
      })
    )
    .mutation(async (opts) => {
      return await prisma.book.create({
        data: {
          title: opts.input.title,
          author: opts.input.author,
          description: opts.input.description,
          readtime: opts.input.readtime,
          cover: "",
          pdf: "",
        },
      });
    }),
    updateWithFiles: procedure.input(z.object({
        id: z.string(),
        cover: z.string(),
        pdf: z.string(),
    })).mutation(async (opts) => {
        return await prisma.book.update({
            where: {
                id: opts.input.id
            },
            data: {
                cover: opts.input.cover,
                pdf: opts.input.pdf,
            }
        })
    })
});

export type AppRouter = typeof appRouter;
