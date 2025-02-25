import './App.css';
import DiaryEditor from './DiaryEditior';
import DiaryList from './DiaryList';
import { useCallback, useRef, useEffect, useMemo, useReducer } from 'react';


const reducer = (state,action)=>{
  switch(action.type){
    case 'INIT' :{
      return action.data;
    }
    case 'CREATE':{
      const created_date = new Date().getTime();
      const newItem ={
        ...action.data,
        created_date
      }
      return [newItem, ...state];
    }
    case 'REMOVE':{
      return state.filter((it)=>it.id !== action.targetId);
    }
    case 'EDIT':{
      return state.map((it)=>
      it.id === action.targetId ? {...it, content: action.newContent} : it
      );
    }
    defalut:
      return state;
  }
}

function App() {

  // const [data,setData] = useState([]);


  const [data, dispatch] = useReducer(reducer,[])

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    ).then((res)=>res.json());
    
    const initData = res.slice(0,20).map((item)=>{
      return {
        author : item.email,
        content : item.body,
        emotion : Math.floor(Math.random()*5)+1,
        created_date : new Date().getTime(),
        id: dataId.current++
      }
    });
    dispatch({type:'INIT',data:initData});
  }

  useEffect(()=>{
    getData();
  }
  ,[])

  const onCreate = useCallback(
    (author, content, emotion) => {
    dispatch({
      type:'CREATE',
      data:{author, content, emotion, id:dataId.current},
    });
    dataId.current += 1;
  },
    []
  );

  const onRemove = useCallback((targetId) =>{
    dispatch({type:'REMOVE',targetId});
  },[])

  const onEdit = useCallback((targetId,newContent) =>{
    dispatch({type:'EDIT',targetId,newContent})
  },[])

  const getDiaryAnalysis = useMemo(
    ()=>{
    const goodCount = data.filter((it)=>it.emotion>=3).length;
    const badCount = data.length - goodCount;
    const goodRatio = Math.floor((goodCount/data.length)*100);
    return {goodCount, badCount, goodRatio};
  },
  [data.length]
  );

  const {goodCount,badCount,goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>전체 일기:{data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분이 좋은 일기 비율 : {goodRatio}%</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}

export default App;
