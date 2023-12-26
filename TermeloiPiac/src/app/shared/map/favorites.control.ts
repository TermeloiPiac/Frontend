import { Map } from "ol";
import Control from "ol/control/Control";
import { SessionService } from "../../service/session.service";

export class Favorites extends Control{

  map !: Map;
  constructor(map: Map, private sessionService: SessionService){
    let favorites = document.createElement('button');
    favorites.innerHTML = 'Kedvencek';
    favorites.style.width = "auto";
    favorites.style.visibility = sessionService.getLoggedStatus() ? "visible" : "hidden";
    let box = document.createElement('div');
    box.className = 'row justify-content-end';
    box.append(favorites);
    let boxOuter = document.createElement('div');
    boxOuter.className = 'container-fluid text-center';
    boxOuter.append(box);

    super({
      element: boxOuter
    })

    this.map = map;
    box.addEventListener('click', this.handleFavorites.bind(this), false)
  }

  handleFavorites(){
  }
  
}