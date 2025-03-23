import { Button } from "@/components/ui/button";


const NewsletterSection = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-[#ff8e00] to-[#ffbe0c] text-white text-center rounded-lg">
            <div className="max-w-3xl mx-auto">
                <h2 className="lg:text-[56px] md:text-[40px] text-[30px] font-extrabold text-white">
                    Stay Updated
                </h2>
                <p className="text-xl mb-8 text-white">
                    Subscribe to our newsletter for exclusive deals, product updates, and more.
                </p>
                <div className="md:flex justify-center items-center space-x-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-4 w-2/3 md:w-1/2 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#ff6f00] focus:border-transparent border-white border"
                    />
                    <Button className="md:mt-0 mt-4 bg-gradient-to-r from-[#ffbe0c] to-[#ff8e00] py-7 px-8 rounded-md text-white font-semibold text-xl shadow-lg transition-all border transform hover:scale-105 hover:bg-[#ff6f00] hover:shadow-xl active:scale-95">
                        Subscribe
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
