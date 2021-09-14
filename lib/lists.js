import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getBooksBasedOnCategory } from "./books";
// Utility file that fetches all lists in ../lists
// This function is called inside getStaticProps inside /pages/index.js

const listsDirectory = path.join(process.cwd(), "data/lists");

// Executed in index.js on first render
// It first gets the ids of all files in the dir (just like getAllListIds further below)
// and then it reads the data in those files in order to populate the lists-list
// Essentially a combination of the two functions below
export function getSortedListsData() {
    // Get filenames of all files in /lists
    const fileNames = fs.readdirSync(listsDirectory);
    // Create an array of objects that include the id (filename in /lists)
    // and the parse file contents
    const allListsData = fileNames.map((fileName) => {
        // Remove ".md" from file name, which we'll use as id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(listsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id and send it back to getStaticProps
        return {
            id,
            ...matterResult.data,
        };
    });
    return allListsData;
}

// Called from inside 'lists/[id].js'
// It gets the ids (i.e. file-names) of all list-files inside `/lists`
// It returns an array of objects, one object for each of the files
// that have matched some condition we've set (in this case all of them)
// The array looks like this:
// [
//     {
//         params: {
//             id: "Growth Studies",
//         },
//     },
// ];
// `params` can be called anything you want; its return-value is ingested by `getStaticProps`
// Just make sure to target the right value inside `getStaticProps`
// Whatever you call `id` has to match the filename (i.e. /lists/[id.js])
// So if you called it `/lists/[list.js]`, you'd have to call it `list`
export function getAllListIds() {
    const fileNames = fs.readdirSync(listsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

// Gets a single entry from /lists, based on the provided id
// Returns as an object:
// { id: 'growth-studies', title: 'Growth Studies' }
export function getListData(id) {
    // get listData
    const fullPath = path.join(listsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const booksInCategory = getBooksBasedOnCategory(id);
    // get associated books
    // id = "growth-studies"
    console.log(booksInCategory);

    // Combine the data with the id
    return {
        id,
        data: {
            categoryInfo: matterResult.data,
            booksInCategory,
        },
    };
}
