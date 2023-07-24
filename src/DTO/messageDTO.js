export class messageDTO{
    constructor(obj){
        this.user = obj.user.toUpperCase(),
        this.message = obj.message
    }
}