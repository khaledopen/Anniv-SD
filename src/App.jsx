import { useState } from 'react';
import { birthdayData } from './data/birthdayData';
import IntroScreen from './components/IntroScreen';
import BirthdayHero from './components/BirthdayHero';
import PhotoGallery from './components/PhotoGallery';
import MemoriesTimeline from './components/MemoriesTimeline';
import SpecialMessage from './components/SpecialMessage';
import BirthdayCake from './components/BirthdayCake';
import FinalSurprise from './components/FinalSurprise';
import MusicControl from './components/MusicControl';

export default function App() {
  const [entered, setEntered] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {!entered && <IntroScreen onOpen={() => setEntered(true)} />}

      {entered && (
        <main>
          <BirthdayHero
            data={birthdayData}
            onDiscover={() => scrollToSection('galerie')}
          />
          <PhotoGallery photos={birthdayData.galleryPhotos} />
          <MemoriesTimeline memories={birthdayData.memories} />
          <SpecialMessage message={birthdayData.specialMessage} />
          <FinalSurprise
            message={birthdayData.finalMessage}
            name={birthdayData.birthdayName}
            onReplayMemories={() => scrollToSection('galerie')}
          />
          <BirthdayCake />
          <MusicControl music={birthdayData.backgroundMusic} />
        </main>
      )}
    </div>
  );
}
