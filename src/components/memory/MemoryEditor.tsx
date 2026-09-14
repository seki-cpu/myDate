"use client";
import { useState, type FormEvent } from "react";
import type { JournalInput, JournalMemory } from "../../types/domain";
import { dateIdeas } from "../../data/dateIdeas";
import { localizeIdea, useLocale } from "../ui/locale";
import { journalCopy } from "./journalCopy";

export function MemoryEditor({
  memory,
  save,
  cancel,
}: {
  memory?: JournalMemory;
  save: (input: JournalInput) => Promise<void>;
  cancel: () => void;
}) {
  const locale = useLocale();
  const t = journalCopy[locale];
  const [title, setTitle] = useState(memory?.activity_snapshot.title ?? "");
  const [activityId, setActivityId] = useState("");
  const [mode, setMode] = useState("freeform");
  const [date, setDate] = useState(
    memory?.occurred_at.slice(0, 10) ?? new Date().toLocaleDateString("en-CA"),
  );
  const [moods, setMoods] = useState<string[]>(memory?.moods ?? []);
  const [mood, setMood] = useState("");
  const [note, setNote] = useState(memory?.note ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  function addMood(value: string) {
    if (value.trim() && !moods.includes(value) && moods.length < 30) {
      setMoods([...moods, value]);
      setMood("");
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const idea =
        mode === "activity"
          ? dateIdeas.find((item) => item.id === activityId)
          : undefined;
      const localized = idea ? localizeIdea(idea, locale) : undefined;
      const snapshot =
        memory?.activity_snapshot ??
        (localized
          ? {
              identity: { source: "builtin" as const, id: localized.id },
              title: localized.title,
              description: localized.description,
              memoryPrompt: localized.photoPrompt,
            }
          : { title });

      await save({
        activity_snapshot: snapshot,
        occurred_at:
          memory && date === memory.occurred_at.slice(0, 10)
            ? memory.occurred_at
            : new Date(`${date}T12:00:00`).toISOString(),
        moods,
        note,
        rating: memory?.rating ?? {},
        memory_prompt_completed: memory?.memory_prompt_completed ?? false,
      });
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="journal-panel journal-form" onSubmit={submit}>
      <p>{t.optional}</p>
      {!memory && (
        <>
          <label>
            {t.add}
            <select value={mode} onChange={(event) => setMode(event.target.value)}>
              <option value="freeform">{t.freeform}</option>
              <option value="activity">{t.activity}</option>
            </select>
          </label>
          {mode === "activity" ? (
            <label>
              {t.activity}
              <select
                required
                value={activityId}
                onChange={(event) => setActivityId(event.target.value)}
              >
                <option value="">{t.selected}</option>
                {dateIdeas.map((idea) => (
                  <option value={idea.id} key={idea.id}>
                    {localizeIdea(idea, locale).title}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label>
              {t.titleLabel}
              <input
                required
                maxLength={300}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </label>
          )}
        </>
      )}

      <label>
        {t.date}
        <input
          type="date"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>

      <fieldset>
        <legend>{t.moods}</legend>
        <div className="journal-chips">
          {moods.map((value, index) => (
            <button
              type="button"
              key={index}
              aria-label={`${t.removeMood}: ${value}`}
              onClick={() => setMoods(moods.filter((_, itemIndex) => itemIndex !== index))}
            >
              {value} ×
            </button>
          ))}
        </div>
        <div className="journal-chips">
          {t.suggested.map((value) => (
            <button
              type="button"
              key={value}
              disabled={moods.includes(value) || moods.length >= 30}
              onClick={() => addMood(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="journal-inline">
          <input
            aria-label={t.addMood}
            maxLength={300}
            value={mood}
            onChange={(event) => setMood(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addMood(mood);
              }
            }}
          />
          <button
            type="button"
            disabled={!mood.trim() || moods.length >= 30}
            onClick={() => addMood(mood)}
          >
            {t.addMood}
          </button>
        </div>
      </fieldset>

      <label>
        {t.note}
        <textarea
          rows={6}
          maxLength={20000}
          placeholder={t.noteHint}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>

      {error && <p role="alert">{t.failed}</p>}
      <button
        className="primary-button"
        disabled={busy || (!memory && mode === "freeform" && !title.trim())}
      >
        {busy ? t.loading : t.save}
      </button>
      <button
        type="button"
        className="secondary-button"
        disabled={busy}
        onClick={cancel}
      >
        {t.cancel}
      </button>
    </form>
  );
}
