
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <h2>This is home page</h2>
      <Button className="relative overflow-hidden hover:bg-lime-500 cursor-pointer" size="lg" variant="outline">
      Buy Now
      <BorderBeam
        size={40}
        initialOffset={20}
        className="from-transparent via-yellow-500 to-transparent hover:to-blue-600 cursor-pointer"
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
        }}
      />
    </Button>
      <Button>Click me</Button>
    </div>
  );
};

export default HomePage;