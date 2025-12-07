import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-32 px-4">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left space-y-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                        Building Digital <br />
                        <span className="text-blue-600">Experiences</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto md:mx-0">
                        Hi, I'm Luciano Scola. A Full Stack Go Developer & Systems Architect passionate about building scalable, high-performance web applications.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a href="#portfolio">
                            <Button size="lg" className="w-full sm:w-auto gap-2">
                                View My Work <ArrowRight size={18} />
                            </Button>
                        </a>
                        <a href="#contact">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                Contact Me
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Image/Visual */}
                <div className="flex-1 flex justify-center">
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-blue-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl bg-slate-200 flex items-center justify-center">
                            {/* Placeholder for user image */}
                            <span className="text-slate-400 text-4xl">LS</span>
                            {/* <img src="/path/to/image.jpg" alt="Luciano Scola" className="w-full h-full object-cover" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
