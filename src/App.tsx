import './App.css'
import Navigation from './pages/Navigater/Navigater'
import SchedulePage from './pages/SchedulePage/SchedulePage'
import Mypage from './pages/Mypage/Mypage'
import MypageGather from './pages/Mypage/MypageGather'
import { Routes, Route } from 'react-router-dom'
import Container from './layouts/bodyContainer'
const App = () => {
  return (
    <div>
      <Container>
        <Navigation />
        <Routes>
          {/* 일정 공유 페이지 */}
          <Route
            path='/schedule'
            element={<SchedulePage />}
          ></Route>
          {/* 마이페이지 */}
          <Route
            path='/mypage'
            element={<Mypage />}
          ></Route>
          <Route
            path='/mypage/gather'
            element={<MypageGather />}
          ></Route>
        </Routes>
      </Container>
    </div>
  )
}

export default App
