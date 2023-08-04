
import React, { useState } from 'react';
import style from './Feedback.module.css';

export const Feedback = () => {
  const [feedbackOptions, setFeedbackOptions] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleFeedback = option => {
    setFeedbackOptions(prevOptions => ({
      ...prevOptions,
      [option]: prevOptions[option] + 1,
    }));
  };

  const { good, neutral, bad } = feedbackOptions;
  const total = good + neutral + bad;
  const positivePercentage = total > 0 ? Math.round((good / total) * 100) : 0;

  return (
    <div>
      <Section title="Leave Feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedback}
        />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="No feedback given yet." />
        )}
      </Section>
    </div>
  );
};

export const Section = ({ title, children }) => (
  <div>
    <h2>{title}</h2>
    {children}
  </div>
);

export const FeedbackOptions = ({ options, onLeaveFeedback }) => (
  <div>
    {options.map(option => (
      <button
        className={style.button}
        key={option}
        onClick={() => onLeaveFeedback(option)}
      >
        {option}
      </button>
    ))}
  </div>
);

export const Statistics = ({ good, neutral, bad, total, positivePercentage }) => (
  <section className={style.container}>
    <div className={style.content}>
      <p className={style.textBtn}>Good: {good}</p>
      <p className={style.textBtn}>Neutral: {neutral}</p>
      <p className={style.textBtn}>Bad: {bad}</p>
      <p className={style.totalText}>Total Feedback: {total}</p>
      <p className={style.totalText}>
        Positive Feedback Percentage: {positivePercentage}%
      </p>
    </div>
  </section>
);

export const Notification = ({ message }) => <p>{message}</p>;


