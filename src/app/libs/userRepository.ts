import User from "../model/user";
import db from "./sqlite";

class UserRepository {
  public static async save(user: User): Promise<User> {
    await db.insert("user", user);
    const [result] = await db.select("select last_insert_rowid() id;");
    user.id = result.id;
    return user;
  }
  public static async getById(id: number): Promise<User | undefined> {
    const [dados] = await db.select(`SELECT * FROM user WHERE id = ${id};`);
    return dados;
  }
}
export default UserRepository;
