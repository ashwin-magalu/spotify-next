import { millisToMinutesAndSeconds } from "../lib/time";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

const Song = ({ song, order }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(song?.track?.id);
    setIsPlaying(true);

    spotifyApi.play({
      uris: [song?.track.uri],
    });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={() => playSong()}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          src={song?.track?.album?.images?.[0]?.url}
          alt=""
          className="h-10 w-10"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">
            {song?.track?.name}
          </p>
          <p className="w-40">{song?.track?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40">{song?.track?.album?.name}</p>
        <p>{millisToMinutesAndSeconds(song?.track?.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
