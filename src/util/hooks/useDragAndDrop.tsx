import { useCallback } from "react";
import { useTrack, useTrackActions } from "../store/useTrackStore";

let startIdx = 0;

const useDragAndDrop = () => {
  const { tracks } = useTrack();
  const { setTracks } = useTrackActions();

  const handleOnDragStart = useCallback((e: any) => {
    startIdx = +e.target.dataset?.index;
  }, []);

  const handleOnDrop = (e: any) => {
    const dropIndex = +e.currentTarget.dataset.index;
    console.log("startIndex", startIdx, dropIndex);
    const dragItem = tracks[startIdx]; // list에서 startIndex번째 요소 따로 관리
    const list = [...tracks];
    list.splice(startIdx, 1); // list에서 startIndex번째 요소 제거
    const newListData =
      startIdx < dropIndex
        ? [...list.slice(0, dropIndex - 1), dragItem, ...list.slice(dropIndex - 1, list.length)]
        : [...list.slice(0, dropIndex), dragItem, ...list.slice(dropIndex, list.length)];
    setTracks(newListData);
  };

  return { handleOnDrop, handleOnDragStart };
};
export default useDragAndDrop;
