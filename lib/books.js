import fs from "fs";
import path from "path";
import matter from "gray-matter";

const booksDirectory = path.join(process.cwd(), "data/books");

export function getAllBookData() {
    const fileNames = fs.readdirSync(booksDirectory);
    const allBookData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(booksDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        // Combine the data with the id and send it back to getStaticProps
        return {
            id,
            ...matterResult.data,
        };
    });

    return allBookData;
}

export function getAllBookTitles() {
    const fileNames = fs.readdirSync(booksDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

export function getBookData(id) {
    const fullPath = path.join(booksDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
        id,
        ...matterResult.data,
    };
}

export function getBooksBasedOnCategory(cat) {
    const fileNames = fs.readdirSync(booksDirectory);
    const booksWithCategory = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(booksDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);
        if (matterResult?.data?.category?.length > 0) {
            return {
                id,
                ...matterResult.data,
            };
        }
        // Combine the data with the id and send it back to getStaticProps
        return {};
    });
    return booksWithCategory;
}
