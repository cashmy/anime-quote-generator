import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { animeTitles } from './components/store';
import Homepage from './components/pages/home';
import Animepage from './components/pages/anime';


const App = () => {
  const setTitles = useSetRecoilState(animeTitles);


  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const res = await axios.get('https://animechan.vercel.app/api/available/anime');
        setTitles(res?.data);
      } catch (err) {
        console.log("API fetch err for animes: ", err);
      }
    }
    fetchAnimes();
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={Homepage} />
        <Route exact path="/anime/:name" element={Animepage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;