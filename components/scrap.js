
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




/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

function createPopupClass() {
    console.log("Creating popup class")
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Popup(position, content) {
      this.position = position;
  
      //content.classList.add('popup-bubble');
      console.log("Calling popup constructor")
      // This zero-height div is positioned at the bottom of the bubble.
      var bubbleAnchor = document.createElement('div');
      //bubbleAnchor.classList.add('popup-bubble-anchor');
      bubbleAnchor.appendChild(content);
  
      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement('div');
      //this.containerDiv.classList.add('popup-container');
      ////this.containerDiv.appendChild(bubbleAnchor);
  
      // Optionally stop clicks, etc., from bubbling up to the map.
      google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);
  
    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    };
  
    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    };
  
    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function() {
      var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
  
      // Hide the popup when it is far out of view.
      var display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
          'block' :
          'none';
  
      if (display === 'block') {
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y + 'px';
      }
      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    };
  
    return Popup;
  }

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////