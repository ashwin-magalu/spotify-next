import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-20">
      {playlist?.tracks.items.map((song, i) => (
        <Song song={song} order={i} key={i} />
      ))}
    </div>
  );
};

export default Songs;
