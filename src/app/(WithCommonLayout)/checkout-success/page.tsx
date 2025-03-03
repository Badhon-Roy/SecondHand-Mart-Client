const CheckoutSuccessPage = () => {
    return (
        <div className="container mx-auto my-8">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg w-full">
                <div className="flex justify-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <h2 className="text-4xl font-semibold text-gray-800 mb-4">Success!</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Your order has been successfully processed. Thank you for shopping with us!
                </p>
                <a
                    href="/"
                    className="inline-block bg-green-500 text-white text-lg px-6 py-3 rounded-md hover:bg-green-600 transition duration-300"
                >
                    Go Back to Home
                </a>
            </div>
        </div>
    );
};

export default CheckoutSuccessPage;
