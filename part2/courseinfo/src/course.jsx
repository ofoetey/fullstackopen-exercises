export const Course = ({ course }) => {
  return (
    <div className="">
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export const Header = ({ title }) => {
  return <h1 className="">{title}</h1>;
};

export const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

export const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part name={part.name} exercises={part.exercises} />;
      })}
    </>
  );
};
