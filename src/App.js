import { useState, useRef, useLayoutEffect } from "react";
import useResize from "./useResize";
export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);
  function handleResize() {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  useResize(handleResize);

  return (
    <main className="app">
      <JobList />
      {isMobile || <div className="job-desc">Man</div>}
    </main>
  );
}

function JobList() {
  return (
    <ul className="job-list">
      <Job />
    </ul>
  );
}

function Job() {
  return (
    <li className="job round-border">
      <img src="images/angle_down.png" alt="test"></img>
      <p>Hello</p>
      <div className="type round-border">Backend</div>
      <Skills />
    </li>
  );
}

function Skills() {
  const skillsArray = ["Node.Js", "ChickenNuggets.js", "SzechaunSauce.js"];
  const [numberOfItemsDisplayed, setNumberOfItemsDisplayed] = useState(0);
  const ref = useRef(null);
  function handleResize() {
    const cells = ref.current?.children;
    if (cells && cells.length > 0) {
      const startingOffset = cells[0].offsetTop;
      let numItems = 0;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].offsetTop > startingOffset) {
          break;
        }
        numItems++;
      }
      setNumberOfItemsDisplayed(numItems);
    }
  }
  useResize(handleResize);
  console.log(numberOfItemsDisplayed);
  return (
    <ul className="skills" ref={ref}>
      {skillsArray.map((skill, i) => (
        <li className={i < numberOfItemsDisplayed ? "skill" : "skill hide"}>
          {skill}
        </li>
      ))}
    </ul>
  );
}
