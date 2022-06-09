let _isAdmin:boolean = true
function isAdmin(__isAdmin?:boolean){
    if(__isAdmin) _isAdmin = __isAdmin
    else return _isAdmin
}
export default isAdmin
