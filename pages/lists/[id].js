import Link from "next/link";
import Layout from "../../components/layout";
import { getAllListIds, getListData } from "../../lib/lists";

// Gets called first. It returns an array of all possible values for id
// (though you could do a logic operator to only return a partial list, based on some condition)
export async function getStaticPaths() {
    const paths = getAllListIds();
    return {
        paths,
        fallback: false,
    };
}

// Fetches necessary data for the list that matches the provided id
export async function getStaticProps({ params }) {
    const listData = getListData(params.id);
    // Set props for the component below
    return {
        props: {
            listData,
        },
    };
}

export default function Post({ listData }) {
    return (
        <Layout>
            <div>
                {listData.data.associatedBooks.map((book, i) => {
                    return book?.category?.includes(listData.id) ? (
                        <Link key={i} href={`/books/${book.id}`}>
                            <a>{book.title}</a>
                        </Link>
                    ) : null;
                })}
            </div>
            <Link href="/">
                <a>Back To Home</a>
            </Link>
        </Layout>
    );
}
