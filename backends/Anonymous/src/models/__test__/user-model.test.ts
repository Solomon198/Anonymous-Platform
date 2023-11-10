import { User } from "../user";

it("Should ensure Otimistic concurrency control is implemented on the user model", async () => {
  const user = User.build({
    phoneNumber: "09050709333",
    password: "kdkdkdkdkdkdk",
    status: {
      isVerified: false,
      ttl: new Date().toISOString(),
    },
  });
  const doc = await user.save();
  expect(doc.version).toEqual(0);
  doc.version = 0;
  await doc.save();
  expect(doc.version).toEqual(1);
});
