import { GET } from "./route";

describe("GET /api/health", () => {
  test("should return status ok", async () => {
    const response = GET();
    const json = await response.json();
    expect(response.status).toBe(200);
    expect(json).toEqual({ status: "ok" });
  });
});
