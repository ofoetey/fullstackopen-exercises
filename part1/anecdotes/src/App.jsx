import { useState } from "react";

const NextQuote = ({ viewNext }) => {
  return <button onClick={viewNext}>next anecdote</button>;
};

const Title = ({ title }) => {
  return <h1 className="">{title}</h1>;
};

const VoteSummary = ({ vote }) => {
  const isOne = vote === 1;
  return (
    <p className="">
      has {vote} {isOne ? "vote" : "votes"}
    </p>
  );
};

const VoteAction = ({ handleVote }) => {
  return <button onClick={handleVote}>vote</button>;
};

const Quote = ({ quote }) => {
  return <p className="">{quote}</p>;
};

const ActionButtons = ({ voteAction, viewNext }) => {
  return (
    <>
      <VoteAction handleVote={voteAction} />
      <NextQuote viewNext={viewNext} />
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [grading, setGrading] = useState(Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);

  const viewNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const voteAction = () => {
    const newGrading = [...grading];
    newGrading[selected] += 1;
    setGrading(newGrading);

    const mostVoted = newGrading.indexOf(Math.max(...newGrading));
    console.log("most voted: ", mostVoted);
    setMostVoted(mostVoted);
  };

  return (
    <>
      <div>
        <Title title={`Anecdotes of the day`} />
        <Quote quote={anecdotes[selected]} />
        <ActionButtons viewNext={viewNext} voteAction={voteAction} />
        <VoteSummary vote={grading[selected]} />
      </div>

      <div>
        <Title title={`Anecdotes with most votes`} />
        <Quote quote={anecdotes[mostVoted]} />
        <VoteSummary vote={grading[mostVoted]} />
      </div>
    </>
  );
};

export default App;
