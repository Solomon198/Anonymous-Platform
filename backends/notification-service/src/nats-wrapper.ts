import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error("Cannot get client before connection");
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this._client?.on("connect", () => {
        console.log("Connected to NATS server");
        resolve(null);
      });
      this._client?.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrappper = new NatsWrapper();
