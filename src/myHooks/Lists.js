import { useState } from "react";

export function useToggleList() {
  const [list, setList] = useState([]);
  const toggleList = (item) => {
    if (list.includes(item)) {
      const updateList = list.filter((id) => id !== item);
      setList(updateList);
    } else {
      setList([...list, item]);
    }
  };
  return {
    list,
    toggleList,
  };
}
