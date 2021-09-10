import Layout from "../../components/layout";
import { getBookData, getAllBookTitles } from "../../lib/books";

// MUST be called getStaticPaths && key in return obj MUST be called paths
// // getStaticProps
export async function getStaticPaths() {
    const paths = getAllBookTitles();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const bookData = getBookData(params.id);
    return {
        props: {
            bookData,
        },
    };
}

// Component
export default function Book({ bookData }) {
    return <Layout>{bookData.title}</Layout>;
}
