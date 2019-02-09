
const Popup = {
  /* Position the bubble centred-above its parent. */
  position: 'absolute',
  top: '0',
  left: '0',
  transform: 'translate(-50%, -100%)',
  /* Style the bubble. */
  backgroundColor: 'white',
  padding: '5px',
  borderRadius: '5px',
  fontFamily: 'sans-serif',
  overflowY: 'auto',
  maxHeight: '60px',
  boxShadow: '0px 2px 10px 1px rgba(0,0,0,0.5)'
}

const PopupAnchor = {
position: 'absolute',
width: '100%',
bottom: /* TIP_HEIGHT= */ '8px',
left: '0'
}


/* JavaScript will position this div at the bottom of the popup tip. */
const PopupContainer = {
  cursor: 'auto',
  height: '0',
  position: 'absolute',
  /* The max width of the info window. */
  width: '200px'
}