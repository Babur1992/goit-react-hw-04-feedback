// import React from 'react';
// import { Component } from 'react';
// import PropTypes from 'prop-types';
// import style from './Feedback.module.css';
// import {
//   Section,
//   FeedbackOptions,
//   Statistics,
//   Notification,
// } from './countFeedback';



// export class Feedback extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   countTotalFeedback = () => {
//     const { good, neutral, bad } = this.state;
//     return good + neutral + bad;
//   };

//   handleFeedback = type => {
//     this.setState(prevState => ({
//       ...prevState,
//       [type]: prevState[type] + 1,
//     }));
//   };

//   countPositiveFeedbackPercentage = () => {
//     const { good } = this.state;
//     const totalFeedback = this.countTotalFeedback();
//     return totalFeedback > 0 ? Math.round((good / totalFeedback) * 100) : 0;
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const totalFeedback = this.countTotalFeedback();
//     const positiveFeedbackPercentage = this.countPositiveFeedbackPercentage();

//     return (
//       <div className={style.content}>
//         <Section title="Please leave feedback">
//           <FeedbackOptions
//             options={['good', 'neutral', 'bad']}
//             onLeaveFeedback={this.handleFeedback}
//           />
//         </Section>

//         <Section title="Statistics">
//           {totalFeedback > 0 ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={totalFeedback}
//               positivePercentage={positiveFeedbackPercentage}
//             />
//           ) : (
//             <Notification message="There is no feedback" />
//           )}
//         </Section>
//       </div>
//     );
//   }
// }

// Feedback.propTypes = {
//   good: PropTypes.number,
//   bad: PropTypes.number,
//   neutral: PropTypes.number,
// };
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


