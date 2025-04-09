import { Heart, Mail, MapPin, Phone } from "lucide-react"
import Navbar from "../component/Nav"

export default function AboutPage() {
  return (
    <div className="bg-beige min-h-screen">
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <div className="w-24 h-1 bg-primary mb-8"></div>
          <p className="max-w-2xl text-lg text-muted-foreground mb-8">
            We're parents who understand the journey of raising little ones. Our mission is to provide safe, high-quality
            products that make parenting a little easier and a lot more joyful.
          </p>
          <img
            src="/thumb-1920-1338256.png"
            alt="Happy baby with parents"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Our Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              We believe every child deserves the best start in life. That's why we carefully select products that are
              safe, sustainable, and developmentally appropriate.
            </p>
            <p className="text-muted-foreground mb-4">
              Our team of experts tests every item to ensure it meets our rigorous standards for quality and safety. We're
              not just selling products; we're supporting families on their parenting journey.
            </p>
            <div className="flex items-center mt-4">
              <Heart className="h-5 w-5 text-primary mr-2" />
              <span className="font-medium">Made with love for your little ones</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="public\il_fullxfull.1143603237_h0qf.webp"
              alt="Baby products"
              width={500}
              height={400}
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-muted rounded-xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Safety First</h3>
              <p className="text-muted-foreground">
                We rigorously test all products to ensure they meet or exceed safety standards. Your child's wellbeing is
                our top priority.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                We partner with brands that use eco-friendly materials and ethical manufacturing processes to protect the
                planet for future generations.
              </p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Quality & Durability</h3>
              <p className="text-muted-foreground">
                We select products that are built to last, designed to be passed down, and created to withstand the
                adventures of childhood.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Founder</h2>
          <div className=" md:grid-cols-2 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden">
                <img
                  src="public\jubiiin (2)  512.png"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Jubin taj</h3>
              <p className="text-primary mb-4">Co-Founder & CEO</p>
              <p className="text-muted-foreground max-w-md">
              Committed to safe, reliable baby products for happy families
              </p>
            </div>
       
          </div>
        </div>

     
      </div>
    </div>
  )
}
