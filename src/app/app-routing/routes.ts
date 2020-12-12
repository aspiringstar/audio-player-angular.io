import {Routes} from "@angular/router";

import {PlayerComponent} from "../pages/player/player.component";

export const routes: Routes = [
    { path: "", component: PlayerComponent },
    { path: "**", redirectTo: "" }
    
]

