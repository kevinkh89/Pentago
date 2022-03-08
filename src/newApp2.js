import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// class App extends React.Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//          message: new Date().toLocaleTimeString(),
//       };
//    }
//    componentDidMount() {
//       // this.setState=this.setState().bind(this);
//       console.log('didMount');
//       setInterval(
//          function () {
//             this.setState({
//                message: new Date().toLocaleTimeString(),
//             });
//          }.bind(this),
//          1000
//       );
//    }
//    componentDidUpdate() {
//       console.log('didUpdate');
//    }
//    render() {
//       return (
//          <div>
//             <h1>{this.state.message}!</h1>
//             <button onClick={() => this.setState({ message: 'updated' })}>
//                Click me
//             </button>
//          </div>
//       );
//    }
// }

// const Child = props => {
//    const [child, setChild] = useState(0);
//    console.log(props.child);
//    console.log(child);
//    return (
//       <h1
//          onClick={() => {
//             setChild(child + 1);
//             props.onClick();
//          }}
//          style={{ marginBottom: '20px' }}
//       >
//          some bull shit{child}
//       </h1>
//    );
// };

const ChildMemo = React.memo(
   function Child(props) {
      const [child, setChild] = useState(0);
      // console.log(props.arr);
      console.log(props.child);
      return (
         <h1
            onClick={() => {
               setChild(child + 1);
               props.onClick(1);
            }}
            style={{ marginBottom: '20px' }}
         >
            some bull shit{child}
         </h1>
      );
   },
   (prev, next) => {
      // console.log(prev === next);
      return true;
   }
);

const Child = props => {
   const [child, setChild] = useState(0);
   // console.log(props.arr);
   // console.log(props.child);
   return (
      <h1
         onClick={() => {
            setChild(child + 1);
            props.onClick(1);
         }}
         style={{ marginBottom: '20px' }}
      >
         some bull shit{child}
      </h1>
   );
};

const Parent = () => {
   const [state, setState] = useState(0);
   const [child1, setChild1] = useState([0, 0]);
   const [child2, setChild2] = useState([0, 0]);
   console.log('parent');
   const handleClick1 = i => {
      console.log('click1', state + 1);
      setState(state => state + 1);
      setChild1(child1 => {
         return child1.map((val, i) => val + 1);
      });
   };
   const handleClick2 = i => {
      console.log('click2', state + 1);
      setState(state => state + 1);
      // console.log('click2', newChild);
      setChild2(child2 => {
         return child2.map((val, i) => val + 1);
      });
   };
   // const ChildMemo = React.memo(Child);
   // const ChildMemo=React.memo(function Mycomponent(props){

   // })
   // console.log(child1, child2);
   return (
      <>
         <h1>parent{state}</h1>
         <ChildMemo
            onClick={i => {
               handleClick1(i);
            }}
            child={'child1'}
            arr={child1}
         />
         <ChildMemo
            onClick={i => {
               handleClick2(i);
            }}
            child={'child2'}
            arr={child2}
         />
      </>
   );
};

const Parent2 = props => {
   const value = 'val';
   const childrenArray = React.Children.toArray(props.children);
   const childTest = React.Children.map(childrenArray, child => {
      console.log(child);
      // console.log('here');
      return React.cloneElement(child, { value });
   });
   console.log(childTest);
   console.log(props.children);
   return <div>{childTest}</div>;
};

const Child2 = ({ children }) => {
   return <div>{children}</div>;
};

const GrandParent = () => {
   return (
      <Parent2>
         <Child2 />
         <Child2 />
      </Parent2>
   );
};

const Compound = () => {
   const [click, setClick] = useState(0);
   function clickHanlde() {
      setClick(click => click + 1);
   }
   return (
      <Child2>
         <button onClick={clickHanlde}>hi</button>
      </Child2>
   );
};

export default Compound;
// ReactDOM.render(
//    <React.StrictMode>
//       <App />
//    </React.StrictMode>,
//    document.getElementById('root')
// );
