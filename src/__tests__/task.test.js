// src/__tests__/task.test.js

const request = require("supertest");

const { app } = require("../app");

describe("Task API", () => {
  test("POST /tasks creates a task when title is non-empty", async () => {
    const res = await request(app).post("/tasks").send({ title: "Buy milk" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: "Buy milk", done: false });
    expect(res.body.id).toBeDefined();
  });

  test("POST /tasks rejects empty title", async () => {
    const res = await request(app).post("/tasks").send({ title: "   " });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/title/i);
  });

  test("PATCH /tasks/:id sets done true", async () => {
    const created = await request(app).post("/tasks").send({ title: "Buy milk" });
    const id = created.body.id;

    const res = await request(app).patch(`/tasks/${id}`).send({ done: true });
    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);  // Check if the task's done status is true
  });

  test("PATCH /tasks/:id unknown id returns 404", async () => {
    const res = await request(app).patch("/tasks/999").send({ done: true });
    expect(res.status).toBe(404);  // Test for unknown task ID
  });
});
