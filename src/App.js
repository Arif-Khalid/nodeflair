import { useState, useRef, useLayoutEffect } from "react";
import WrapFlex from "./WrapFlex";
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
      <Job />
    </ul>
  );
}

function Job() {
  return (
    <>
      <li className="job round-border">
        <img src="images/angle_down.png" alt="test"></img>
        <p>Hello</p>
        <div className="type round-border">Backend</div>
        <Skills />
      </li>
    </>
  );
}

function Skills() {
  const skillsArray = ["Node.Js", "ChickenNuggets.js", "SzechaunSauce.js"];
  const ref = useRef(null);
  return (
    <ul className="skillsContainer" ref={ref}>
      <WrapFlex items={skillsArray} className="skill" />
    </ul>
  );
}
