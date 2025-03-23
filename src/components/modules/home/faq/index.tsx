import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
    return (
        <section className="flex flex-col items-center justify-center py-20 md:px-6 px-4">
            <div>
                <h2 className="lg:text-[56px] md:text-[40px] text-[30px] font-extrabold text-[#ff8e00]">
                    Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="md:space-y-4 space-y-2 max-w-4xl mx-auto mt-8">
                    {faqData.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index + 1}`}
                            className="group bg-white/20 hover:bg-white/30 transition duration-300 rounded-xl p-5 shadow-md border border-white/30"
                        >
                            <AccordionTrigger className="text-gray-800  text-lg font-semibold flex justify-between items-center">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700 mt-2">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

// FAQ Data Array
const faqData = [
    {
        question: "How does buying and selling work?",
        answer:
            "Buyers browse listings, contact sellers, and negotiate prices. Sellers list their products with details and images. Transactions are completed securely.",
    },
    {
        question: "Is there a fee for listing products?",
        answer:
            "No, listing products is free! However, premium listings are available for better visibility at a small fee.",
    },
    {
        question: "How do I ensure product quality?",
        answer:
            "Meet in a safe location to inspect the item before purchase. Check seller ratings and reviews for trustworthiness.",
    },
    {
        question: "What payment methods are accepted?",
        answer:
            "Payments can be made via cash, bank transfer, or digital wallets, depending on the agreement between buyer and seller.",
    },
    {
        question: "How do I report a fraudulent seller?",
        answer:
            "If you suspect fraud, report the seller via our platform’s 'Report' button or contact customer support for assistance.",
    },
];

export default FaqSection;
