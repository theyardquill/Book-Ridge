import getBook from "@/actions/get-book";
import getBooks from "@/actions/get-books";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

type Params = Promise<{ bookId: string }>

const BookPage = async ({ params }: { params: Params }) => {
    const { bookId } = await params;
    const book = await getBook(bookId);
    const suggestedBooks = await getBooks({ pathwayId: book?.pathway?.id })

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Gallery */}
                        <Gallery images={book.images} />
                        <div className="px-4 mt-0 sm:mt-16 sm:px-0 lg:mt-0">
                            {/* Info */}
                            <Info data={book} />
                        </div>
                    </div>
                    <hr className="my-10 text-[#994C00]"/>
                    <ProductList title="Related Books" items={suggestedBooks} />
                </div>
            </Container>
        </div>
     );
}

export default BookPage;