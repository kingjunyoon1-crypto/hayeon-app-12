import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [branch, setBranch] = useState('병점');
  const [activeTab, setActiveTab] = useState('home');
  const [members, setMembers] = useState([
    { id: 1, name: '김철수', phone: '010-1234-5678', joinDate: '2024-01-15', status: '활성', membership: 'PT 12회', branch: '병점', condition: 'good' },
    { id: 2, name: '이영희', phone: '010-2345-6789', joinDate: '2024-02-20', status: '활성', membership: '정액 3개월', branch: '병점', condition: 'normal' },
    { id: 3, name: '박민준', phone: '010-3456-7890', joinDate: '2024-01-10', status: '활성', membership: 'PT 20회', branch: '진안', condition: 'bad' },
  ]);
  
  const [schedule, setSchedule] = useState([
    { id: 1, clientName: '김철수', date: '2026-05-09', time: '10:00', trainer: '왕준', branch: '병점', completed: false },
    { id: 2, clientName: '이영희', date: '2026-05-09', time: '14:00', trainer: '왕준', branch: '병점', completed: false },
    { id: 3, clientName: '박민준', date: '2026-05-10', time: '09:00', trainer: '하현', branch: '진안', completed: false },
  ]);
  
  const [revenue, setRevenue] = useState([
    { id: 1, date: '2026-05-01', amount: 450000, category: 'PT수강', branch: '병점', member: '김철수' },
    { id: 2, date: '2026-05-05', amount: 150000, category: '회원비', branch: '병점', member: '이영희' },
    { id: 3, date: '2026-05-08', amount: 300000, category: 'PT수강', branch: '진안', member: '박민준' },
  ]);

  const [workoutLog, setWorkoutLog] = useState([
    { id: 1, member: '김철수', date: '2026-05-08', exercise: '스쿼트', sets: 4, reps: 12, weight: 80, notes: '좋은 자세', branch: '병점' },
    { id: 2, member: '이영희', date: '2026-05-07', exercise: '벤치프레스', sets: 3, reps: 10, weight: 50, notes: '무게 증가', branch: '병점' },
  ]);

  const [dietAnalysis, setDietAnalysis] = useState([
    { id: 1, member: '김철수', date: '2026-05-08', foodName: '닭가슴살 200g', calories: 330, protein: 62, carbs: 0, fat: 7, image: '🍗', branch: '병점' },
    { id: 2, member: '이영희', date: '2026-05-07', foodName: '계란 2개', calories: 155, protein: 13, carbs: 1.1, fat: 11, image: '🥚', branch: '병점' },
  ]);

  const [workoutFeedback, setWorkoutFeedback] = useState([
    { id: 1, member: '김철수', date: '2026-05-08', exercise: '스쿼트', videoUrl: 'video1.mp4', feedback: '무릎 각도 좋습니다. 계속 유지하세요!', branch: '병점' },
    { id: 2, member: '이영희', date: '2026-05-07', exercise: '벤치프레스', videoUrl: 'video2.mp4', feedback: '가슴이 벤치에 닿게 더 내려주세요.', branch: '병점' },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: '왕준', text: '오늘 PT 수업 좋았습니다!', timestamp: '10:30', branch: '병점' },
    { id: 2, sender: '김철수', text: '감사합니다!', timestamp: '10:35', branch: '병점' },
    { id: 3, sender: '하현', text: '진안점 회원 상담 완료', timestamp: '14:00', branch: '진안' },
  ]);

    { id: 1, title: '출석 완료', message: '김철수님이 오늘 10:00 PT에 출석했습니다.', time: '10:05', branch: '병점' },
    { id: 2, title: '컨디션 경고', message: '박민준님의 컨디션이 좋지 않습니다.', time: '08:30', branch: '진안' },
  ]);

  const [newMember, setNewMember] = useState({ name: '', phone: '', membership: 'PT 12회' });
  const [newSchedule, setNewSchedule] = useState({ clientName: '', date: '', time: '', trainer: '' });
  const [newRevenue, setNewRevenue] = useState({ amount: '', date: '', category: 'PT수강', member: '' });
  const [newMessage, setNewMessage] = useState('');
  const [newWorkout, setNewWorkout] = useState({ member: '', date: '', exercise: '', sets: '', reps: '', weight: '', notes: '' });
  const [newDiet, setNewDiet] = useState({ member: '', date: '', foodName: '', image: null });
  const [newFeedback, setNewFeedback] = useState({ member: '', date: '', exercise: '', videoFile: null, feedback: '' });
  const [selectedMember, setSelectedMember] = useState(null);
  const messagesEndRef = useRef(null);
  const dietImageRef = useRef(null);
  const feedbackVideoRef = useRef(null);

  const filteredMembers = members.filter(m => m.branch === branch);
  const filteredSchedule = schedule.filter(s => s.branch === branch);
  const filteredRevenue = revenue.filter(r => r.branch === branch);
  const filteredWorkout = workoutLog.filter(w => w.branch === branch);
  const filteredDiet = dietAnalysis.filter(d => d.branch === branch);
  const filteredFeedback = workoutFeedback.filter(f => f.branch === branch);
  const filteredMessages = messages.filter(m => m.branch === branch);
  const filteredNotifications = notifications.filter(n => n.branch === branch);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  const addMember = () => {
    if (newMember.name && newMember.phone) {
      const member = {
        id: Math.max(...members.map(m => m.id), 0) + 1,
        ...newMember,
        joinDate: new Date().toISOString().split('T')[0],
        status: '활성',
        branch: branch,
        condition: 'normal'
      };
      setMembers([...members, member]);
      setNewMember({ name: '', phone: '', membership: 'PT 12회' });
      addNotification('신규 회원', `${newMember.name}님이 등록되었습니다.`);
    }
  };

  const addSchedule = () => {
    if (newSchedule.clientName && newSchedule.date && newSchedule.time) {
      setSchedule([...schedule, {
        id: Math.max(...schedule.map(s => s.id), 0) + 1,
        ...newSchedule,
        trainer: newSchedule.trainer || '왕준',
        branch: branch,
        completed: false
      }]);
      setNewSchedule({ clientName: '', date: '', time: '', trainer: '' });
    }
  };

  const addRevenue = () => {
    if (newRevenue.amount && newRevenue.date && newRevenue.member) {
      setRevenue([...revenue, {
        id: Math.max(...revenue.map(r => r.id), 0) + 1,
        amount: parseInt(newRevenue.amount),
        date: newRevenue.date,
        category: newRevenue.category,
        member: newRevenue.member,
        branch: branch
      }]);
      setNewRevenue({ amount: '', date: '', category: 'PT수강', member: '' });
    }
  };

  const addWorkout = () => {
    if (newWorkout.member && newWorkout.date && newWorkout.exercise) {
      setWorkoutLog([...workoutLog, {
        id: Math.max(...workoutLog.map(w => w.id), 0) + 1,
        ...newWorkout,
        sets: parseInt(newWorkout.sets) || 0,
        reps: parseInt(newWorkout.reps) || 0,
        weight: parseInt(newWorkout.weight) || 0,
        branch: branch
      }]);
      setNewWorkout({ member: '', date: '', exercise: '', sets: '', reps: '', weight: '', notes: '' });
      addNotification('운동일지', `${newWorkout.member}님의 운동이 기록되었습니다.`);
    }
  };

  const addDietAnalysis = () => {
    if (newDiet.member && newDiet.date && newDiet.foodName && newDiet.image) {
      // 간단한 AI 칼로리 분석 (실제로는 더 정교할 수 있음)
      const foodDatabase = {
        '닭가슴살': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
        '계란': { calories: 77.5, protein: 6.3, carbs: 0.6, fat: 5.3 },
        '밥': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
        '고구마': { calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
        '소고기': { calories: 250, protein: 26, carbs: 0, fat: 17 },
        '생선': { calories: 82, protein: 17, carbs: 0, fat: 0.7 },
      };

      let calories = 100, protein = 10, carbs = 10, fat = 5;
      
      Object.keys(foodDatabase).forEach(food => {
        if (newDiet.foodName.includes(food)) {
          const data = foodDatabase[food];
          calories = data.calories;
          protein = data.protein;
          carbs = data.carbs;
          fat = data.fat;
        }
      });

      setDietAnalysis([...dietAnalysis, {
        id: Math.max(...dietAnalysis.map(d => d.id), 0) + 1,
        member: newDiet.member,
        date: newDiet.date,
        foodName: newDiet.foodName,
        calories: Math.round(calories),
        protein: protein,
        carbs: carbs,
        fat: fat,
        image: newDiet.image,
        branch: branch
      }]);
      setNewDiet({ member: '', date: '', foodName: '', image: null });
      addNotification('식단 분석', `${newDiet.member}님의 식단이 분석되었습니다.`);
    }
  };

  const addWorkoutFeedback = () => {
    if (newFeedback.member && newFeedback.date && newFeedback.exercise && newFeedback.videoFile) {
      setWorkoutFeedback([...workoutFeedback, {
        id: Math.max(...workoutFeedback.map(f => f.id), 0) + 1,
        member: newFeedback.member,
        date: newFeedback.date,
        exercise: newFeedback.exercise,
        videoUrl: newFeedback.videoFile.name,
        feedback: newFeedback.feedback || '피드백 대기 중',
        branch: branch
      }]);
      setNewFeedback({ member: '', date: '', exercise: '', videoFile: null, feedback: '' });
      addNotification('운동 영상', `${newFeedback.member}님의 운동 영상이 업로드되었습니다.`);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      setMessages([...messages, {
        id: Math.max(...messages.map(m => m.id), 0) + 1,
        sender: '관리자',
        text: newMessage,
        timestamp: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
        branch: branch
      }]);
      setNewMessage('');
    }
  };

  const addNotification = (title, message) => {
    const notification = {
      id: Math.max(...notifications.map(n => n.id), 0) + 1,
      title,
      message,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      branch: branch
    };
    setNotifications([notification, ...notifications]);
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message, icon: '🏋️' });
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const toggleAttendance = (id) => {
    setSchedule(schedule.map(s => {
      if (s.id === id) {
        if (!s.completed) {
          addNotification('출석 완료', `${s.clientName}님의 출석이 확인되었습니다.`);
        }
        return { ...s, completed: !s.completed };
      }
      return s;
    }));
  };

  const setMemberCondition = (id, condition) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        if (condition === 'bad') {
          addNotification('컨디션 경고', `${m.name}님의 컨디션이 좋지 않습니다.`);
        }
        return { ...m, condition };
      }
      return m;
    }));
  };

  const deleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const deleteSchedule = (id) => {
    setSchedule(schedule.filter(s => s.id !== id));
  };

  const deleteRevenue = (id) => {
    setRevenue(revenue.filter(r => r.id !== id));
  };

  const deleteWorkout = (id) => {
    setWorkoutLog(workoutLog.filter(w => w.id !== id));
  };

  const deleteDiet = (id) => {
    setDietAnalysis(dietAnalysis.filter(d => d.id !== id));
  };

  const deleteFeedback = (id) => {
    setWorkoutFeedback(workoutFeedback.filter(f => f.id !== id));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const totalRevenue = filteredRevenue.reduce((sum, r) => sum + r.amount, 0);
  const totalDietCalories = filteredDiet.reduce((sum, d) => sum + d.calories, 0);
  const todaySchedule = filteredSchedule.filter(s => s.date === new Date().toISOString().split('T')[0]);
  const badConditionMembers = filteredMembers.filter(m => m.condition === 'bad');

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>팀에이치짐</h1>
          <div className="header-right">
            <button className="notification-btn" onClick={requestNotificationPermission}>
              🔔 알림 {filteredNotifications.length}
            </button>
            <div className="branch-switch">
              <button
                className={`branch-btn ${branch === '병점' ? 'active' : ''}`}
                onClick={() => setBranch('병점')}
              >
                병점점
              </button>
              <button
                className={`branch-btn ${branch === '진안' ? 'active' : ''}`}
                onClick={() => setBranch('진안')}
              >
                진안점
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="nav">
        <button
          className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          🏠 홈
        </button>
        <button
          className={`nav-btn ${activeTab === 'members' ? 'active' : ''}`}
          onClick={() => setActiveTab('members')}
        >
          👥 회원
        </button>
        <button
          className={`nav-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          📅 스케줄
        </button>
        <button
          className={`nav-btn ${activeTab === 'workout' ? 'active' : ''}`}
          onClick={() => setActiveTab('workout')}
        >
          💪 운동일지
        </button>
        <button
          className={`nav-btn ${activeTab === 'diet' ? 'active' : ''}`}
          onClick={() => setActiveTab('diet')}
        >
          🍽️ 식단분석
        </button>
        <button
          className={`nav-btn ${activeTab === 'feedback' ? 'active' : ''}`}
          onClick={() => setActiveTab('feedback')}
        >
          🎥 운동피드백
        </button>
        <button
          className={`nav-btn ${activeTab === 'revenue' ? 'active' : ''}`}
          onClick={() => setActiveTab('revenue')}
        >
          💰 매출
        </button>
        <button
          className={`nav-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 채팅
        </button>
      </nav>

      <main className="main">
        {activeTab === 'home' && (
          <section className="section home">
            <h2>대시보드</h2>
            <div className="dashboard">
              <div className="card">
                <h3>오늘 PT</h3>
                <p className="big-number">{todaySchedule.length}</p>
              </div>
              <div className="card">
                <h3>전체 회원</h3>
                <p className="big-number">{filteredMembers.length}</p>
              </div>
              <div className="card">
                <h3>이달 매출</h3>
                <p className="big-number red">{(totalRevenue / 10000).toFixed(1)}만</p>
              </div>
              <div className="card">
                <h3>식단 칼로리</h3>
                <p className="big-number">{totalDietCalories}</p>
              </div>
              <div className="card warning">
                <h3>⚠️ 컨디션 경고</h3>
                <p className="big-number">{badConditionMembers.length}</p>
              </div>
            </div>

            {badConditionMembers.length > 0 && (
              <div className="alert-box">
                <h3>🚨 컨디션 주의 회원</h3>
                {badConditionMembers.map(m => (
                  <div key={m.id} className="alert-item">
                    <span>{m.name}</span>
                    <span className="condition-bad">좋지 않음</span>
                  </div>
                ))}
              </div>
            )}

            <div className="today-schedule">
              <h3>📋 오늘의 스케줄</h3>
              {todaySchedule.length > 0 ? (
                <ul>
                  {todaySchedule.map(s => (
                    <li key={s.id} className={s.completed ? 'completed' : ''}>
                      <input
                        type="checkbox"
                        checked={s.completed}
                        onChange={() => toggleAttendance(s.id)}
                      />
                      <span>{s.time} - {s.clientName} ({s.trainer})</span>
                      {s.completed && <span className="badge">✅ 완료</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>오늘 일정이 없습니다.</p>
              )}
            </div>

            <div className="notifications-box">
              <h3>🔔 최근 알림</h3>
              <div className="notifications-list">
                {filteredNotifications.slice(0, 5).map(n => (
                  <div key={n.id} className="notification-item">
                    <div>
                      <strong>{n.title}</strong>
                      <p>{n.message}</p>
                      <small>{n.time}</small>
                    </div>
                    <button onClick={() => deleteNotification(n.id)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'members' && (
          <section className="section">
            <h2>회원 관리 - {branch}점</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="이름"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="전화번호"
                value={newMember.phone}
                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
              />
              <select
                value={newMember.membership}
                onChange={(e) => setNewMember({ ...newMember, membership: e.target.value })}
              >
                <option>PT 12회</option>
                <option>PT 20회</option>
                <option>정액 1개월</option>
                <option>정액 3개월</option>
              </select>
              <button onClick={addMember}>➕ 회원 추가</button>
            </div>

            <div className="members-grid">
              {filteredMembers.map(m => (
                <div key={m.id} className="member-card">
                  <div className="member-header">
                    <h3>{m.name}</h3>
                    <span className={`condition condition-${m.condition}`}>
                      {m.condition === 'good' && '👍 좋음'}
                      {m.condition === 'normal' && '👌 보통'}
                      {m.condition === 'bad' && '⚠️ 나쁨'}
                    </span>
                  </div>
                  <p>📞 {m.phone}</p>
                  <p>📅 {m.joinDate}</p>
                  <p>💳 {m.membership}</p>
                  <div className="condition-buttons">
                    <button onClick={() => setMemberCondition(m.id, 'good')}>좋음</button>
                    <button onClick={() => setMemberCondition(m.id, 'normal')}>보통</button>
                    <button onClick={() => setMemberCondition(m.id, 'bad')}>나쁨</button>
                  </div>
                  <button className="delete-btn" onClick={() => deleteMember(m.id)}>삭제</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'schedule' && (
          <section className="section">
            <h2>PT 스케줄 - {branch}점</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="회원명"
                value={newSchedule.clientName}
                onChange={(e) => setNewSchedule({ ...newSchedule, clientName: e.target.value })}
              />
              <input
                type="date"
                value={newSchedule.date}
                onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
              />
              <input
                type="time"
                value={newSchedule.time}
                onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
              />
              <input
                type="text"
                placeholder="강사명"
                value={newSchedule.trainer}
                onChange={(e) => setNewSchedule({ ...newSchedule, trainer: e.target.value })}
              />
              <button onClick={addSchedule}>➕ 일정 추가</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>회원명</th>
                    <th>날짜</th>
                    <th>시간</th>
                    <th>강사</th>
                    <th>출석</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchedule.map(s => (
                    <tr key={s.id} className={s.completed ? 'completed' : ''}>
                      <td>{s.clientName}</td>
                      <td>{s.date}</td>
                      <td>{s.time}</td>
                      <td>{s.trainer}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={s.completed}
                          onChange={() => toggleAttendance(s.id)}
                        />
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteSchedule(s.id)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'workout' && (
          <section className="section">
            <h2>운동일지 - {branch}점</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="회원명"
                value={newWorkout.member}
                onChange={(e) => setNewWorkout({ ...newWorkout, member: e.target.value })}
              />
              <input
                type="date"
                value={newWorkout.date}
                onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="운동명"
                value={newWorkout.exercise}
                onChange={(e) => setNewWorkout({ ...newWorkout, exercise: e.target.value })}
              />
              <input
                type="number"
                placeholder="세트"
                value={newWorkout.sets}
                onChange={(e) => setNewWorkout({ ...newWorkout, sets: e.target.value })}
              />
              <input
                type="number"
                placeholder="반복"
                value={newWorkout.reps}
                onChange={(e) => setNewWorkout({ ...newWorkout, reps: e.target.value })}
              />
              <input
                type="number"
                placeholder="무게(kg)"
                value={newWorkout.weight}
                onChange={(e) => setNewWorkout({ ...newWorkout, weight: e.target.value })}
              />
              <input
                type="text"
                placeholder="비고"
                value={newWorkout.notes}
                onChange={(e) => setNewWorkout({ ...newWorkout, notes: e.target.value })}
              />
              <button onClick={addWorkout}>➕ 기록 추가</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>회원</th>
                    <th>날짜</th>
                    <th>운동</th>
                    <th>세트</th>
                    <th>반복</th>
                    <th>무게</th>
                    <th>비고</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkout.map(w => (
                    <tr key={w.id}>
                      <td>{w.member}</td>
                      <td>{w.date}</td>
                      <td>{w.exercise}</td>
                      <td>{w.sets}</td>
                      <td>{w.reps}</td>
                      <td>{w.weight}kg</td>
                      <td>{w.notes}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteWorkout(w.id)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'diet' && (
          <section className="section">
            <h2>🍽️ AI 식단 분석 - {branch}점</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="회원명"
                value={newDiet.member}
                onChange={(e) => setNewDiet({ ...newDiet, member: e.target.value })}
              />
              <input
                type="date"
                value={newDiet.date}
                onChange={(e) => setNewDiet({ ...newDiet, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="음식명 (예: 닭가슴살 200g)"
                value={newDiet.foodName}
                onChange={(e) => setNewDiet({ ...newDiet, foodName: e.target.value })}
              />
              <div className="file-input-wrapper">
                <input
                  ref={dietImageRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setNewDiet({ ...newDiet, image: event.target.result });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <button onClick={() => dietImageRef.current.click()}>📸 사진 선택</button>
                {newDiet.image && <span>✅ 사진 선택됨</span>}
              </div>
              <button onClick={addDietAnalysis}>➕ 식단 분석</button>
            </div>

            <div className="diet-grid">
              {filteredDiet.map(d => (
                <div key={d.id} className="diet-card">
                  <div className="diet-image">{d.image}</div>
                  <h3>{d.member}</h3>
                  <p className="food-name">{d.foodName}</p>
                  <div className="nutrition-info">
                    <div className="nutrition-item">
                      <span className="label">칼로리</span>
                      <span className="value red">{d.calories}kcal</span>
                    </div>
                    <div className="nutrition-item">
                      <span className="label">단백질</span>
                      <span className="value">{d.protein}g</span>
                    </div>
                    <div className="nutrition-item">
                      <span className="label">탄수화물</span>
                      <span className="value">{d.carbs}g</span>
                    </div>
                    <div className="nutrition-item">
                      <span className="label">지방</span>
                      <span className="value">{d.fat}g</span>
                    </div>
                  </div>
                  <p className="diet-date">{d.date}</p>
                  <button className="delete-btn" onClick={() => deleteDiet(d.id)}>삭제</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'feedback' && (
          <section className="section">
            <h2>🎥 운동 피드백 - {branch}점</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="회원명"
                value={newFeedback.member}
                onChange={(e) => setNewFeedback({ ...newFeedback, member: e.target.value })}
              />
              <input
                type="date"
                value={newFeedback.date}
                onChange={(e) => setNewFeedback({ ...newFeedback, date: e.target.value })}
              />
              <input
                type="text"
                placeholder="운동명"
                value={newFeedback.exercise}
                onChange={(e) => setNewFeedback({ ...newFeedback, exercise: e.target.value })}
              />
              <div className="file-input-wrapper">
                <input
                  ref={feedbackVideoRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setNewFeedback({ ...newFeedback, videoFile: file });
                    }
                  }}
                  style={{ display: 'none' }}
                />
                <button onClick={() => feedbackVideoRef.current.click()}>🎬 영상 선택</button>
                {newFeedback.videoFile && <span>✅ {newFeedback.videoFile.name}</span>}
              </div>
              <textarea
                placeholder="피드백 입력..."
                value={newFeedback.feedback}
                onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
                style={{ gridColumn: 'span 2' }}
              />
              <button onClick={addWorkoutFeedback}>➕ 피드백 등록</button>
            </div>

            <div className="feedback-list">
              {filteredFeedback.map(f => (
                <div key={f.id} className="feedback-card">
                  <div className="feedback-header">
                    <h3>{f.member}</h3>
                    <span className="exercise-badge">{f.exercise}</span>
                  </div>
                  <p className="video-name">🎬 {f.videoUrl}</p>
                  <div className="feedback-text">
                    <strong>피드백:</strong>
                    <p>{f.feedback}</p>
                  </div>
                  <p className="feedback-date">{f.date}</p>
                  <button className="delete-btn" onClick={() => deleteFeedback(f.id)}>삭제</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'revenue' && (
          <section className="section">
            <h2>매출 관리 - {branch}점</h2>
            <div className="revenue-summary">
              <h3>이달 매출: <span className="red">{(totalRevenue / 10000).toFixed(1)}만원</span></h3>
            </div>
            <div className="add-form">
              <input
                type="number"
                placeholder="금액"
                value={newRevenue.amount}
                onChange={(e) => setNewRevenue({ ...newRevenue, amount: e.target.value })}
              />
              <input
                type="date"
                value={newRevenue.date}
                onChange={(e) => setNewRevenue({ ...newRevenue, date: e.target.value })}
              />
              <select
                value={newRevenue.category}
                onChange={(e) => setNewRevenue({ ...newRevenue, category: e.target.value })}
              >
                <option>PT수강</option>
                <option>회원비</option>
                <option>기타</option>
              </select>
              <input
                type="text"
                placeholder="회원명"
                value={newRevenue.member}
                onChange={(e) => setNewRevenue({ ...newRevenue, member: e.target.value })}
              />
              <button onClick={addRevenue}>➕ 매출 추가</button>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>회원명</th>
                    <th>금액</th>
                    <th>카테고리</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRevenue.map(r => (
                    <tr key={r.id}>
                      <td>{r.date}</td>
                      <td>{r.member}</td>
                      <td className="red">{r.amount.toLocaleString()}원</td>
                      <td>{r.category}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteRevenue(r.id)}
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'chat' && (
          <section className="section chat-section">
            <h2>💬 실시간 채팅 - {branch}점</h2>
            <div className="chat-container">
              <div className="messages">
                {filteredMessages.map(m => (
                  <div key={m.id} className={`message ${m.sender === '관리자' ? 'own' : 'other'}`}>
                    <div className="message-content">
                      <strong>{m.sender}</strong>
                      <p>{m.text}</p>
                      <small>{m.timestamp}</small>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="message-input">
                <input
                  type="text"
                  placeholder="메시지 입력..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>전송</button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}