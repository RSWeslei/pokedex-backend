// import Usuario from "./Usuario";
import BaseModel from "../../models/BaseModel"

(async () => {
	await BaseModel.sync({force: true})
	
})()