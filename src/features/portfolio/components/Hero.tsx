import { Button } from "@/components/ui/button/button";
import { ArrowRight } from "lucide-react";
import { TypographyH1, TypographyLead } from "@/components/ui/typography/typography";
import { Section, SectionContainer } from "@/components/ui/section/section";

const Hero = () => {
    return (
        <Section id="home" className="mt-32">
            <SectionContainer className="flex flex-col-reverse md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left gap-17">
                    <div className="flex flex-col gap-4">
                        <TypographyH1 className="text-foreground">
                            Building Digital <br />
                            <span className="text-primary">Experiences</span>
                        </TypographyH1>
                        <div />
                        <TypographyLead className="md:text-xl max-w-2xl mx-auto md:mx-0">
                            Hi, I'm Luciano Scola. A Full Stack Go Developer & Systems Architect passionate about building scalable, high-performance web applications.
                        </TypographyLead>
                    </div>
                    <div />
                    <div className="justify-center md:justify-start">
                        <Button asChild size="lg" className="w-full sm:w-auto gap-2">
                            <a href="#portfolio">
                                View My Work <ArrowRight size={18} />
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                            <a href="#contact">Contact Me</a>
                        </Button>
                    </div>
                </div>

                {/* Image/Visual */}
                <div className="flex-1 flex justify-center">
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-primary rounded-full opacity-10 blur-3xl animate-pulse"></div>
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl bg-muted flex items-center justify-center">
                            {/* Placeholder for user image */}
                            <span className="text-muted-foreground text-4xl">LS</span>
                            {/* <img src="/path/to/image.jpg" alt="Luciano Scola" className="w-full h-full object-cover" /> */}
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </Section>
    );
};

export default Hero;
