import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  LogoutIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const spotifyApi = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        setPlaylistId(data.body.items[0]?.id);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] pb-36">
      <div className="space-y-4">
        {session && (
          <button
            onClick={() => signOut()}
            className="flex items-center space-x-2 hover:text-white"
          >
            <LogoutIcon className="h-5 w-5" />
            <p className="hidden md:inline-flex">Logout</p>
          </button>
        )}
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p className="hidden md:inline-flex">Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p className="hidden md:inline-flex">Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p className="hidden md:inline-flex">Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p className="hidden md:inline-flex">Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p className="hidden md:inline-flex">Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p className="hidden md:inline-flex">Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="cursor-pointer hover:text-white flex items-center space-x-2"
            onClick={() => setPlaylistId(playlist.id)}
          >
            <ClipboardListIcon className="h-5 w-5" />
            <p className="hidden md:inline-flex">{playlist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
