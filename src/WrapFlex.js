import { useEffect, useRef, useState } from "react";
import useResize from "./useResize";

const style = {
  display: "flex",
  flexWrap: "wrap",
  width: "inherit",
};

const etcStyle = {
  position: "absolute",
  right: "30px",
  top: "125px",
};

export default function WrapFlex({
  items,
  gap = "2px",
  paddingLeft = "2px",
  paddingRight = "2px",
  className,
}) {
  const ref = useRef(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    let newWidth = parseInt(paddingLeft) + parseInt(paddingRight);
    for (let i = 0; i < items.length; ++i) {
      const text = document.createElement("span");
      document.body.appendChild(text);
      text.style.font = "times new roman";
      text.style.fontSize = 16 + "px";
      text.style.height = "auto";
      text.style.width = "auto";
      text.style.position = "absolute";
      text.style.whiteSpace = "no-wrap";
      text.innerHTML = items[i];
      text.className = className;
      newWidth += text.getBoundingClientRect().width;
      if (i < items.length - 1) newWidth += parseInt(gap);
      document.body.removeChild(text);
    }
    setCurrentWidth(newWidth);
  }, [items, paddingLeft, paddingRight, className, gap]);
  console.log(currentWidth);
  console.log(availableWidth);
  function handleResize() {
    if (!ref?.current?.getBoundingClientRect().width) return;
    setAvailableWidth(ref?.current?.getBoundingClientRect().width);
  }
  useEffect(handleResize, []);
  useResize(handleResize);
  return (
    <>
      <ul style={{ ...style, gap, paddingLeft, paddingRight }} ref={ref}>
        {items.map((item) => (
          <li className="skill">{item}</li>
        ))}
      </ul>
      {currentWidth > availableWidth && <span style={etcStyle}>...</span>}
    </>
  );
}
