(async () => {
  if (!window.PhotoTest)
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "http://localhost:3102/photo-test.js";
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  const results = [];
  const photo = await fetch("http://localhost:3102/sample.heic").then((r) =>
    r.blob(),
  );
  const converted = await window.PhotoTest.normalizePhoto(
    new File([photo], "iphone-sample.heic", { type: "image/heic" }),
  );
  if (
    converted.blob.type !== "image/jpeg" ||
    Math.max(converted.width, converted.height) > 2400
  )
    throw new Error("HEIC normalization failed");
  results.push({
    test: "HEIC converts to normalized JPEG",
    width: converted.width,
    height: converted.height,
    bytes: converted.blob.size,
  });
  for (const type of ["image/jpeg", "image/png", "image/webp"]) {
    const canvas = document.createElement("canvas");
    canvas.width = 3000;
    canvas.height = 1800;
    canvas.getContext("2d").fillRect(0, 0, 3000, 1800);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, type));
    const result = await window.PhotoTest.normalizePhoto(
      new File([blob], "test-photo", { type }),
    );
    if (result.width !== 2400 || result.height !== 1440)
      throw new Error("Resize failed: " + type);
    results.push({ test: type, width: result.width, height: result.height });
  }
  try {
    await window.PhotoTest.normalizePhoto(
      new File(["invalid"], "bad.heic", { type: "image/heic" }),
    );
    throw new Error("Invalid HEIC accepted");
  } catch (error) {
    if (error.message !== "photo_heic") throw error;
    results.push({ test: "Malformed HEIC yields recovery error" });
  }
  return results;
})();
