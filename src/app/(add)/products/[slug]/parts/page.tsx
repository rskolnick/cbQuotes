type Props = {
    params: {
        slug: string;
    };
};
export default function ProductPartsPage({ params }: Props) {
    const { slug } = params;

    return (
        <div className="flex justify-center -my-[6rem] h-full items-center">
            {slug} page
        </div>
    );
}
