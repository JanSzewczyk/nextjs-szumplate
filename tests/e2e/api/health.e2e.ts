import { expect, test } from "@playwright/test";

/**
 * API Tests for Health Check Endpoint
 *
 * Route Handler: app/api/health/route.ts
 * Methods: GET
 * Authentication: Not required (public endpoint)
 *
 * This endpoint is used by monitoring tools to verify service availability.
 * It is available at multiple URL aliases per CLAUDE.md configuration.
 */

const HEALTH_ENDPOINTS = ["/api/health", "/healthz", "/api/healthz", "/health", "/ping"];

test.describe("API: Health Check", () => {
  test.describe("Core Functionality", () => {
    test("returns 200 status with correct response structure", async ({ request }) => {
      const response = await request.get("/api/health");

      expect(response.status()).toBe(200);
      expect(response.ok()).toBe(true);

      const body = await response.json();

      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("timestamp");
      expect(body.status).toBe("ok");
    });

    test("returns valid ISO 8601 timestamp", async ({ request }) => {
      const beforeRequest = new Date();
      const response = await request.get("/api/health");
      const afterRequest = new Date();

      const body = await response.json();
      const timestamp = new Date(body.timestamp);

      // Timestamp should be valid date
      expect(timestamp.toString()).not.toBe("Invalid Date");

      // Timestamp should be recent (within request timeframe with 1s buffer)
      expect(timestamp.getTime()).toBeGreaterThanOrEqual(beforeRequest.getTime() - 1000);
      expect(timestamp.getTime()).toBeLessThanOrEqual(afterRequest.getTime() + 1000);

      // Timestamp should match ISO format
      expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    test("returns application/json content type", async ({ request }) => {
      const response = await request.get("/api/health");

      expect(response.headers()["content-type"]).toContain("application/json");
    });

    test("can be called repeatedly without side effects", async ({ request }) => {
      const responses = await Promise.all([
        request.get("/api/health"),
        request.get("/api/health"),
        request.get("/api/health")
      ]);

      for (const response of responses) {
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.status).toBe("ok");
      }
    });
  });

  test.describe("URL Aliases", () => {
    for (const endpoint of HEALTH_ENDPOINTS) {
      test(`${endpoint} returns healthy response`, async ({ request }) => {
        const response = await request.get(endpoint);

        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body).toMatchObject({
          status: "ok",
          timestamp: expect.any(String)
        });
      });
    }
  });

  test.describe("HTTP Method Handling", () => {
    test("POST request returns 405 Method Not Allowed", async ({ request }) => {
      const response = await request.post("/api/health", { data: {} });

      expect(response.status()).toBe(405);
    });

    test("PUT request returns 405 Method Not Allowed", async ({ request }) => {
      const response = await request.put("/api/health", { data: {} });

      expect(response.status()).toBe(405);
    });

    test("DELETE request returns 405 Method Not Allowed", async ({ request }) => {
      const response = await request.delete("/api/health");

      expect(response.status()).toBe(405);
    });
  });
});
