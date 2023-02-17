import React,{useState,useEffect} from "react";

const LifeCycle = () => {

    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    useEffect(()=>{
        console.log('mount!');
    },[]);

    useEffect(()=>{
        console.log('update!');
    });

    useEffect(()=>{
        console.log(`count update!:${count}`)
    },[count]);

    return(
        <div className='LifeCycle'>
            <div>
                {count}
                <button onClick={()=>setCount(count+1)}>+</button>
            </div>
            <div>
                <input value={text} onChange={(e)=>{setText(e.target.value)}} />
            </div>
        </div>
    )
}

export default LifeCycle;