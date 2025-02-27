import Sqids from "sqids";

const sqids = new Sqids({
  minLength: 10,
});

export const encode = (number: number) => sqids.encode([number]);
export const decode = (id: string) => sqids.decode(id);
