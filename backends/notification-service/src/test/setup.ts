jest.mock("../nats-wrapper.ts");
jest.mock("@crazy-devz/external-clients", () => ({
  mailTrapClient: jest.fn().mockImplementation((authToken: string) => ({
    sendMail: jest.fn().mockImplementation((mailInfo: any) => ({})),
  })),
  twilioClient: jest.fn().mockImplementation((config: any) => ({
    sendSMS: jest.fn().mockImplementation((payload: any) => ({})),
  })),
}));
beforeAll(async () => {
  process.env.JWT_KEY = "YXNkZg==";
  process.env.TWILLIO_AUTH_TOKEN = "ZGVmYXVsdHZhbHVl";
  process.env.TWILLIO_SSID = "ZGVmYXVsdHZhbHVl";
  process.env.MAIL_TRAP_TOKEN = "ZGVmYXVsdHZhbHVl";
  process.env.SENDER_ADDRESS = "ZGVmYXVsdHZhbHVl";
  process.env.TWILLIO_SENDER_PHONENUMBER = "ZGVmYXVsdHZhbHVl";
});

beforeEach(async () => {
  jest.clearAllMocks();
});

afterAll(async () => {});
