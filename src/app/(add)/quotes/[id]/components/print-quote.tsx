'use client';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const dummyData = [
    {
        text: 'FB20F',
        description: '20" Flex frame',
        price: 20,
        extension: 2,
    },
];

// interface QuoteProps {
//     quantity: Number;
//     products: {}[];
// }

export const PrintQuote = ({ quote }: any) => {
    const quoteBody: [any[]] = [
        ['Part #', 'MSRP ($)', 'Quantity', 'Total ($)'],
    ];

    quote.products.map((quoteProduct: any) => {
        const productRow = [
            quoteProduct.product.productName,
            quoteProduct.product.msrp,
            quoteProduct.quantity,
            quoteProduct.product.msrp * quoteProduct.quantity,
        ];
        return quoteBody.push(productRow);
    });

    const createPdf = () => {
        var docDefinition = {
            content: [
                {
                    layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: ['auto', 'auto', 'auto', 'auto'],

                        body: quoteBody,

                        // body: [
                        //     ['Part #', 'Description', 'Quantity', 'Price ($)'],
                        //     [
                        //         dummyData[0].text,
                        //         dummyData[0].description,
                        //         dummyData[0].extension,
                        //         dummyData[0].price,
                        //     ],
                        //     [
                        //         { text: 'Bold value', bold: true },
                        //         'Val 2',
                        //         'Val 3',
                        //         'Val 4',
                        //     ],
                        // ],
                    },
                },
            ],
        };
        pdfMake.createPdf(docDefinition).open();
    };

    return (
        <div>
            <button onClick={createPdf}>Create Pdf</button>
        </div>
    );
};
