import { useEffect, useRef, useState } from "react";
import useResize from "./useResize";
import { v4 as uuidv4 } from "uuid";

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
  etcSymbol = "...",
  font = "times new roman",
  fontSize = 16,
  className,
}) {
  const ref = useRef(null);
  const [numItemsToDisplay, setNumItemsToDisplay] = useState(0);
  const [newItemArray, setNewItemArray] = useState([]);
  useEffect(() => {
    let tempArray = [];
    for (let i = 0; i < items.length; ++i) {
      tempArray.push({ item: items[i], key: uuidv4() });
    }
    let currentWidth = parseInt(paddingLeft) + parseInt(paddingRight);
    for (let i = 0; i < items.length; ++i) {
      const text = document.createElement("span");
      document.body.appendChild(text);
      text.style.font = font;
      text.style.fontSize = fontSize + "px";
      text.style.height = "auto";
      text.style.width = "auto";
      text.style.position = "absolute";
      text.style.whiteSpace = "no-wrap";
      text.innerHTML = items[i];
      text.className = className;
      currentWidth += text.getBoundingClientRect().width;
      tempArray[i]["width"] = currentWidth;
      if (i < items.length - 1) currentWidth += parseInt(gap);
      document.body.removeChild(text);
    }
    setNewItemArray(tempArray);
  }, [items, paddingLeft, paddingRight, className, gap, font, fontSize]);

  function handleResize() {
    const availableWidth = ref?.current?.getBoundingClientRect().width;
    if (!availableWidth) return;
    let i = 0;
    while (i < newItemArray.length && newItemArray[i].width <= availableWidth) {
      ++i;
    }
    setNumItemsToDisplay(i);
  }

  // This additionaly useEffect is here so that handleResize is also called after the first render since useResize does not call the function, only add it as an event listener
  useEffect(handleResize, [newItemArray]);
  useResize(handleResize);
  return (
    <>
      <ul style={{ ...style, gap, paddingLeft, paddingRight }} ref={ref}>
        {newItemArray.map(
          (item, i) =>
            i < numItemsToDisplay && (
              <li className={className} key={item.key}>
                {item.item}
              </li>
            )
        )}
        {numItemsToDisplay < newItemArray.length && (
          <li className={className}>{etcSymbol}</li>
        )}
      </ul>
    </>
  );
}
