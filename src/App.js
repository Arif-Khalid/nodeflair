import { useState, useEffect } from "react";
export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  function handleResize() {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(isMobile);

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
    <li className="job">
      <img src="images/angle_down.png" alt="test"></img>
      <p>Hello</p>
      <div className="type">Backend</div>
      <div className="skills">
        <div className="skill">Node.js</div>
        <div className="skill">Node.js</div>
        <div className="skill">Node.js</div>
      </div>
    </li>
  );
}
