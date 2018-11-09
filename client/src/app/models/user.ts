export class User{
    constructor(
        public _id: string = "",
        public name: string = "",
        public surname: string = "",
        public email: string = "",
        public password: string = "",
        public role: string = "ROLE_USER",
        public image: string = "",
    ){}
}