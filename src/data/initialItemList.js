import { nanoid } from "nanoid";

const initialItemList = [
        {
            id: nanoid(),
            name: "item 1",
            isStarred: false
        },
        {
            id: nanoid(),
            name: "item 2",
            isStarred: false
        },
        {
            id: nanoid(),
            name: "item 3",
            isStarred: false
        }
]

export default initialItemList;