import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";


import {UserEditComponent} from "./user-edit/user-edit.component";
import {ArtistListComponent} from "./artist-list/artist-list.component";
import {HomeComponent} from "./home/home.component";


const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "artists/:page", component: ArtistListComponent},
    {path: "mis-datos", component: UserEditComponent},
    {path: "**", component: HomeComponent}
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);