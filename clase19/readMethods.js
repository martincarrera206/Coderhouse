const db = require('./db')
const userModel = require('./models/user')

const ITEMS_BY_PAGE = 3

const getPageParams = (pageNumber = 1) => {
 return {
   limit: ITEMS_BY_PAGE,
   skip: (pageNumber - 1) * ITEMS_BY_PAGE
 }
}

;(async () => {

    await db
   
    const firstPage = getPageParams(1)
    console.log({ firstPage })
    //{ name: 1, email: 1, _id: 0 } Devuelve el nombre e email pero no el id
    const firstUsers = await userModel.find({}, { name: 1, email: 1, _id: 0 }).limit(firstPage.limit).skip(firstPage.skip)
    console.log({ firstUsers })
   
    const secondPage = getPageParams(2)
    console.log({ secondPage })
    const secondUsers = await userModel.find({}, { name: 1, email: 1, _id: 0 }).limit(secondPage.limit).skip(secondPage.skip)
    console.log({ secondUsers })
   
    process.exit()
   
})()
   