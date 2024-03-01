'use client'
import { useAudioPlayer } from './AudioPlayerContext';
import AudioPlayer from 'react-h5-audio-player';

const Player = () => {
  const {
    currentUrl
  } = useAudioPlayer();

//   useEffect(() => {
//     if (currentUrl != '') {

//     }
//   }, [currentUrl]);


  return (
    <>
      <div>
        <div className='fixed left-0 bottom-0 w-screen'>
        <AudioPlayer
          // autoPlay
          // .m4a
          src={currentUrl}
          // onEnded={handleNextSong}
          showSkipControls
          // onClickNext={handleNextSong}
          // onClickPrevious={handlePrevSong}
          showJumpControls={false}
        />
      </div>
    </div >
    </>
  );
};

export default Player;
