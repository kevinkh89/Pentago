function WinnerHighlight({ winner }) {
   let media = window.matchMedia('(max-width:600px)');
   let values = {
      normal: ['2.3rem', '9.3rem', '16.3rem', '28rem', '35rem', '42rem'],
      mobile: ['1.3rem', '5.3rem', '9.3rem', '16rem', '20rem', '24rem'],
   };
   let style =
      winner.direction === 'vertical'
         ? {
              left: media.matches
                 ? values.mobile[winner.index]
                 : values.normal[winner.index],
           }
         : winner.direction === 'horizontal'
         ? {
              top: media.matches
                 ? values.mobile[winner.index]
                 : values.normal[winner.index],
           }
         : {};
   return (
      <span
         className={`winner-box ${winner.direction} ${winner.side}`}
         style={style}
      ></span>
   );
}

export default WinnerHighlight;
