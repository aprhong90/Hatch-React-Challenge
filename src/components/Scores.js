import { useState } from "react";
import "./Scores.css";

const Scores = ({ student }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="Scores">
      <button onClick={() => setOpen(!open)}>
        {open ? (
          <i class="fa-solid fa-minus"></i>
        ) : (
          <i class="fa-solid fa-plus"></i>
        )}
      </button>
      {open ? (
        <ul className="scoreList">
          {student.grades.map((item, index) => (
            <li>
              Test {index + 1}: {item}%
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Scores;
