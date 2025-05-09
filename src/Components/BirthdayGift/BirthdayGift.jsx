import { useState, useRef, useEffect } from "react";
import "./BirthdayGift.css";

const songs = [
  { title: "7 Días", url: "/musica/7Días.mp3" },
  { title: "El Perdedor", url: "/musica/Aventura-ElPerdedor.mp3" },
  { title: "Cancioncitas de Amor", url: "/musica/CancioncitasdeAmor.mp3" },
  { title: "Dile al Amor", url: "/musica/DilealAmor.mp3" },
  { title: "El Malo", url: "/musica/ElMalo.mp3" },
  { title: "Hilito", url: "/musica/Hilito.mp3" },
  { title: "Inocente", url: "/musica/Inocente.mp3" },
  { title: "La Diabla", url: "/musica/LaDiabla.mp3" },
  { title: "Llévame Contigo", url: "/musica/LlévameContigo.mp3" },
  { title: "Mi Corazoncito", url: "/musica/MiCorazoncito.mp3" },
  { title: "Su Veneno", url: "/musica/SuVeneno.mp3" },
  { title: "Un Beso", url: "/musica/UnBeso.mp3" },
];

const welcomeAudio = "/musica/audioRomeo.mp3";

export default function BirthdayGift() {
  const [giftOpened, setGiftOpened] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const welcomeAudioRef = useRef(null);

  useEffect(() => {
    // Verificar si ya se reprodujo el audio de bienvenida
    const hasPlayedWelcome = localStorage.getItem('hasPlayedWelcome');
    
    if (!hasPlayedWelcome) {
      welcomeAudioRef.current = new Audio(welcomeAudio);
      welcomeAudioRef.current.play()
        .then(() => {
          localStorage.setItem('hasPlayedWelcome', 'true');
        })
        .catch(error => {
          console.error("Error al reproducir audio de bienvenida:", error);
        });
    }

    // Limpieza al desmontar el componente
    return () => {
      if (welcomeAudioRef.current) {
        welcomeAudioRef.current.pause();
        welcomeAudioRef.current = null;
      }
    };
  }, []);

  const playSong = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const nextSong = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  const prevSong = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  const getRandomColor = () => {
    const colors = ['#ff3e6c', '#fdd835', '#d32f2f', '#64dd17', '#00bcd4', '#9c27b0'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="gift-container">
        <div
        className={`gift-top-box ${giftOpened  ? "opened" : ""}`}
        onMouseEnter={() => setGiftOpened(true)}
        onMouseLeave={() => setGiftOpened(false)}
        >
            <div className="gift-lid"></div>
            <div className="gift-paper">
                🎁<strong>Regalo</strong>🎁<br />
                Siempre lo viste, te he hecho un 
                casete de musica con los mejores exitos 
                de tu amor Romeo Santos, espero 
                te guste 💝
                Dale play!...<br />
                Att: ....

            </div>
        </div>




        <div
        className={`letter-container ${letterOpened ? "opened" : ""}`}
          onMouseEnter={() => 
          setLetterOpened(true)
        }
        onMouseLeave={() => setLetterOpened(false)}
        >
        <div className="envelope">
            <div className="flap"></div>
            <div className="body"></div>
        </div>
        <div className="paper">
         <strong>Feliz Cumpleaños , Yuliana!!</strong>
         <br/>
        <p>Hoy el universo celebra que existes , creo que hasta Romeo Santos estaría celoso de este día 🤣</p>
        <p>Que este año Dios te traiga  , más éxitos que conciertos de bachata , más risas que los TikToks divertidos que compartiamos y
        más bendiciones que estrellas en el cielo</p>
        <p>Ojalá celebres como si estuvieras en primera fila en un concierto de Romeo Santos , pero sin el agite de las personas.</p>
        <p>Si Romeo te dedica un coro hoy , avísame para pedirte el autógrafo 🤭</p>

        <p>No sirvo pa' esto realmente 🤣</p>

        <p>Tú regalo esta en la cajita izquierda  , pasa por ahi 💖</p>

        
         
        </div>
    
        <div className="heart"></div>
  
        <div className="confetti-wrapper">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: getRandomColor()
              }}
            />
          ))}
        </div>
        </div>

      <div className="cassette-player">
        <div className="cassette-body">
          <div className="cassette-window">
            <p>{songs[currentIndex].title}</p>
          </div>
          <div className="controls">
            <button onClick={prevSong}>⏮️</button>
            {isPlaying ? (
              <button onClick={pauseSong}>⏸️</button>
            ) : (
              <button onClick={playSong}>▶️</button>
            )}
            <button onClick={nextSong}>⏭️</button>
          </div>
        </div>
        <audio
          ref={audioRef}
          src={songs[currentIndex].url}
          autoPlay={isPlaying}
          onEnded={nextSong}
        />
      </div>
      
    </div>
  );
}
