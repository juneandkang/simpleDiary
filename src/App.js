import './App.css';
import DiaryEditor from './DiaryEditior';
import DiaryList from './DiaryList';
import { useRef, useState } from 'react';

function App() {

  const [data,setData] = useState([]);
  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    }
    dataId.current += 1;
    setData([newItem, ...data]);
  }

  const onRemove = (targetId) =>{
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((item)=>item.id !== targetId);
    setData(newDiaryList);
  }

  const onEdit = (targetId,newContent) =>{
    setData(
      data.map((item)=>
      item.id === targetId ? {...item, content:newContent} : item 
      )
    );
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}

export default App;
