import { withHandlers, compose, lifecycle } from 'recompose';
import { SinewaveComponent } from './Component';
import { drawWave } from "./utils";



const list = {
  0: [],
  1: [],
};

export const Sinewave = compose(
 lifecycle({
   componentDidMount() {
     const canvas = document.querySelector('.sinewave');

     if (navigator.mediaDevices.getUserMedia) {
       var constraints = {audio: true}
       navigator.mediaDevices.getUserMedia (constraints)
         .then(
           function(stream) {
             drawWave(canvas, stream);
           })
         .catch( function(err) { console.log('The following gUM error occured: ' + err);})
     } else {
       console.log('getUserMedia not supported on your browser!');
     }

   }
 })
)(SinewaveComponent);

