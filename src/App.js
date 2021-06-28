/* eslint-disable */
import './App.css';
import { Navbar, Nav, Jumbotron, Button } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom'
import React, { useContext, useState } from 'react';
import data from './data'
import Detail from './Detail';
import axios from 'axios'

//다른 컴포넌트에서 사용 가능하도록 내보내기
export let storeContext = React.createContext();//state 공유할 범위 생성

function App() {
  
  const [shoes, setShoes] = useState(data)

  /*
  페이지 방문하자마자 Ajax요청을 실행시
  useEffect(()=>{
    axios.get('').then().catch();
  },[]);
  */

  const [store, setStore] = useState(10)

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Special-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link> 안에 <Link> 쓰면 브라우저 콘솔창에 a태그 안에 a태그 넣으면 안될 것 같다는 warning이 뜸*/}
            {/* 기본 a태그 대신 사용할 태그 안에 as를 이용해서 as={Link}를 넣어주면 warning 사라짐 */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Switch:  여러개의 Route가 매칭이 되어도 맨 위의 Route 하나만 보여줌*/}
      <Switch>
        <Route exact path="/">
          <Jumbotron className="background">
            <h1>20% Season Off</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>

          <div className="container">

            <storeContext.Provider value={store}>
              <div className="row">
                { shoes.map(item => <Item key={item.id} item={item}/>) }
              </div>
            </storeContext.Provider>

            <Button variant="primary" onClick={() => {
              /*
              post 요청하기
              axios.post('https://codingapple1.github.io/shop/data2.json', { id : 'test', pw : 1234})
                    .then((result)=>{  })
                    .catch(()=>{ })
              */
              //로딩중 UI 띄워주는 코드
              // 버튼 클릭시 데이터 요청해서 추가하기 
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                //로딩중 UI 없애는 코드
                setShoes([
                  ...shoes,
                  ...result.data
                ])
              })
              .catch(() => {
                //로딩중 UI 없애는 코드 & 실패UI 띄워주는 코드
                console.log('fail')
              });
            }}>더보기</Button>
          </div>
        </Route>
        {/* :id => id 부분은 파라미터처럼 자유롭게 작명가능 , /detail/0으로 접속하면 0번째 상품명 */}
        <Route path="/detail/:id">
          <storeContext.Provider value={store}>
            <Detail shoes={shoes} store={store} setStore={setStore}/>
          </storeContext.Provider>
        </Route>
      </Switch>
    </div>
  );
}

function Item({item}){
  const {id, title, content, price, src} = item
  let store = useContext(storeContext)

  return (
    <div className="col-md-4">
      <img src={src} width="100%"/>
      <h4>{title}</h4>
      <p>{content} & {price}</p>
      {store}
    </div>
  );
}



export default App;
