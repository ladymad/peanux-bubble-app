import { Mesh } from "three";

export default class Bubble extends Mesh {
    private speedX: number = 0;
    private speedY: number = 0;
    private speedZ: number = 0;
    private MaxRadius: number = 0;
    private InitRadius: number = 0;
    private isClicked: number = 0;

    constructor() {
        super();
        
    }
}