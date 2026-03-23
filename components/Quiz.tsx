"use client";

import { useState } from "react";
import styles from "./Quiz.module.css";

const questions = [
  {
    icon: "👶",
    title: "How old is your child?",
    options: [
      { emoji: "🍼", text: "45 days – 1 year", value: "infant" },
      { emoji: "🧸", text: "1 – 2 years", value: "toddler" },
      { emoji: "🎨", text: "2 – 4 years", value: "preschool" },
      { emoji: "📚", text: "4 – 6 years", value: "pre-kg" },
    ],
  },
  {
    icon: "📍",
    title: "Which area of Dubai is most convenient for you?",
    options: [
      { emoji: "🏙️", text: "Dubai Marina / JBR", value: "marina" },
      { emoji: "🏛️", text: "Downtown / Business Bay", value: "downtown" },
      { emoji: "🌴", text: "Jumeirah / Al Wasl", value: "jumeirah" },
      { emoji: "🗺️", text: "No preference", value: "any" },
    ],
  },
  {
    icon: "🎯",
    title: "What matters most to you in a nursery?",
    options: [
      { emoji: "📖", text: "Strong academic curriculum", value: "curriculum" },
      { emoji: "🎮", text: "Play-based learning", value: "play" },
      { emoji: "🌳", text: "Outdoor & nature activities", value: "outdoor" },
      { emoji: "🌍", text: "Bilingual / Arabic integration", value: "bilingual" },
    ],
  },
  {
    icon: "⏰",
    title: "What schedule works best for your family?",
    options: [
      { emoji: "☀️", text: "Full day (7 AM – 6 PM)", value: "full" },
      { emoji: "🌤️", text: "Half day (7 AM – 1 PM)", value: "half" },
      { emoji: "🔄", text: "Flexible / part-time", value: "flexible" },
      { emoji: "🌙", text: "Extended care available", value: "extended" },
    ],
  },
];

const branchData: Record<string, { name: string; desc: string; link: string }> = {
  marina: {
    name: "Playhouse Marina",
    desc: "Our Marina branch features a stunning rooftop garden, splash zone, and state-of-the-art facilities. Perfect for families in the Dubai Marina & JBR area, offering flexible scheduling and a balanced EYFS curriculum with play-based learning.",
    link: "https://wa.me/971XXXXXXXXX?text=Hi!%20I%20took%20the%20quiz%20and%20I%E2%80%99d%20love%20to%20learn%20more%20about%20Playhouse%20Marina.",
  },
  downtown: {
    name: "Playhouse Downtown",
    desc: "Located in the heart of Business Bay, our Downtown branch offers a dedicated art studio, music room, and bilingual Arabic-English program. Ideal for working parents who need convenient access and extended care options.",
    link: "https://wa.me/971XXXXXXXXX?text=Hi!%20I%20took%20the%20quiz%20and%20I%E2%80%99d%20love%20to%20learn%20more%20about%20Playhouse%20Downtown.",
  },
  jumeirah: {
    name: "Playhouse Jumeirah",
    desc: "Set in a beautiful Beach Road villa, our Jumeirah branch boasts a lush nature garden, cozy library corner, and spacious outdoor play areas. A perfect nurturing environment focused on nature-based learning and creativity.",
    link: "https://wa.me/971XXXXXXXXX?text=Hi!%20I%20took%20the%20quiz%20and%20I%E2%80%99d%20love%20to%20learn%20more%20about%20Playhouse%20Jumeirah.",
  },
};

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const selectOption = (questionIdx: number, value: string) => {
    setAnswers({ ...answers, [questionIdx]: value });
    setTimeout(() => {
      if (questionIdx < questions.length - 1) {
        setCurrent(questionIdx + 1);
      } else {
        setShowResult(true);
      }
    }, 400);
  };

  const reset = () => {
    setCurrent(0);
    setAnswers({});
    setShowResult(false);
  };

  const branch =
    branchData[answers[1]] || branchData.marina;

  const progressPercent = showResult
    ? 100
    : (current / questions.length) * 100;

  return (
    <div className={styles.quizContainer}>
      {/* Progress */}
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className={styles.steps}>
          {questions.map((_, i) => (
            <span
              key={i}
              className={`${styles.step} ${
                i === current && !showResult ? styles.stepActive : ""
              } ${i < current || showResult ? styles.stepCompleted : ""}`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Questions */}
      {!showResult &&
        questions.map((q, qi) => (
          <div
            key={qi}
            className={`${styles.slide} ${qi === current ? styles.slideActive : ""}`}
          >
            <div className={styles.questionIcon}>{q.icon}</div>
            <h3 className={styles.questionTitle}>{q.title}</h3>
            <div className={styles.options}>
              {q.options.map((o) => (
                <button
                  key={o.value}
                  className={`${styles.option} ${
                    answers[qi] === o.value ? styles.optionSelected : ""
                  }`}
                  onClick={() => selectOption(qi, o.value)}
                >
                  <span className={styles.optionEmoji}>{o.emoji}</span>
                  <span className={styles.optionText}>{o.text}</span>
                </button>
              ))}
            </div>
          </div>
        ))}

      {/* Result */}
      {showResult && (
        <div className={styles.result}>
          <div className={styles.confetti}>🎉</div>
          <h3>Your Perfect Match!</h3>
          <div className={styles.resultBranch}>
            <h4>{branch.name}</h4>
            <p>{branch.desc}</p>
          </div>
          <div className={styles.resultActions}>
            <a
              href={branch.link}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp" /> Chat with Us on WhatsApp
            </a>
            <button className="btn btn-outline" onClick={reset}>
              <i className="fas fa-redo" /> Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
