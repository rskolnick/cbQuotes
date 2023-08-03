import { db } from '@/lib/db';

type Props = {
    params: {
        slug: string;
    };
};
export default async function page({ params }: Props) {
    const { slug } = params;
    const part = await db.part.findFirst({
        where: {
            name: slug,
        },
    });
    return <div>{part?.name}</div>;
}
