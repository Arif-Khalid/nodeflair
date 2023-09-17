import { useState, useRef, useLayoutEffect } from "react";
import WrapFlex from "./WrapFlex";
import useResize from "./useResize";
export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1010);
  function handleResize() {
    if (window.innerWidth < 1010) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  useResize(handleResize);

  return (
    <main className="app">
      <JobList isMobile={isMobile} />
      {isMobile || <div className="job-desc">Man</div>}
    </main>
  );
}

function JobList({ isMobile }) {
  return (
    <ul className={isMobile ? "job-list fill-width" : "job-list"}>
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
        <div className="type round-border vertical-center">Backend</div>
        <Skills />
      </li>
    </>
  );
}

function Skills() {
  const skillsArray = [
    "Node.Js",
    "ChickenNuggets.js",
    "SzechaunSauce.js",
    "wdadsdwadadwadsads",
    "wdguasdawhdusakdhwukadhkawuhd",
  ];
  const ref = useRef(null);
  return (
    <ul className="skillsContainer" ref={ref}>
      {skillsArray.map((item) => (
        <li className="skill round-border">{item}</li>
      ))}
    </ul>
  );
}
