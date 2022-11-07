import { useState } from "react";
import "./Card.css";
import Scores from "./Scores";

const Card = ({ student, addTag, index, average }) => {
  const [tag, setTag] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addTag(tag, index);
    setTag("");
  };

  return (
    <li className="Card">
      <div className="profile-container">
        <div className="image-container">
          <img src={student.pic} alt="student pic" />
        </div>
        <div className="info-container">
          <div className="name">
            {student.firstName} <span>{student.lastName}</span>
          </div>
          <div className="content-container">
            <div>Email: {student.email}</div>
            <div>Company: {student.company}</div>
            <div>Skill: {student.skill}</div>
            <div>Average:{average}%</div>
          </div>
        </div>
      </div>
      <Scores student={student} />
      <ul>
        {student.tagList
          ? student.tagList.map((item) => <li>{item}</li>)
          : null}
      </ul>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Add a tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </form>
    </li>
  );
};

export default Card;
