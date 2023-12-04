import physics from './physics.js';
import renderer from './renderer.js'; 
import gameobject from './gameobject.js';

class Platform extends gameobject{
    constructor(x,y,width,height,color='black'){
        super(x,y);
        this.addComponent(new renderer(color,width,height));
        this.addComponent(new physics({x:0,y:0},{x:0,y:0},{x:0,y:0}));
        this.tag = 'platform';
    }
}
export default Platform;