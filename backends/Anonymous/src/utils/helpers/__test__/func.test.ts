import {
  addSecondsToDate,
  generateVerificationCode,
  hasTimeElapsed,
} from "../index";

it("Should ensure we generate 4 digit OTP code", () => {
  const code = generateVerificationCode();
  expect(code.length).toEqual(4);
});

it("should return true when current time is greater than provided time and other wise false", () => {
  const timeElapsed = hasTimeElapsed(new Date().toISOString()); // mind you this time will pass when we compare with now
  const timeElapsed2 = hasTimeElapsed(addSecondsToDate(50000).toISOString());
  expect(timeElapsed).toEqual(true);
  expect(timeElapsed2).toEqual(false);
});
