import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './newApp';
import App from './App4';
// import newApp3 from './newApp3';
// import App from './newApp2';

// import reportWebVitals from './reportWebVitals';

// import {
//    Transition,
//    CSSTransition,
//    TransitionGroup,
// } from 'react-transition-group';

// function Example() {
//    const [showButton, setShowButton] = useState(true);
//    const [showMessage, setShowMessage] = useState(false);
//    return (
//       <>
//          <button onClick={() => setShowMessage(true)}>click me</button>
//          <CSSTransition
//             in={showMessage}
//             timeout={300}
//             classNames="alert"
//             // unmountOnExit
//             // onEnter={() => setShowButton(false)}
//             // onExited={() => setShowButton(true)}
//          >
//             <div className="abs">
//                <div>
//                   This alert message is being transitioned in and out of the
//                   DOM.
//                </div>
//                <button onClick={() => setShowMessage(false)}>Close</button>
//             </div>
//          </CSSTransition>
//       </>
//       //   <CSSTransition/>
//    );
// }

// function Testing() {
//    const [click, setClick] = useState(false);
//    const div = useRef(null);
//    return (
//       // <div className="container">
//       <>
//          <button onClick={() => setClick(!click)}>click me</button>
//          {console.log(click)}
//          <CSSTransition
//             in={click}
//             classNames="rotate"
//             timeout={10000}
//             // onEnter={() => console.log('onEnter')}
//             // onEntering={() => console.log('onEntering')}
//             onEntered={() => console.log('entered')}
//             // addEndListener={(node, done) => {
//             //    node.addEventListener('transitionend', done, false);
//             //    // node.addEventListener('transitionend', done, false);
//             // }}
//             // exit={false}
//             // enter={false}
//             // onEntered={}
//          >
//             <div className="box" ref={div}>
//                hello
//             </div>
//          </CSSTransition>
//       </>
//       // </div>
//    );
// }
// const duration = 300;

// const defaultStyle = {
//    transition: `opacity ${duration}ms ease-in-out`,
//    opacity: 0,
// };

// const transitionStyles = {
//    entering: { opacity: 1 },
//    entered: { opacity: 1 },
//    exiting: { opacity: 0 },
//    exited: { opacity: 0 },
// };
// const Fade = ({ in: inProp }) => (
//    <Transition in={inProp} timeout={duration}>
//       {state => (
//          <div
//             style={{
//                ...defaultStyle,
//                ...transitionStyles[state],
//             }}
//          >
//             I'm a fade Transition!
//          </div>
//       )}
//    </Transition>
// );
// // function App() {
// //    const [inProp, setInProp] = useState(false);
// //    return (
// //       <div>
// //          <Transition in={inProp} timeout={500}>
// //             {state => (
// //                <div
// //                   style={{
// //                      ...defaultStyle,
// //                      ...transitionStyles[state],
// //                   }}
// //                >
// //                   I'm a fade Transition!
// //                </div>
// //             )}
// //          </Transition>
// //          <button onClick={() => setInProp(!inProp)}>Click to Enter</button>
// //       </div>
// //    );
// // }

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
