import { DragEvent } from "react";
import { TrackListStyle } from "@/styles/PlaylistStyle";
import useDragAndDrop from "@/util/hooks/useDragAndDrop";
import { useTrackActions, useTrack } from "@/util/store/useTrackStore";
export default function UpNextTrackList({
  track,
  index,
  children,
  draggable,
}: {
  index: number;
  draggable: boolean;
  track?: ITrack;
  children?: any;
}) {
  const { track: currentTrack } = useTrack();
  const { handleOnDrop, handleOnDragStart } = useDragAndDrop();
  const { handlePlayTrack } = useTrackActions();

  return (
    <TrackListStyle
      style={{ cursor: !!track ? "pointer" : "inherit" }}
      data-index={index}
      draggable={draggable}
      onDragOver={(e) => e.preventDefault()}
      tabIndex={index}
      onDrop={handleOnDrop}
      onDragStart={handleOnDragStart}
      currentTrack={
        !!currentTrack &&
        !!track &&
        currentTrack.id === track.id &&
        currentTrack.sort === track.sort
      }
      onClick={() => !!track && handlePlayTrack(index)}
    >
      {children}
    </TrackListStyle>
  );
}
