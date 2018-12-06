import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

// import user
import {UserEditComponent} from "./user-edit/user-edit.component";
import { UserService } from "./services/user.service";

const appRoutes: Routes = [
    {path: "", component: UserEditComponent},
    {path: "mis-datos", component: UserService},
    {path: "**", component: UserService}
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);