// import Usuario from "./Usuario";
import BaseModel from "./BaseModel"

(async () => {
	await BaseModel.sync({force: true})
	
})()