import UsersModel, { IUser } from "../models/Users";
import RolesModel, { IRoles } from "../models/Roles";

class BusinessUser {
    constructor() {

    }
    //addUsers
    //CRUD
    public async addUsers(user: IUser) {
        let userDb = new UsersModel(user);
        let result = await userDb.save();
        return result;
    }
    public async readUsers() {
        let listUser: Array<IUser> = await UsersModel.find();
        return listUser;
    }
    public async updateUsers(id: string, user: any) {
        let result = await UsersModel.update({ _id: id }, { $set: user });
        return result;
    }
    public async deleteUsers(id: string) {
        let result = await UsersModel.remove({ _id: id });
        return result;
    }

    public async addRol(idUs: string, idRol: string) {
        let user = await UsersModel.findOne({ _id: idUs });
        if (user != null) {
            var rol = await RolesModel.findOne({ _id: idRol });
            if (rol != null) {
                user.roles.push(rol);
                return await user.save();
            }
            return null;
        }
        return null;
    }
    public async removeRol(idUs: string, idRol: string) {
        let user = await UsersModel.findOne({ _id: idUs });
        var rol = await RolesModel.findOne({ _id: idRol });
        if (user != null && rol != null) {
            let newroles: Array<IRoles> = user.roles.filter((item: IRoles) => {
                if (item.name == rol.name) {
                    return false;
                }
                return true;
            });
            user.roles = newroles;
            try {
                return await user.save();
            } catch (err) {
                return err;
            };

        }
        return null
    }

}
export default BusinessUser;