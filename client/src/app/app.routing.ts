import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { UserEditComponent } from "./user-edit/user-edit.component";
import { ArtistListComponent } from "./artist-list/artist-list.component";
import { HomeComponent } from "./home/home.component";
import { ArtistAddComponent } from "./artist-add/artist-add.component";


const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "artistas/:page", component: ArtistListComponent },
    { path: "crear-artista", component: ArtistAddComponent },
    { path: "mis-datos", component: UserEditComponent },
    { path: "**", component: HomeComponent }
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);