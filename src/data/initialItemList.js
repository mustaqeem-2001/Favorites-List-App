import { nanoid } from "nanoid";

const initialItemList = [
        {
            id: nanoid(),
            name: "Example item 1",
            isStarred: false
        },
        {
            id: nanoid(),
            name: "Example item 2",
            isStarred: false
        },
        {
            id: nanoid(),
            name: "Example item 3",
            isStarred: false
        }
]

export default initialItemList;