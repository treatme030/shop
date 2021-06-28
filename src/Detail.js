import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components'
import './Detail.scss'
import {storeContext} from './App'
import { CSSTransition } from 'react-transition-group'

const Detail = ({shoes, store, setStore}) => {
    //let store = useContext(storeContext)
    //뒤로가기 : history.goBack()
    //특정 경로로 이동 : history.push('경로')
    let history = useHistory()

    // :id 자리에 입력한 숫자를 useParams()를 이용해서 넣어주기 => {shoes[:id자리에 있던숫자].content}
    // id라는 변수는 :id 자리에 있던 숫자를 의미, 매개변수 저장
    let { id } = useParams()
    ///:id 자리에 입력한 값과 영구번호가 같은 {상품데이터}를 찾아서 데이터바인딩
    let findItem = shoes.find(item => item.id == id)

    const [text, setText] = useState('')
    const [alert, setAlert] = useState(false)
    const [tab, setTab] = useState(0)
    const [ani, setAni] = useState(false)
    //컴포넌트가 mount 되었을 때, 컴포넌트가 update될 때 특정 코드 실행
    useEffect(() => {
        let time = setTimeout(() => {
            setAlert(true)
        }, 2000)
        return () => {clearTimeout(time)}//컴포넌트가 사라질 때 타이머를 없애주는게 좋음
    },[alert]) //[실행조건지정] : 실행조건이 변경될때만 실행 / [] : 로딩될 때 딱 한번만 실행
    
    return (
        <div className="container">
            <div>
                <p className="red">Detail</p>
            </div>
            {text}
            <input type="text" onChange={(e) => setText(e.target.value)}/>
            {
               alert ?  null : <div className="my-alert-yellow"><p>재고가 얼마 남지 않았어요!</p></div>
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={findItem.src} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findItem.title}</h4>
                    <p>{findItem.content}</p>
                    <p>{findItem.price}원</p>
                        <Info store={store}/>
                    <button className="btn btn-danger" onClick={() => setStore(store - 1)}>주문하기</button> 
                    <button className="btn btn-danger" onClick={() => history.goBack()}>뒤로가기</button> 
                </div>
            </div>

            {/* tab */}
            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={() => {setAni(false); setTab(0)}}>Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => {setAni(false); setTab(1)}}>Option 2</Nav.Link>
                </Nav.Item>
            </Nav>

            {/* in은 일종의 스위치로 true일때만 애니메이션을 적용해줌 */}
            <CSSTransition in={ani} classNames="wow" timeout={500}>
                <TabContent tab={tab} setAni={setAni} ani={ani}/>
            </CSSTransition>
        </div>
    );
};

// if문 사용한 컴포넌트
function TabContent({tab, setAni, ani}){
    useEffect(() => {
        setAni(true)
    },[ani])

    if(tab === 0){
        return <div>0번째 내용입니다.</div>
    } else if(tab === 1){
        return <div>1번째 내용입니다.</div>
    }
}

function Info({store}){
    //let store = useContext(storeContext)
    return (
        <p>재고 : {store} </p>
    );
}

export default Detail;