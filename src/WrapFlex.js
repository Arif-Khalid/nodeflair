import { useEffect, useRef, useState } from "react";
import useResize from "./useResize";

const style = {
  display: "flex",
  flexWrap: "wrap",
  width: "inherit",
};

export default function WrapFlex({
  items,
  gap = "2px",
  paddingLeft = "2px",
  paddingRight = "2px",
  className,
}) {
  const ref = useRef(null);
  const [numItemsToDisplay, setNumItemsToDisplay] = useState(0);
  const [widthArray, setWidthArray] = useState(0);

  useEffect(() => {
    let currentWidth = parseInt(paddingLeft) + parseInt(paddingRight);
    let tempWidthArray = [];
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
      currentWidth += text.getBoundingClientRect().width;
      tempWidthArray.push(currentWidth);
      if (i < items.length - 1) currentWidth += parseInt(gap);
      document.body.removeChild(text);
    }
    setWidthArray(tempWidthArray);
  }, [items, paddingLeft, paddingRight, className, gap]);
  console.log(widthArray);
  console.log(numItemsToDisplay);
  function handleResize() {
    const availableWidth = ref?.current?.getBoundingClientRect().width;
    if (!availableWidth) return;
    let i = 0;
    while (i < widthArray.length && widthArray[i] <= availableWidth) {
      ++i;
    }
    setNumItemsToDisplay(i);
  }
  useEffect(handleResize, []);
  useResize(handleResize);
  return (
    <>
      <ul style={{ ...style, gap, paddingLeft, paddingRight }} ref={ref}>
        {items.map(
          (item, i) =>
            i < numItemsToDisplay && <li className={className}>{item}</li>
        )}
        {numItemsToDisplay < items.length && <li className={className}>...</li>}
      </ul>
    </>
  );
}
