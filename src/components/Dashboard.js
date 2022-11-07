import "./Dashboard.css";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredByName, setFilteredByName] = useState([]);
  const [filteredByTag, setFilteredByTag] = useState([]);

  const getStudents = async () => {
    return (await axios.get("https://api.hatchways.io/assessment/students"))
      .data.students;
  };

  const calculateAverage = (grades) => {
    const average =
      grades.reduce((pre, cur) => parseInt(pre) + parseInt(cur), 0) /
      grades.length;
    return average;
  };

  const addTag = (newTag, index) => {
    const newStudents = students;
    newStudents[index].tagList.push(newTag);
    setStudents(newStudents);
  };

  const nameFilterHandler = (nameString) => {
    if (nameString) {
      const filteredStudentsByName = [];
      students.map((student) => {
        const fullName =
          `${student.firstName} ${student.lastName}`.toLowerCase();
        if (fullName.indexOf(nameString.toLowerCase()) !== -1) {
          filteredStudentsByName.push(student);
        }
      });

      const filteredByNameAndTag = [];
      filteredByTag.map((student) => {
        const fullName =
          `${student.firstName} ${student.lastName}`.toLowerCase();
        if (fullName.indexOf(nameString.toLowerCase()) !== -1) {
          filteredByTag.push(student);
        }
      });

      setFilteredByName(filteredStudentsByName);
      setFilteredStudents(filteredByNameAndTag);
      console.log(filteredByName);
      console.log(filteredStudents);
    } else {
      setFilteredByName(students);
      setFilteredStudents(filteredByTag);
    }
  };

  const tagFilterHandler = (tagString) => {
    if (tagString) {
      const filteredStudentsByTag = [];
      students.map((student) => {
        let isThereTag = false;
        student.tagList.map((tag) => {
          if (tag.toLowerCase().indexOf(tagString.toLowerCase()) !== -1) {
            isThereTag = true;
          }
        });
        if (isThereTag) {
          filteredStudentsByTag.push(student);
        }
      });
      const filteredByTagAndName = [];
      filteredByName.map((student) => {
        let isThereTag = false;
        student.tagList.map((tag) => {
          if (tag.toLowerCase().indexOf(tagString.toLowerCase()) !== -1) {
            isThereTag = true;
          }
        });
        if (isThereTag) {
          filteredByTagAndName.push(student);
        }
      });
      setFilteredByTag(filteredStudentsByTag);
      setFilteredStudents(filteredByTagAndName);
    } else {
      setFilteredByTag(students);
      setFilteredStudents(filteredByName);
    }
  };

  const getAndSetStudents = () => {
    getStudents().then((res) => {
      const newStudents = [];
      res.map((student) => {
        const modifiedStudent = student;
        modifiedStudent.tagList = [];
        newStudents.push(modifiedStudent);
      });
      setStudents(newStudents);
      setFilteredStudents(newStudents);
      setFilteredByName(newStudents);
      setFilteredByTag(newStudents);
    });
  };

  useEffect(() => {
    getAndSetStudents();
  }, []);

  return (
    <div className="Dashboard">
      <SearchBar label={"name"} onChangeHandler={nameFilterHandler} />
      <SearchBar label={"tag"} onChangeHandler={tagFilterHandler} />
      <ul className="studentsCard">
        {filteredStudents.map((student, index) => (
          <Card
            key={index}
            addTag={addTag}
            index={index}
            student={student}
            average={calculateAverage(student.grades)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
