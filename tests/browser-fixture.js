/* Browser-only UI fixture. Use solely with the documented localhost test URL. */
(() => {
  if (location.hostname !== "localhost" || location.port !== "3101") return;
  const owner = "11111111-1111-4111-8111-111111111111";
  const user = {
    id: owner,
    email: "journal-test@example.invalid",
    aud: "authenticated",
    role: "authenticated",
    app_metadata: {},
    user_metadata: {},
    created_at: "2026-09-14T00:00:00Z",
  };
  const token =
    btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })) +
    "." +
    btoa(
      JSON.stringify({ sub: owner, exp: Math.floor(Date.now() / 1000) + 3600 }),
    ) +
    ".test";
  localStorage.setItem(
    "sb-127-auth-token",
    JSON.stringify({
      access_token: token,
      refresh_token: "test",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      expires_in: 3600,
      token_type: "bearer",
      user,
    }),
  );
  localStorage.setItem("mydate-locale", "zh");
  const initial = {
    id: "33333333-3333-4333-8333-333333333333",
    user_id: owner,
    source_key: null,
    activity_snapshot: {
      title: "唱片店的下午",
      description: "A quiet afternoon together.",
      memoryPrompt: "Photograph an album.",
    },
    occurred_at: "2026-09-14T12:00:00Z",
    rating: { fun: 5, comfort: 4 },
    moods: ["有点舍不得"],
    note: "我们比预想中多待了很久。",
    memory_prompt_completed: true,
    created_at: "2026-09-14T12:00:00Z",
    updated_at: "2026-09-14T12:00:00Z",
    memory_images: [],
  };
  const records = JSON.parse(
    localStorage.getItem("mydate-test-records") || JSON.stringify([initial]),
  );
  const persist = () =>
    localStorage.setItem("mydate-test-records", JSON.stringify(records));
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = new URL(
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url,
      location.href,
    );
    if (url.origin !== "http://127.0.0.1:3999") return nativeFetch(input, init);
    const headers = new Headers(init.headers);
    const method = init.method || "GET";
    const json = (data, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
      });
    if (url.pathname.includes("/auth/v1/user")) return json(user);
    if (url.pathname.includes("/rest/v1/memories")) {
      const id = url.searchParams.get("id")?.replace("eq.", "");
      if (method === "POST") {
        const body = JSON.parse(init.body);
        const record = {
          ...initial,
          ...body,
          id: crypto.randomUUID(),
          memory_images: [],
        };
        records.push(record);
        persist();
        return json(record, 201);
      }
      if (method === "PATCH") {
        Object.assign(
          records.find((m) => m.id === id),
          JSON.parse(init.body),
        );
        persist();
        return json({ id });
      }
      if (method === "DELETE") {
        const index = records.findIndex((m) => m.id === id);
        records.splice(index, 1);
        persist();
        return json({ id });
      }
      return json(
        headers.get("accept")?.includes("object")
          ? records.find((m) => m.id === id)
          : records,
      );
    }
    if (url.pathname.includes("/rest/v1/memory_images")) {
      if (method === "POST") {
        const body = JSON.parse(init.body);
        const memory = records.find((m) => m.id === body.memory_id);
        if (memory.memory_images.length >= 9)
          return json({ message: "photo_limit" }, 400);
        const photo = {
          ...body,
          ready: false,
          sort_order: memory.memory_images.length,
          created_at: new Date().toISOString(),
        };
        memory.memory_images.push(photo);
        persist();
        return json(photo, 201);
      }
      const id = url.searchParams.get("id")?.replace("eq.", "");
      const memory = records.find((m) =>
        m.memory_images.some((p) => p.id === id),
      );
      if (method === "PATCH")
        Object.assign(
          memory.memory_images.find((p) => p.id === id),
          JSON.parse(init.body),
        );
      if (method === "DELETE")
        memory.memory_images = memory.memory_images.filter((p) => p.id !== id);
      persist();
      return json({ id });
    }
    if (url.pathname.includes("/storage/v1/object")) {
      if (method === "GET")
        return nativeFetch("http://localhost:3102/pixel.png");
      return json({ Key: "test-photo" });
    }
    return json({});
  };
})();
