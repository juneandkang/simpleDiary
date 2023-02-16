import './App.css';
import DiaryEditor from './DiaryEditior';
import DiaryList from './DiaryList';

function App() {

  const dummyList = [
    {
      id:1,
      author: "강준희",
      content: '첫번째 일기입니다.',
      emotion: 5,
      created_date: new Date().getTime(),
    },
    {
      id:2,
      author: "김땡떙",
      content: '두번째 일기입니다.',
      emotion: 3,
      created_date: new Date().getTime(),
    },
    {
      id:3,
      author: "이떙땡",
      content: '세번째 일기입니다.',
      emotion: 2,
      created_date: new Date().getTime(),
    },
    {
      id:4,
      author: "최삼삼",
      content: '네번째 일기입니다.',
      emotion: 4,
      created_date: new Date().getTime(),
    },
  ]


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <DiaryEditor />
      <DiaryList diaryList={dummyList}/>
    </div>
  );
}

export default App;
