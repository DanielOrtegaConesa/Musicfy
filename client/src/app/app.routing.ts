import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";


import {UserEditComponent} from "./user-edit/user-edit.component";

import {ArtistListComponent} from "./artist-list/artist-list.component";


const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/artists/1",
        pathMatch: "full"
    },
    {path: "", component: ArtistListComponent},
    {path: "artists/:page", component: ArtistListComponent},
    {path: "mis-datos", component: UserEditComponent},
    {path: "**", component: ArtistListComponent}
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);